import React, { useEffect, useState } from "react";
import Loader from '../../pages/Loader'
import axios from 'axios'
import toast from 'react-hot-toast'


const HeroSection = () => {
  const [images,setImages] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
   try {
     const fetchImages = async () => {
       const response = await axios.get('/api/v1/settings/getheroimages');
       setImages(response.data.heroImages);
     }
     fetchImages();
   } catch (error) {
     toast.error('Internal Server Error');
    
   }finally{
     setIsLoading(false)
   }
  }, []);


  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

 if(isLoading){
  return <Loader/>
 }  

  return (
    <div className="relative h-80 overflow-hidden md:h-screen">
      {/* Image Carousel */}
      {images.length>0 && <div className="absolute inset-0">
        <img
          src={images[currentImageIndex].image}
          alt="Hero"
          className="w-full  object-contain transition-opacity duration-1000"
        />
      </div>}

     
      {/* Dots Navigation */}
      <div className="absolute bottom-6 w-full flex justify-center space-x-2 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentImageIndex
                ? "bg-blue-600"
                : "bg-gray-400 hover:bg-white"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

