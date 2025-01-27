import React from 'react'
import CategoryComponent from './CategoryComponent';
import {useProductContext} from '../../contexts/ProductContext';
import { useCategoryContext } from '../../contexts/categoryContext';

function CategorySection() {
  
    const {categories} = useCategoryContext();

      const {searchCategoryProduct} = useProductContext();
      const handleCategoryClick = (path) => {
        searchCategoryProduct(path);
      };
  return (
    <>
       <div className="w-full bg-white">
      <div 
        className="flex justify-evenly gap-16 overflow-x-auto py-4 px-7 scrollbar-hide"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {categories.map((category) => (
            <CategoryComponent key={category._id} category={category} handleCategoryClick={handleCategoryClick}/>
        ))} 
        </div>  
        </div>
    </>
  )
}

export default CategorySection
