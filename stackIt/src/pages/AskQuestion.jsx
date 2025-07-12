import { useForm } from "react-hook-form";
import { EditorState, convertToRaw } from "draft-js";
import { useState } from "react";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { addQuestion } from "../store/questionSlice";
import toast from "react-hot-toast";

export default function AskQuestion() {
  const { register, handleSubmit } = useForm();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const htmlContent = draftToHtml(rawContent);

    const newQuestion = {
      id: Date.now(),
      title: data.title,
      description: htmlContent,
      tags: data.tags.split(",").map((tag) => tag.trim()),
    };

    dispatch(addQuestion(newQuestion));
    toast.success("Question added!");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Ask a New Question</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          {...register("tags")}
          placeholder="Tags (comma separated)"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="border rounded"
          editorClassName="p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Question
        </button>
      </form>
    </div>
  );
}
