import React, { useEffect, useState } from "react";
import heroImage from '../../assets/herosectionImages/heroimage.jpg';


const HeroSection = () => {
  const images = [
    heroImage,
    "",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0">
        <img
          src={images[currentImageIndex]}
          alt="Hero"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to HG Enterprises India
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Your one-stop destination for high-quality electronic goods and
          services.
        </p>
        <button className="bg-yellow-500 text-white font-medium px-6 py-3 rounded-full shadow-lg transition duration-200">
          Shop Now
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 w-full flex justify-center space-x-2 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentImageIndex
                ? "bg-white"
                : "bg-gray-400 hover:bg-white"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;


// import React from "react";
// // import heroimage from "../assets/heroimage.webp";
// import heroImage from '../../assets/heroimage.jpg';




// const HeroSection = () => {
//   return (
//     <div className="relative w-full h-screen bg-gray-900">
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
//       </div>

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">
//         <h1 className="text-4xl md:text-6xl font-bold mb-4">
//           Welcome to HG Enterprises
//         </h1>
//         <p className="text-lg md:text-xl mb-6">
//           Your one-stop destination for high-quality electronic goods and
//           services.
//         </p>
//         <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-full shadow-lg transition duration-200">
//           Shop Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
