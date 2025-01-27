import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import { useProductContext } from '../contexts/ProductContext'
import {User} from 'lucide-react'

import { Menu, Search, ShoppingCart, } from 'lucide-react';

const Navbar = ({fullName,isLoggedIn}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {searchProducts}=useProductContext()
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;
    searchProducts(searchQuery);
    setSearchQuery('');
  };

  const NavLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Services', href: '/services' }
  ];

  return (
    <nav className="relative bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        {/* Top Line: Logo, Search, Mobile Menu */}
        <div className="flex items-center space-x-4 justify-between">
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
          <button type="submit" className="text-yellow-400 hover:text-yellow-500">
            <Search size={24} />
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
              <Link to="/profile" className="hover:text-yellow-500 transition duration-200 ">
                <User className="h-8 w-8 text-blue-600 bg-blue-100 p-1 rounded-full" />
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
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
      </div>

      <div 
          className={`
            fixed top-0 right-0 w-64 h-full bg-gray-600 shadow-lg transform 
            transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            md:hidden z-50
          `}
        >
          <div className="p-5">
            <button 
              className="absolute top-4 right-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
            </button>

            <div className="space-y-3">
              {NavLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className="block hover:text-blue-600 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="space-y-3">
              <Link to="/cart" className="relative hover:text-yellow-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l3.6-7H6.4M7 13L5.4 7M7 13L6.4 7M7 13l1.6 6M7 13l1.6 6m6.8-6l1.6 6m1.6-6H17.6M7.4 19a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10.6 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
            </Link>
            {isLoggedIn ? (
                <Link to="/profile" className="block hover:text-yellow-500 transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-6 w-6 text-blue-600" />
                </Link>
              ) : (
                <Link to="/login" className="block hover:text-yellow-500 transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
              </div>
            </div>
          </div>
          </div>

        </div>
    </nav>
  );
};

export default Navbar;
