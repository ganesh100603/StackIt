import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">StackIt</Link>
      <div className="flex gap-4 items-center">
        <Link to="/ask" className="text-blue-500 hover:underline">Ask Question</Link>
        <FaBell className="text-gray-600 text-lg cursor-pointer" />
      </div>
    </nav>
  );
}
