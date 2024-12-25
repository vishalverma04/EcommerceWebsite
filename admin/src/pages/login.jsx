import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace with your authentication logic
    if (email === 'admin@example.com' && password === 'admin123') {
      alert('Login Successful!');
      window.location.href = "/admin";// Redirect to admin dashboard
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Top Section */}
      <div className="w-full bg-blue-600 py-4 text-white text-center">
        <h1 className="text-3xl font-bold">Welcome to HG ENTERPRISES INDIA Admin Portal</h1>
        <p className="mt-2 text-sm">
          Manage your products, orders, sales, and customers efficiently. Your success is our priority!
        </p>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden mt-8">
        {/* Left Section - Company Info */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">HG ENTERPRISES INDIA</h1>
            <p className="text-lg mb-6">
              Welcome to the Admin Portal of HG ENTERPRISES INDIA! Manage products, track orders, and oversee operations
              with ease.
            </p>
            <div className="mt-4">
              <p className="text-sm font-medium">Contact: 9728598505, 7303899440</p>
              <p className="text-sm font-medium">Email: admin@hgenterprisesindia.com</p>
              <p className="text-sm font-medium">
                Address: Konsiwas Road, Vijay Nagar, Rewari, Haryana 123401
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your admin email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            For assistance, contact <span className="font-medium text-blue-600">IT Support</span>.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full bg-gray-100 py-6 text-center mt-8">
        <h2 className="text-lg font-semibold">Empowering Your Business</h2>
        <p className="text-sm text-gray-600 mt-2">
          At HG ENTERPRISES INDIA, we believe in providing seamless tools to manage your operations. Contact us for any
          queries or assistance.
        </p>
        {/* <div className="flex items-center justify-center mt-4 space-x-6">
          <a
            href="/about"
            className="text-blue-600 font-medium hover:underline"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="text-blue-600 font-medium hover:underline"
          >
            Contact Support
          </a>
          <a
            href="/help"
            className="text-blue-600 font-medium hover:underline"
          >
            Help Center
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default AdminLogin;
