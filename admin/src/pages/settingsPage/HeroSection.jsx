// import React, { useState,useEffect } from 'react';
// import { Upload, Trash2, Edit, Plus, Save, X } from 'lucide-react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// const HeroSection = () => {
//     const [images, setImages] = useState([]);

    // useEffect(() => {
    //   const fetchImages = async () => {
    //     const response = await axios.get('/api/v1/settings/getheroimages');
    //     setImages(response.data.heroImages);
    //   }
    //   fetchImages();
    // }, []);

//     const [loadind,setLoading]=useState(false)  
  
    // const handleImageUpload =async (e) => {
    //   setLoading(true)
    //   try{
    //    const formData=new FormData()
    //     formData.append('image',e.target.files[0])
    //     const response = await axios.post('/api/v1/settings/addnewheroimage',formData);
    //     setImages([...images, response.data.newHeroImage]);
    //     toast.success(response.data.message);

    //   }catch(error){
    //     toast.error(error.response.data.message);
    //   }finally{
    //     setLoading(false)
    //   }
    // };
  
    // const handleDelete =async (id) => {
    //   if(window.confirm('Are you sure?')){
    //     try {
    //        const {data} = await axios.delete(`/api/v1/settings/deleteheroimage/${id}`);
    //        setImages(images.filter(image=>image._id!==id))
    //        toast.success('Hero Image deleted successfully')
    //    } catch (error) {
    //        toast.error('Internal Server Error');
    //    }        
    //  }

//     };
//     if(loadind){
//       return <div>Loading...</div>
//     }
  
//     return (
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Hero Section Images</h2>
        
//         {/* Upload Section */}
//         <div className="mb-6">
//           <label className="flex items-center gap-2 w-fit px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
//             <Upload size={20} />
//             <span>Upload New Image</span>
//             <input
//               type="file"
//               className="hidden"
//               accept="image/*"
//               onChange={handleImageUpload}
//             />
//           </label>
//         </div>
  
//         {/* Images Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {images.map(image => (
//             <div key={image._id} className="border rounded-lg p-4">
//               <img
//                 src={image.image}
//                 loading='lazy'
//                 className="w-full h-48 object-cover rounded-lg mb-3"
//               />
//                 <div className="flex items-center justify-between">
                
//                     <button
//                       onClick={() => handleDelete(image._id)}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded flex"
//                     >
//                     <span>Delete</span>
//                       <Trash2 size={20} />
                      
//                     </button>
//                 </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   export default HeroSection;

import { useState,useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Upload, Trash2,Plus} from 'lucide-react'

const HeroImageAdmin = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [image, setImage] = useState(null);
  const [productId, setProductId] = useState('');

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = {
          id: Date.now(),
          url: url,
          file: file
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit =async (e) => {
    setIsLoading(true)
    try{
     const formData=new FormData()
      formData.append('image',image)
      formData.append('productId',productId)
      const response = await axios.post('/api/v1/settings/addnewheroimage',formData);
      setImages([...images, response.data.newHeroImage]);
      toast.success(response.data.message);
      setImage(null);
      setPreviewUrl('');

    }catch(error){
      toast.error(error.response.data.message);
    }finally{
      setIsLoading(false)
    }
  };

  const handleDelete =async (id) => {
    if(window.confirm('Are you sure?')){
      try {
         const {data} = await axios.delete(`/api/v1/settings/deleteheroimage/${id}`);
         setImages(images.filter(image=>image._id!==id))
         toast.success('Hero Image deleted successfully')
     } catch (error) {
         toast.error('Internal Server Error');
     }        
   }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
          
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {previewUrl && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Preview:</p>
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-md h-48 object-cover rounded-lg"
            />
          </div>
        )}
         
        <button
          type="submit"
          disabled={isLoading || !image || !previewUrl}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          onClick={handleSubmit}
        >
          {isLoading ?  (
            <div className='flex items-center gap-2'>
              <Upload size={20} />
              <span>Uploading...</span>
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Plus size={20} />
              <span>Add Hero Image</span>
            </div>
          )}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Existing Hero Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image) => (
            <div key={image._id} className="border rounded-lg p-4">
              <img
                src={image.image}
                loading='lazy'
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <button
                onClick={() => handleDelete(image._id)}
                className="mt-2 text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroImageAdmin;