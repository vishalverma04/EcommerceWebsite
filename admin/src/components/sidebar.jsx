import React from "react";
import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaUsers, FaSignOutAlt, FaCogs } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
 const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col z-10">
      {/* Logo Section */}
      <div className="p-6 flex items-center justify-center bg-gray-900 border-b border-gray-700">
        <h1 className="text-2xl font-bold tracking-wider">
          <span className="text-blue-500">HG</span> Dashboard
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-4">
        <Link
          to="/"
          className="flex items-center gap-3 text-gray-200 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition"
        >
          <FaTachometerAlt className="text-xl" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/products"
          className="flex items-center gap-3 text-gray-200 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition"
        >
          <FaBoxOpen className="text-xl" />
          <span>Products</span>
        </Link>

        <Link
          to="/orders"
          className="flex items-center gap-3 text-gray-200 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition"
        >
          <FaShoppingCart className="text-xl" />
          <span>Orders</span>
        </Link>

        <Link
          to="/customers"
          className="flex items-center gap-3 text-gray-200 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition"
        >
          <FaUsers className="text-xl" />
          <span>Customers</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 text-gray-200 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition"
        >
          <FaCogs className="text-xl" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-700">
        <button
          className="flex items-center gap-3 text-gray-200 hover:text-white hover:bg-red-600 px-4 py-2 rounded-lg transition"
        onClick={handleLogout}
        >
          <FaSignOutAlt className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
