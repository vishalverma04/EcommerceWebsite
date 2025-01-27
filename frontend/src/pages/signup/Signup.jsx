import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import Loader from '../Loader';
import {Mail,Lock,Eye,EyeOff, Phone,CircleUserRound  } from 'lucide-react'

function SignupPage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('does not match password');
      return;
    }
    setLoading(true);
    try {
      const {data}=await axios.post('/api/v1/users/signup',{
        fullName,
        email,
        mobileNumber,
        password
      })

      if(data.status>=500){
        toast.error(data.message)
        return;
      }
     if(data.status<300) toast.success(data.message)
      navigate('/verifyemail', { state: { email } });
    } catch (error) {
      
      toast.error(error.response.data.message)
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
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

        <div className="relative">
          <CircleUserRound  className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="FullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="pl-10 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

          <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>



        <div className="relative">
          <Phone  className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
            className="pl-10 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
         
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
            required
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
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
       </div>
      </div>
  );
}

export default SignupPage;
