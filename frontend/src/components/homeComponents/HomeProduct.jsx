import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate(`/product`);
    };

  return (
    <div className="w-2xl rounded-lg shadow-lg border border-gray-200 overflow-hidden"
    onClick={handleCardClick}
    >
      {/* Bestseller Badge */}
      {/* <div className="absolute bg-black text-white text-sm font-semibold px-2 py-1 top-2 left-2 rounded">
        <span className="mr-1">🚀</span> Bestseller
      </div> */}

      {/* Product Image */}
      <div className="relative h-80 ">
  <img
    className="absolute inset-0 w-full h-full object-contain p-6"
    src="https://m.media-amazon.com/images/I/61SBF33TizS._AC_UY327_FMwebp_QL65_.jpg"
    alt="Product"
  />
</div>

      {/* Product Details */}
      <div className="p-4">
        {/* Playback and Rating */}
        <div className="flex justify-between items-center mb-2">
          <span className="bg-yellow-400 text-black text-xs font-bold py-1 px-2 rounded">
            60 Hours Playback
          </span>
          <div className="flex items-center text-sm text-yellow-600 font-semibold">
            <span className="mr-1">⭐</span>4.8
          </div>
        </div>

        {/* Product Title */}
        <h3 className="text-md font-semibold text-gray-800">boAt Rockerz 255 Pro+</h3>

        {/* Price Details */}
        <div className="mt-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">₹1,049</span>
            <span className="text-sm line-through text-gray-500">₹3,990</span>
          </div>
          <span className="text-green-600 text-sm font-semibold">74% off</span>
        </div>

        {/* Add to Cart */}
        <div className="mt-4 flex items-center space-x-4">
          <button className="bg-black text-white text-sm font-bold py-1 px-4 rounded-full hover:bg-gray-800">
            Add
          </button>
          <div className="flex items-center justify-center w-8 h-8 border rounded-full">
            +3
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
