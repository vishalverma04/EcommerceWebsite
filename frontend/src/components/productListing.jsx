// import React, { useEffect, useState } from 'react';
// import ProductCard from './homeComponents/HomeProduct';
// const ProductListing = () => {

//   const [products, setProducts] = useState([]);
//   setProducts(exampleProducts)

//   return (
//     <div className="container mx-auto py-6">
//       <h2 className="text-2xl font-bold text-center mb-6">Our Products</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {/* {products.map((product) => (
//             <ProductCard/>
//         ))} */}
//         <ProductCard/>
//       </div>
//     </div>
//   );
// };

// export default ProductListing;/

import React from 'react'
import ProductCard from './homeComponents/HomeProduct';

function productListing() {
    const exampleProducts = [
        {
          id: 1,
          title: 'Smartphone X12',
          brand: 'TechBrand',
          price: 799,
          stock: 12,
          image: 'https://via.placeholder.com/150?text=Smartphone+X12',
        },
        {
          id: 2,
          title: 'Wireless Earbuds Pro',
          brand: 'AudioTech',
          price: 199,
          stock: 25,
          image: 'https://via.placeholder.com/150?text=Wireless+Earbuds+Pro',
        },
        {
          id: 3,
          title: '4K UHD TV',
          brand: 'VisionTech',
          price: 999,
          stock: 5,
          image: 'https://via.placeholder.com/150?text=4K+UHD+TV',
        },
        {
          id: 4,
          title: 'Gaming Laptop G5',
          brand: 'PowerTech',
          price: 1499,
          stock: 7,
          image: 'https://via.placeholder.com/150?text=Gaming+Laptop+G5',
        },
        {
          id: 5,
          title: 'Bluetooth Speaker',
          brand: 'SoundWave',
          price: 129,
          stock: 20,
          image: 'https://via.placeholder.com/150?text=Bluetooth+Speaker',
        },
        {
          id: 6,
          title: 'Smart Watch 2.0',
          brand: 'GadgetTime',
          price: 249,
          stock: 15,
          image: 'https://via.placeholder.com/150?text=Smart+Watch+2.0',
        },
        {
          id: 7,
          title: 'Portable Charger',
          brand: 'ChargeUp',
          price: 49,
          stock: 50,
          image: 'https://via.placeholder.com/150?text=Portable+Charger',
        },
        {
          id: 8,
          title: 'Action Camera Z5',
          brand: 'CamWorld',
          price: 299,
          stock: 10,
          image: 'https://via.placeholder.com/150?text=Action+Camera+Z5',
        },
        {
          id: 9,
          title: 'Noise Cancelling Headphones',
          brand: 'SilentTech',
          price: 349,
          stock: 8,
          image: 'https://via.placeholder.com/150?text=Noise+Cancelling+Headphones',
        },
        {
          id: 10,
          title: 'Smart Thermostat',
          brand: 'EcoControl',
          price: 199,
          stock: 30,
          image: 'https://via.placeholder.com/150?text=Smart+Thermostat',
        },
        {
          id: 11,
          title: 'Robot Vacuum Cleaner',
          brand: 'CleanBot',
          price: 499,
          stock: 3,
          image: 'https://via.placeholder.com/150?text=Robot+Vacuum+Cleaner',
        },
        {
          id: 12,
          title: 'Gaming Mouse RGB',
          brand: 'ClickPro',
          price: 59,
          stock: 40,
          image: 'https://via.placeholder.com/150?text=Gaming+Mouse+RGB',
        },
      ];

  return (
<div className="container mx-auto p-6">
       <h2 className="text-2xl font-bold text-center mb-6">Our Products</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {exampleProducts.map((product) => (
             <ProductCard/>
         ))}
         {/* <ProductCard/> */}
       </div>
     </div>
  );
  
}

export default productListing
