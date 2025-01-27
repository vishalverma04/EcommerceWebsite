import React from 'react'

function CategoryComponent({category, handleCategoryClick}) {
  return (
   <>
   <div
            key={category.id}
            className="flex flex-col items-center cursor-pointer transition-transform hover:text-blue-500 hover:scale-110 hover:z-20"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="rounded-full overflow-hidden bg-gray-100 mb-2 w-24 h-24 flex items-center justify-center shadow-md">
              <img
                src={category.imageUrl}
                alt={category.name}
                loading='lazy'
                className="w-20 h-20 object-cover p-2"
              />
            </div>
            <span className="text-sm text-center font-medium">{category.name}</span>
          </div>
   </>
  )
}

export default CategoryComponent
