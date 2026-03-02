

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc"; // Google icon

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("User registered! Please login.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    toast.info("Google OAuth not implemented yet");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-blue-50 to-blue-100">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-5 text-center">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-gray-600 text-sm mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-gray-600 text-sm mb-1 block">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-600 text-sm mb-1 block">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Register button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl text-white font-semibold text-lg transition ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-gray-500">or</div>

        {/* Continue with Google */}
        <button
          onClick={handleGoogle}
          className="mt-4 w-full flex items-center justify-center border border-gray-300 rounded-xl py-2 text-gray-700 font-medium hover:bg-gray-100 transition"
        >
          <FcGoogle className="w-6 h-6 mr-2" />
          Continue with Google
        </button>

        <p className="mt-5 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}