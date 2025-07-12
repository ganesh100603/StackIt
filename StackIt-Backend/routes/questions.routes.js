const express = require("express");
const router = express.Router();

// GET all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single question
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new question
router.post("/", async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const question = new Question({ title, description, tags });
    const saved = await question.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST an answer to a question
router.post("/:id/answers", async (req, res) => {
  const { content } = req.body;
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Not found" });

    question.answers.push({ content });
    await question.save();

    res.status(201).json({ message: "Answer added" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;

