import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  content: {
    type:String,
    required:true
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
    },
},{timestamps:true});

export const Answer = mongoose.model("Answer",answerSchema)