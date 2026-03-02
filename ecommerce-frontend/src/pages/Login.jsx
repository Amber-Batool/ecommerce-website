
// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, password: form.password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Universal token for backend
        localStorage.setItem("token", data.token);

        if (data.role === "admin") {
          localStorage.setItem("adminToken", data.token);
          toast.success("Admin login successful!");
          setTimeout(() => navigate("/admin"), 800);
        } else {
          localStorage.setItem("userToken", data.token);
          toast.success("User login successful!");
          setTimeout(() => navigate("/"), 800);
        }
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-blue-50 to-blue-100">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-5 text-center">Welcome Back</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl text-white font-semibold text-lg transition ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}