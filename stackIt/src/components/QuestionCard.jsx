import { Link } from "react-router-dom";

export default function QuestionCard({ question }) {
  return (
    <div className="border rounded-md p-4 shadow-sm bg-white hover:shadow-md transition-all duration-200">
      {/* Title */}
      <Link
        to={`/question/${question.id}`}
        className="text-xl font-semibold text-blue-600 hover:underline"
      >
        {question.title}
      </Link>

      {/* Description Preview */}
      <p className="text-gray-700 mt-2 line-clamp-3">
        {/* You could sanitize and truncate long HTML here if needed */}
        {question.description.replace(/<[^>]+>/g, "").slice(0, 150)}...
      </p>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {question.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-4">
        <Link
          to={`/question/${question.id}`}
          className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded"
        >
          View Answers →
        </Link>
      </div>
    </div>
  );
}
