import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Answer } from "../models/answers.model.js";
import { Question } from "../models/questions.model.js";

const addAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params; // question ID
  const { content } = req.body;

  const question = await Question.findById(id);
  if (!question) throw new ApiError(404, "Question not found");

  const answer = await Answer.create(
    { content, question: question._id }
    );

    if(!answer){
        throw new ApiError(400,"Error occures while creating the answer")
    }

  res
    .status(201)
    .json(new ApiResponse(201, answer, "Answer added successfully"));
});

const editAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params; // answer ID
  const { content } = req.body;

  const answer = await Answer.findByIdAndUpdate(
    id,
    { content },
    { new: true }
  );

  if (!answer) throw new ApiError(404, "Answer not found");

  res
    .status(200)
    .json(new ApiResponse(200, answer, "Answer updated successfully"));
});


const deleteAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params; // answer ID

  const answer = await Answer.findByIdAndDelete(id);

  if (!answer) throw new ApiError(404, "Answer not found");

  res
    .status(200)
    .json(new ApiResponse(200, answer, "Answer deleted successfully"));
});

export {
    addAnswer,
    editAnswer,
    deleteAnswer
}