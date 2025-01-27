import React, { useState } from 'react';
import { Star, X, Upload } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../../pages/Loader'
import { useAuth } from '../../contexts/AuthContext';

const ReviewSubmission = ({isopen,productId}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [images, setImages] = useState([]);
  const [loading,setLoading] = useState(false);

  const {loggedInUser}=useAuth()

  // const handleImageUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   // In a real app, you'd handle file uploads to a server
  //   setImages([...images, ...files.map(file => URL.createObjectURL(file))]);
  // };


  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true);
    // Here you would typically send the review data to your backend
     try{
        const formData = new FormData();    
        formData.append('rating', rating);
        formData.append('comment', review);
        formData.append('title', title);
        formData.append('userId',loggedInUser.userId)
        formData.append('username',loggedInUser.fullName)
        
        const response = await axios.post(`/api/v1/products/${productId}/review`, formData);
        
        toast.success('Thank you for your feedback! We appreciate your review');

        isopen(false);
    
     }catch(error){
        console.log(error)
        toast.error(error.response.data.message)
     }finally{
        setLoading(false);
     }
  };

  // const removeImage = (index) => {
  //   setImages(images.filter((_, i) => i !== index));
  // };

  if(loading){
    return <Loader/>
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Write a Review</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <X size={24} onClick={()=>isopen(false)}/>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Rating Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Overall Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  className={`cursor-pointer ${
                    (hoverRating || rating) >= star
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
          </div>

          {/* Review Title */}
           <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Review Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Sum up your review in a short title"
              required
            />
          </div> 

          {/* Review Content */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Your Review</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
              placeholder="What did you like or dislike? How was the quality?"
              required
            />
          </div>

          {/* Image Upload */}
          {/* <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Add Photos</label>
            <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-blue-500">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Upload className="text-gray-400" />
              </label>
            </div>
          </div> */}

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex-1"
            >
              Submit Review
            </button>
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={()=>isopen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewSubmission;