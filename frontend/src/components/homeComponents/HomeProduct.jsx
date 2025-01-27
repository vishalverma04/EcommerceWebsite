import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import {addToCart  } from '../../utility/cart';
import { renderStars } from '../RenderStars';

const ProductCard = ({product}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate(`/product/${product.title}`,
      {
        state:{
          product:product
        }
      }
      );
    };
    const beforediscountprice=Math.round(product.price/(1-product.discountPercentage/100));
    const handleAddButton = async () => {
      try {
        addToCart(product);
        toast.success("Product added to cart");

      } catch (error) {
        toast.error("An error occurred. Please try again.");
        
      }
  };

  return (
    <div className="w-2xl  rounded-lg  shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out">
      <div className="relative h-64 "
      onClick={handleCardClick}>
  <img
    className="absolute inset-0 w-full  object-cover p-6 cursor-pointer"
    src={product.images[0]}
    alt="Product"
  />
  
</div>

      {/* Product Details */}
      <div className="pb-4 px-4">
        {/* Playback and Rating */}
        <div
         onClick={handleCardClick}
        >
        <div className="flex justify-between items-center mb-2">
          
          <div className="flex mr-2">{renderStars(product.rating)} </div>
        </div>

        {/* Product Title */}
        <h3 className="text-md font-bold text-gray-800">{product.title}</h3>
        <span className=" text-blue-700 rounded-full text-sm font-medium">
                        {product.brand}
                      </span>
            </div>          

        {/* Price Details */}
        <div className="mt-2"
        onClick={handleCardClick}
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            <span className="text-sm line-through text-gray-500">₹{beforediscountprice}</span>
          </div>
          <span className="text-green-600 text-sm font-semibold">{product.discountPercentage}% off</span>
        </div>

        {/* Add to Cart */}
        <div className="mt-4 flex items-center space-x-4">
          <button className="bg-orange-500 text-white text-sm font-bold py-1 px-4 rounded-full hover:bg-orange-600"
          onClick={handleAddButton}
          >
            Add
          </button>
          <div className="flex items-center justify-center w-36 h-8 border rounded-full">
            {product.stock || "5"} in Stock
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
