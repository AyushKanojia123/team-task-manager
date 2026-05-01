import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setLoading(true);
      await API.post("/api/auth/register", data);
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 
                    bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100">

      
      <div className="absolute w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>

    
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border">


        <h2 className="text-2xl font-bold text-center mb-1 text-gray-800">
          Join TeamFlow 🚀
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Create your account to get started
        </p>

    
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />
        </div>

      
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}