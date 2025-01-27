import React, { useEffect, useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Image as ImageIcon, Search, Filter } from 'lucide-react';
import { renderStars } from './RenderStars';

const ProductReviews = ({reviews,rating}) => {


  const [displayedReviews, setDisplayedReviews] = useState(() => 
    reviews.slice(-10).reverse() 
);
const [nextIndex, setNextIndex] = useState(reviews.length - 10); 
const handleLoadMore = () => {
    const startIndex = Math.max(0, nextIndex - 10); 
    const moreReviews = reviews.slice(startIndex, nextIndex).reverse();
    setDisplayedReviews(prev => [...prev, ...moreReviews]);
    setNextIndex(startIndex); 
};

  return (
    <div className=" mx-auto p-6 bg-white">
      {/* Reviews Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Product Reviews</h2>

        <div className="flex items-center gap-4">
        </div>
      </div>

      {/* Rating Summary and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Overall Rating */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {rating.toFixed(1)}
              <span className="text-lg text-gray-500">/5</span>
            </div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(rating))}
            </div>
            <div className="text-gray-500">
              Based on {reviews.length} reviews
            </div>
          </div>
          
          
        </div>

       
        
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {renderStars(review.rating)}
                  
                    <span className="text-green-600 text-sm">Verified Purchase</span>
                  
                </div>
                <h3 className="font-semibold text-lg">{review.title}</h3>
              </div>
              
            </div>
            
            <div className="mb-4">
              <div className="text-gray-600 mb-2">{review.comment}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-500">{review.likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-500">{review.dislikes}</span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                By {review.username} on {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
        onClick={handleLoadMore}
        >
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

export default ProductReviews;