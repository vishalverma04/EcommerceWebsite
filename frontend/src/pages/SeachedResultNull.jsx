import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoResultsPage = ({ searchQuery }) => {
    const navigate = useNavigate();

    // const handleBackToHome = () => {
    //     navigate('/');
    // };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            {/* <img
                src="/path/to/no-results-illustration.png"
                alt="No Results"
                className="w-64 h-64"
            /> */}
            <h1 className="text-2xl font-bold text-gray-800 mt-6">No Results Found</h1>
            <p className="text-gray-500 mt-2">
                We couldn't find any products for "<span className="font-medium">{searchQuery}</span>".
            </p>
            {/* <button
                onClick={handleBackToHome}
                className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
            >
                Back to Home
            </button> */}
        </div>
    );
};

export default NoResultsPage;
