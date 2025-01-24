import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";
import { Link, useNavigate } from 'react-router-dom'; 

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate()
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
   
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/check-email`,
        { email }
      );
      if (response.data.success) {
        setStep(2);
        setError(null);
      }
    } catch (error) {
      setError(error.response?.data?.msg || "Email not found");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
       `${API_BASE_URL}/auth/reset-password`,
        { email, password: newPassword }
      );
      if (response.data.success) {
        setSuccess("Password updated successfully");
        setError(null);
        setStep(1);
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
      }
      
      navigate("/login")
    } catch (error) {
      setError(error.response?.data?.msg || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen "style={{
      backgroundImage: `url('./bg.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <h1 className="text-2xl mb-4">Forgot Password</h1>
            <input
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
            >
              Submit
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handlePasswordSubmit}>
            <h1 className="text-2xl mb-4">Reset Password</h1>
            <input
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
            <input
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
            >
              Reset Password
            </button>
          </form>
        )}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {success && <p className="text-green-500 text-center mt-2">{success}</p>}
      </div>
    </div>
  );
}
