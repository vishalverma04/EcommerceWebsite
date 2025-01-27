import React from 'react'
import ProductCard from './homeComponents/HomeProduct';
import { useProductContext } from '../contexts/ProductContext';
import Loader from '../pages/Loader';
import { useEffect } from 'react';

function productListing() {
    const exampleProducts = [
        {
          id: 1,
          title: 'Smartphone X12',
          brand: 'TechBrand',
          price: 799,
          stock: 12,
          image: 'https://via.placeholder.com/150?text=Smartphone+X12',
          discountPercentage:20
        },
        {
          id: 2,
          title: 'Wireless Earbuds Pro',
          brand: 'AudioTech',
          price: 199,
          stock: 25,
          image: 'https://via.placeholder.com/150?text=Wireless+Earbuds+Pro',
          discountPercentage:20
        },
        {
          id: 3,
          title: '4K UHD TV',
          brand: 'VisionTech',
          price: 999,
          stock: 5,
          discountPercentage:20,
          image: 'https://via.placeholder.com/150?text=4K+UHD+TV',
        },
        {
          id: 4,
          title: 'Gaming Laptop G5',
          brand: 'PowerTech',
          price: 1499,
          stock: 7,
          image: 'https://via.placeholder.com/150?text=Gaming+Laptop+G5',
          discountPercentage:20
        },
        {
          id: 5,
          title: 'Bluetooth Speaker',
          brand: 'SoundWave',
          price: 129,
          stock: 20,
          image: 'https://via.placeholder.com/150?text=Bluetooth+Speaker',
          discountPercentage:20
        },
        {
          id: 6,
          title: 'Smart Watch 2.0',
          brand: 'GadgetTime',
          price: 249,
          stock: 15,
          image: 'https://via.placeholder.com/150?text=Smart+Watch+2.0',
          discountPercentage:20
        },
        {
          id: 7,
          title: 'Portable Charger',
          brand: 'ChargeUp',
          price: 49,
          stock: 50,
          image: 'https://via.placeholder.com/150?text=Portable+Charger',
          discountPercentage:20
        },
        {
          id: 8,
          title: 'Action Camera Z5',
          brand: 'CamWorld',
          price: 299,
          stock: 10,
          image: 'https://via.placeholder.com/150?text=Action+Camera+Z5',
          discountPercentage:20
        },
        {
          id: 9,
          title: 'Noise Cancelling Headphones',
          brand: 'SilentTech',
          price: 349,
          stock: 8,
          image: 'https://via.placeholder.com/150?text=Noise+Cancelling+Headphones',
          discountPercentage:20
        },
        {
          id: 10,
          title: 'Smart Thermostat',
          brand: 'EcoControl',
          price: 199,
          stock: 30,
          image: 'https://via.placeholder.com/150?text=Smart+Thermostat',
          discountPercentage:20
        },
        {
          id: 11,
          title: 'Robot Vacuum Cleaner',
          brand: 'CleanBot',
          price: 499,
          stock: 3,
          image: 'https://via.placeholder.com/150?text=Robot+Vacuum+Cleaner',
          discountPercentage:20
        },
        {
          id: 12,
          title: 'Gaming Mouse RGB',
          brand: 'ClickPro',
          price: 59,
          stock: 40,
          image: 'https://via.placeholder.com/150?text=Gaming+Mouse+RGB',
          discountPercentage:20
        },
      ];

      const { products, loading, } = useProductContext();
      
      if(loading) {
        return <Loader />;
      }

  return (
<div className="container mx-auto p-6">
       
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {products.map((product) => (
             <ProductCard key={product._id} product={product}/>
         ))}
         {/* <ProductCard/> */}
       </div>
     </div>
  );
  
}

export default productListing
