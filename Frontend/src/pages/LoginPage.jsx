import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" }); // ✅ Bas yahi rakho
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const { login } = useContext(AuthContext);

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await api.post("/auth/login", form);
    console.log("Login Response:", res.data);

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    localStorage.setItem("user", JSON.stringify(user)); // optional
    login(user); // ✅ context me user set

    if (user.role === "admin") navigate("/adminSidebar");
    else if (user.role === "telecaller") navigate("/telecallerDashboard");
    else setError("Unknown role");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-sky-300 to-blue-500">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300"
      >
        {/* Logo or Heading */}
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Login Icon"
            className="w-16 h-16"
          />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Login to Your Account
        </h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
       {/* REMOVE THIS BLOCK 👇 */}
{/* REMOVE THIS BLOCK 👇 */}
<div className="mb-4">
  <label className="block mb-1 font-medium text-gray-700">Role</label>
  <select
    name="role"
    value={form.role}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="">Select role</option>
    <option value="admin">Admin</option>
    <option value="telecaller">Telecaller</option>
    </select>
</div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Login
        </button>
        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </div>

        {/* <div className="mt-4 text-center text-sm text-gray-600">
          Forgot password?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Click here
          </span>
        </div> */}
      </form>
    </div>
  );
};

export default LoginPage;
