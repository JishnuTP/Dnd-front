import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { mainContext } from "../context/mainContex";
import { API_BASE_URL } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setToken } = useContext(mainContext);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { email, password }
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);
      history("/");
    } catch (error) {
      setError(error.response?.data?.msg || "Login failed");
      console.log(error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url('./bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md mx-auto p-8 bg-white  bg-opacity-75 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            LOGIN
          </button>
        </form>
        <div className="text-center mt-4 ">
          <Link
            to="/forgot-password"
            className="text-indigo-500 hover:underline text-sm"
          >
            Forgot Password?
          </Link>


          <Link
            to="/register"
            className="text-blue-500 hover:underline font-bold text-lg ml-2"
          >
            signup?
          </Link>
        </div>
      </div>
    </div>
  );
}
