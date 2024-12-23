import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = false; // Replace with actual login status logic

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/searched-items?query=${searchQuery}`);
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2"
        >
          <img
            src={logo} // Replace with your logo path
            alt="Logo"
            className="h-10 w-10"
          />
          {/* <span className="font-bold text-xl">HG Enterprises</span> */}
        </Link>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="w-[50%] flex items-center space-x-2 bg-gray-700 rounded-full px-4 py-2"
        >
          <input
            type="text"
            placeholder="Search for products..."
            className=" bg-transparent outline-none text-white placeholder-gray-400 flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-yellow-500  text-white px-4 py-1 rounded-full"
          >
            Search
          </button>
        </form>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6">
        <li>
            <Link
              to="/about"
              className="hover:text-yellow-500 transition duration-200"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-yellow-500 transition duration-200"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="hover:text-yellow-500 transition duration-200"
            >
              Service
            </Link>
          </li>
          <li>
           <Link to="/cart" className="relative hover:text-yellow-500">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth="1.5"
               stroke="currentColor"
               className="w-6 h-6"
             >
               <path
                 strokeLinecap="round"
                strokeLinejoin="round"
                 d="M3 3h2l.4 2M7 13h10l3.6-7H6.4M7 13L5.4 7M7 13L6.4 7M7 13l1.6 6M7 13l1.6 6m6.8-6l1.6 6m1.6-6H17.6M7.4 19a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10.6 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
               />
             </svg>
           </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="hover:text-yellow-500 transition duration-200"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="hover:text-yellow-500 transition duration-200"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


