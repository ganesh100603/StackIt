import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type:String,
    required:true
},
  tags: [
  {
    type: String,
    trim: true,
    lowercase: true,
  },
],

},{
    timestamps:true
});

export const Question = mongoose.model("Question", questionSchema);
