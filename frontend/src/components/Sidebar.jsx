import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-lg ${
      pathname === path
        ? "bg-blue-500 text-white"
        : "text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <div className="w-60 h-screen bg-white border-r p-4 fixed">
      <h1 className="text-xl font-bold mb-6 text-blue-600">🚀 TeamFlow</h1>

      <nav className="flex flex-col gap-2">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>
        <Link to="/tasks" className={linkClass("/tasks")}>
          Tasks
        </Link>
      </nav>
    </div>
  );
}