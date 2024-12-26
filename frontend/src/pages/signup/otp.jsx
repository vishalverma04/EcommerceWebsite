import React, { useState } from 'react';
import { useAsyncError, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../Loader';

function OTPPage() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [loading,setLoading]=useState(false)

  const handleOTPSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const {data}=await axios.post('/api/v1/users/verifyotp',{
         email,otp
      })
      toast.success(data.message,{
      success: {
      duration: 5000,
      icon: '🔥',
    },})
      console.log(data)
      navigate('/login');
    } catch (error) {
      toast.error(data.message)
    }finally{
      setLoading(false)
    }

  };
  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">OTP Verification</h2>

        <p className="text-center mb-4">We have sent an OTP to your email: {email}</p>
        <p className="text-center mb-4">Otp is valid for only 10 min</p>

        <form onSubmit={handleOTPSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default OTPPage;
