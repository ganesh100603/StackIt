import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Question} from "../models/questions.model.js";

const getAllQuestions = asyncHandler(async(req,res)=>{
    try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res
    .status(200)
    .json(new ApiResponse(200,questions,"Fetched all questions successfully"))
    } 
    catch (err) {
        throw new ApiError(500,"Something went wrong while went wrong")
    }
})

const getAQuestion = asyncHandler(async(req,res)=>{
    try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Not found" });
    res
    .status(200)
    .json(new ApiResponse(200,question,"Fetched question suncessfully"));
    } 
    catch (err) {
    throw new ApiError(500,"Something went wrong while went wrong")
    }
})

const newQuestion = asyncHandler(async(req,res)=>{
    const { title, description, tags } = req.body;
    try {
    const question = await Question.create(
        { 
        title, 
        description, 
        tags }
    );
    res
    .status(201)
    .json(new ApiResponse(200,question,"Added question successfully"));
    } 
    catch (err) {
     throw new ApiError(500,"Something went wrong while went wrong")
    }
})

const updateQuestion = asyncHandler(async (req, res) => {
  const { title, description, tags } = req.body;
  const { id } = req.params;

  try {
    const updated = await Question.findByIdAndUpdate(
      id,
      { title, description, tags },
      { new: true }
    );

    if (!updated) {
      throw new ApiError(404, "Question not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, updated, "Question updated successfully"));
  } catch (err) {
    throw new ApiError(500, "Something went  wrong while updating the question");
  }
});

const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Question.findByIdAndDelete(id);

    if (!deleted) {
      throw new ApiError(404, "Question not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, deleted, "Question deleted successfully"));
  } catch (err) {
    throw new ApiError(500, "Something went wrong while deleting the question");
  }
});


export{
    getAllQuestions,
    getAQuestion,
    newQuestion,
    updateQuestion,
    deleteQuestion
}