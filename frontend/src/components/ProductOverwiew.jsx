import React,{useEffect} from 'react';

const ProductOverview = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts or when the route changes
    window.scrollTo(0, 0);
  }, []); 
  return (
    <div className="container mx-auto py-10 px-4">
      {/* Product Header */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Product Images */}
        <div className="w-full lg:w-1/2">
          <img
            className="w-full rounded-lg shadow-md"
            src="https://via.placeholder.com/500"
            alt="Product"
          />
          <div className="flex mt-4 space-x-2">
            <img
              className="w-20 h-20 object-cover rounded-lg shadow-md cursor-pointer"
              src="https://via.placeholder.com/100"
              alt="Thumbnail"
            />
            <img
              className="w-20 h-20 object-cover rounded-lg shadow-md cursor-pointer"
              src="https://via.placeholder.com/100"
              alt="Thumbnail"
            />
            <img
              className="w-20 h-20 object-cover rounded-lg shadow-md cursor-pointer"
              src="https://via.placeholder.com/100"
              alt="Thumbnail"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">35W GaN Charger</h1>
          <div className="flex items-center space-x-4 text-yellow-500 mb-4">
            <span className="text-xl font-semibold">⭐ 4.8</span>
            <span className="text-gray-600">(1,234 Reviews)</span>
          </div>
          <p className="text-gray-600 mb-4">
            Experience fast charging with the 35W GaN Charger. Compact, efficient, and reliable.
          </p>
          <div className="flex items-center space-x-6 mb-4">
            <span className="text-2xl font-bold text-gray-800">₹1,499</span>
            <span className="text-gray-500 line-through">₹2,999</span>
            <span className="text-green-600 font-semibold">50% off</span>
          </div>

          {/* Add to Cart Section */}
          <div className="flex items-center space-x-4 mt-6">
            <button className="bg-black text-white py-2 px-6 rounded-full font-bold hover:bg-gray-800">
              Add to Cart
            </button>
            <button className="border border-gray-300 py-2 px-6 rounded-full font-bold text-black hover:bg-gray-200">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Features */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Product Features</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Compact design for easy portability.</li>
          <li>Fast charging with 35W power output.</li>
          <li>Durable and safe with advanced GaN technology.</li>
          <li>Compatible with multiple devices.</li>
          <li>1-year warranty for peace of mind.</li>
        </ul>
      </div>

      {/* Product Description */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Product Description</h2>
        <p className="text-gray-600">
          The 35W GaN Charger is designed for those who seek efficiency and portability. With cutting-edge GaN technology, it
          delivers fast charging while keeping the size compact. It's compatible with a wide range of devices, making it the
          perfect charger for your everyday needs.
        </p>
      </div>
    </div>
  );
};

export default ProductOverview;
