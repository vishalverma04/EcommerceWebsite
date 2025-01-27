import React, { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import {Lock,Eye,EyeOff,AlertCircle} from 'lucide-react'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match');
        setError('Passwords do not match');
        return;
      }
      const token = window.location.pathname.split("/").pop();
      try {
        const response = await axios.post(`/api/v1/users/resetpassword/${token}`, {
          newPassword,
        });
        toast.success('Password reset successfully')
        navigate('/login')
        
      } catch (err) {
        console.log(err)
        toast.error(err.response?.data?.message || "Something went wrong.");
        setError(err.response?.data?.message || "Something went wrong.");
      }
    };

    
  const renderError = () => {
    if (!error) return null;
    return (
      <div className="flex items-center p-4 mb-4 text-red-800 bg-red-100 rounded">
        <AlertCircle className="h-5 w-5 mr-2" />
        <p>{error}</p>
      </div>
    );
  };

  

  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
          {renderError()}
          <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="pl-10 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3"
          >
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3"
          >
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
          </button>
        </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default ResetPassword;