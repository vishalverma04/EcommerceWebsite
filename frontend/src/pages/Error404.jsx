import React,{useEffect} from "react";
import { Link } from "react-router-dom";

const Error404 = () => {

  useEffect(() => {
    // Scroll to the top when the component mounts or when the route changes
    window.scrollTo(0, 0);
  }, []); 

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        {/* Animated Image */}
        <div className="relative w-64 h-64 mx-auto">
          <img
            src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg"
            alt="404 Animation"
            className="absolute top-0 left-0 w-full h-full animate-bounce"
          />
        </div>

        {/* Error Message */}
        
        <p className="mt-4 text-2xl font-light text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* Redirect Button */}
        <Link to="/">
          <button className="px-6 py-3 mt-8 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
