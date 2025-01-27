import React from 'react';
import { Link } from 'react-router-dom';
// import emptyCartImage from '../assets/emptyCart.jpg'; // Replace with the path to your image

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            {/* <img
                src={emptyCartImage}
                alt="Empty Cart"
                className="w-64 h-64 mb-6"
            /> */}
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">
                Your Cart is Empty
            </h1>
            <p className="text-gray-500 text-center max-w-md mb-6">
                Looks like you haven’t added anything to your cart yet. Browse our categories and discover amazing products!
            </p>
            <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200">
                Start Shopping
            </Link>
        </div>
    );
};

export default EmptyCart;