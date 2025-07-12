import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../store/questionSlice";
import QuestionCard from "../components/QuestionCard";

export default function Home() {
  const dispatch = useDispatch();
  const { questions, loading } = useSelector((state) => state.question);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Latest Questions</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      )}
    </div>
  );
}
