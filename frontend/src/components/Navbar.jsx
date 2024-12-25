import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = false; // Replace with actual login status logic

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/searched-items?query=${searchQuery}`);
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md w-full flex justify-between ">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center ">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 w-10" />
        </Link>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="w-[60%] flex items-center space-x-2 bg-gray-700 rounded-full px-4 py-2 md:mx-0 md:w-[50%]"
        >
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-transparent outline-none text-white placeholder-gray-400 flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white px-2 py-1 rounded-full md:px-4"
          >
            Search
          </button>
        </form>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <Link to="/about" className="hover:text-yellow-500 transition duration-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-500 transition duration-200">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-yellow-500 transition duration-200">
              Services
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
              <Link to="/profile" className="hover:text-yellow-500 transition duration-200">
                Profile
              </Link>
            ) : (
              <Link to="/login" className="hover:text-yellow-500 transition duration-200">
                Login
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-6 py-4 space-y-4">
          <ul className="space-y-4">
            <li>
              <Link to="/about" className="block hover:text-yellow-500 transition duration-200">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block hover:text-yellow-500 transition duration-200">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/services" className="block hover:text-yellow-500 transition duration-200">
                Services
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
                <Link to="/profile" className="block hover:text-yellow-500 transition duration-200">
                  Profile
                </Link>
              ) : (
                <Link to="/login" className="block hover:text-yellow-500 transition duration-200">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
