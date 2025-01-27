import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle} from 'lucide-react';
import {Link} from 'react-router-dom' 
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import Loader from './Loader'

import {useAuth} from '../contexts/AuthContext'
import axios from 'axios';

const LoginSystem = () => {
  const [currentView, setCurrentView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const {login}=useAuth()
  const navigate=useNavigate()
  

  const handleLogin = async (e) => {
      e.preventDefault();
      setloading(true)
      try{
       const res= await login(email, password);
       if(res){
        toast.success('login successfully')
        setError('')
        navigate('/')
       }else{
        toast.error('login failed')
        setError('login failed')
        setSuccess('')
       }
      }catch(error){
        setloading(false)
        toast.error('something went wrong while sending data...')
        setError('something went wrong while sending data...')
        setSuccess('')
      }finally{
    setloading(false)
      }  
    };
  

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if(!email){
      toast.error('Please enter email')
      setError('Please enter email')
      return
    }

    try {
      const response = await axios.post("/api/v1/users/forgotpassword", { email });
      toast.success(response.data.message)
      setSuccess(response.data.message)
      setError('')
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
      setError(err.response?.data?.message || "Something went wrong.");
      setSuccess('')
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

  const renderSuccess = () => {
    if (!success) return null;
    return (
      <div className="flex items-center p-4 mb-4 text-green-800 bg-green-100 rounded">
        <CheckCircle className="h-5 w-5 mr-2" />
        <p>{success}</p>
      </div>
    );
  };



  const renderLoginView = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
     {renderError()}
      {renderSuccess()}

      <form onSubmit={handleLogin} className="space-y-4">
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
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setCurrentView('forgotPassword')}
          className="w-full text-blue-500 text-sm hover:underline"
        >
          Forgot Password?
        </button>
        
      </form>

      <div className="text-center mt-4">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Create a new account
            </Link>
          </p>
        </div>

    </div>
  );

  const renderForgotPasswordView = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <button
        onClick={() => setCurrentView('login')}
        className="flex items-center text-gray-600 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Login
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

      {renderError()}
      {renderSuccess()}
      <form onSubmit={handleForgotPassword} className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Verify Email
        </button>
      </form>
    </div>
  );


  if(loading){
    return <Loader/>
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {currentView === 'login' && renderLoginView()}
      {currentView === 'forgotPassword' && renderForgotPasswordView()}
    </div>
  );
};

export default LoginSystem;