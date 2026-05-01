import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="h-16 flex items-center justify-between px-6 bg-white border-b">
      
      <h2 className="font-semibold text-lg">Welcome back 👋</h2>

      <div className="flex items-center gap-4">
        <button
          onClick={() => document.documentElement.classList.toggle("dark")}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          🌙
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}