import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";
import toast from "react-hot-toast";

export default function QuestionDetails() {
  const { id } = useParams();
  const question = useSelector((state) =>
    state.question.questions.find((q) => q.id === parseInt(id))
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [answers, setAnswers] = useState([]);
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setAnswers((prev) => [...prev, html]);
    setEditorState(EditorState.createEmpty());
    toast.success("Answer posted!");
  };

  if (!question) {
    return <p className="text-red-500">Question not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
      <div className="prose">{parse(question.description)}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        {question.tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            #{tag}
          </span>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-2">Answers</h2>
      {answers.length === 0 ? (
        <p className="text-gray-500">No answers yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {answers.map((ans, idx) => (
            <div key={idx} className="border p-4 rounded bg-white shadow-sm">
              {parse(ans)}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-4">
        <h3 className="text-lg font-medium">Your Answer</h3>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="border rounded"
          editorClassName="p-2 bg-white min-h-[150px]"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Answer
        </button>
      </form>
    </div>
  );
}
