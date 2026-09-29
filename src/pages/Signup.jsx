import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    displayName: "",
  });
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await api.post("/auth/signup", formData);
      login(response.data.token, response.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to sign up.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Join //TheFeed
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Display Name
          </label>
          <input
            type="text"
            name="displayName"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            minLength="3"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
