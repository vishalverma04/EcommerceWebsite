// import { useState } from "react";
// // import { Alert, AlertDescription } from "@/components/ui/alert";
// import toast from 'react-hot-toast';


// const AddNewProduct = () => {
//   const [step, setStep] = useState(1);
//   const [notification, setNotification] = useState({ type: '', message: '' });
//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     category: "electronics",
//     price: "",
//     discountPercentage: "",
//     rating: "",
//     stock: "",
//     brand: "",
//     dimensions: "",
//     bulletPoints: [""],
//     weight: "",
//     warrantyInformation: "",
//     shippingInformation: "",
//     availabilityStatus: "In Stock",
//     returnPolicy: "",
//     images: [],
//     files: []
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (field, value) => {
//     setProduct((prev) => ({ ...prev, [field]: value }));
//   };

//   const addBulletPoint = () => {
//     setProduct((prev) => ({
//       ...prev,
//       bulletPoints: [...prev.bulletPoints, ""],
//     }));
//   };

//   const removeBulletPoint = (index) => {
//     setProduct((prev) => {
//       const updatedBulletPoints = [...prev.bulletPoints];
//       updatedBulletPoints.splice(index, 1);
//       return { ...prev, bulletPoints: updatedBulletPoints };
//     });
//   };

//   const handleBulletPointChange = (index, value) => {
//     setProduct((prev) => {
//       const updatedBulletPoints = [...prev.bulletPoints];
//       updatedBulletPoints[index] = value;
//       return { ...prev, bulletPoints: updatedBulletPoints };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const formData = new FormData();
      
//       // Append all non-file data
//       Object.keys(product).forEach(key => {
//         if (key === 'images' || key === 'files') {
//           return;
//         }
//         if (key === 'bulletPoints') {
//           // formData.append(key, JSON.stringify(product[key]));
//           formData.append(key, product[key]);
//         } else {
//           formData.append(key, product[key]);
//         }
//       });
      
//       // Append each file with the correct field name
//       product.files.forEach((file) => {
//         formData.append('productImage', file);
//       });
  
//       const response = await fetch('/api/v1/products/addNewProduct', {
//         method: 'POST',
//         body: formData
//       });
  
//       const data = await response.json();
      
//       if (response.ok) {
//         toast.success(data.message || 'Product added successfully');
//       } else {
//         throw new Error(data.message || 'Failed to add product');
//       }
//     } catch (error) {
//       toast.error(error.message || 'An error occurred. Please try again');
//     } finally {
//       setLoading(false);
      
//     }
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Store file objects for upload
//     setProduct(prev => ({
//       ...prev,
//       files: [...(prev.files || []), ...files],
//       images: [...prev.images, ...files.map(file => URL.createObjectURL(file))]
//     }));
//   };

//   const removeImage = (index) => {
//     setProduct((prev) => {
//       const updatedImages = [...prev.images];
//       const updatedFiles = [...prev.files];
//       updatedImages.splice(index, 1);
//       updatedFiles.splice(index, 1);
//       return { 
//         ...prev, 
//         images: updatedImages,
//         files: updatedFiles
//       };
//     });
//   };

//   const nextStep = () => setStep((prev) => prev + 1);
//   const prevStep = () => setStep((prev) => prev - 1);

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow m-16">


//       <h1 className="text-2xl font-bold mb-6 w-full">Add New Product</h1>
//       <form onSubmit={handleSubmit}>
//         {step === 1 && (
//           <>
//             <h2 className="text-lg font-semibold mb-4">Basic Details</h2>
//             <div className="mb-4">
//               <label className="block font-medium">Name</label>
//               <input
//                 type="text"
//                 value={product.title}
//                 onChange={(e) => handleChange("title", e.target.value)}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block font-medium">Brand</label>
//               <input
//                 type="text"
//                 value={product.brand}
//                 onChange={(e) => handleChange("brand", e.target.value)}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block font-medium">Description</label>
//               <textarea
//                 value={product.description}
//                 onChange={(e) => handleChange("description", e.target.value)}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block font-medium">Category</label>
//               <textarea
//                 value={product.category}
//                 onChange={(e) => handleChange("category", e.target.value)}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <h2 className="text-lg font-semibold mb-4">Pricing & Stock</h2>
//             <div className="mb-4">
//               <label className="block font-medium">Price</label>
//               <input
//                 type="number"
//                 value={product.price}
//                 onChange={(e) => handleChange("price", e.target.value)}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block font-medium">Discount Percentage</label>
//               <input
//                 type="number"
//                 value={product.discountPercentage}
//                 onChange={(e) => handleChange("discountPercentage", e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block font-medium">Stock</label>
//               <input
//                 type="number"
//                 value={product.stock}
//                 onChange={(e) => handleChange("stock", e.target.value)}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className="px-4 py-2 bg-gray-500 text-white rounded"
//               >
//                 Previous
//               </button>
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}

//         {step === 3 && (
//           <>
//             <h2 className="text-lg font-semibold mb-4">Specifications</h2>
//             <div className="mb-4">
//               <label className="block font-medium">Bullet Points</label>
//               {product.bulletPoints.map((point, index) => (
//                 <div key={index} className="flex items-center gap-2 mb-2">
//                   <input
//                     type="text"
//                     value={point}
//                     onChange={(e) => handleBulletPointChange(index, e.target.value)}
//                     className="w-full p-2 border rounded"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeBulletPoint(index)}
//                     className="px-2 py-1 bg-red-500 text-white rounded"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addBulletPoint}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 Add Bullet Point
//               </button>
//             </div>
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className="px-4 py-2 bg-gray-500 text-white rounded"
//               >
//                 Previous
//               </button>
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}

//         {step === 4 && (
//           <>
//             <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
//             <div className="mb-4">
//               <label className="block font-medium">Weight</label>
//               <input
//                 type="text"
//                 value={product.weight}
//                 onChange={(e) => handleChange("weight", e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block font-medium">Dimensions</label>
//               <input
//                 type="text"
//                 value={product.dimensions}
//                 onChange={(e) => handleChange("dimensions", e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block font-medium">Warranty Information</label>
//               <input
//                 type="text"
//                 value={product.warrantyInformation}
//                 onChange={(e) => handleChange("warrantyInformation", e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block font-medium">Shipping Information</label>
//               <input
//                 type="text"
//                 value={product.shippingInformation}
//                 onChange={(e) => handleChange("shippingInformation", e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block font-medium">Return Policy</label>
//               <textarea
//                 value={product.returnPolicy}
//                 onChange={(e) => handleChange("returnPolicy", e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className="px-4 py-2 bg-gray-500 text-white rounded"
//               >
//                 Previous
//               </button>
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}

//         {step === 5 && (
//           <>
//             <h2 className="text-lg font-semibold mb-4">Images</h2>
//             <div className="mt-6">
//               <label className="block text-gray-700 font-medium mb-2">Upload Images</label>
//               <input
//                 type="file"
//                 name="productImage"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="block w-full text-gray-700 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
//               />
//               <div className="mt-4 grid grid-cols-3 gap-4 p-4">
//                 {product.images.map((image, index) => (
//                   <div key={index} className="relative">
//                     <img
//                       src={image}
//                       alt={`Product ${index + 1}`}
//                       className="w-full h-32 object-contain p-2 rounded-lg shadow-md"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className="px-4 py-2 bg-gray-500 text-white rounded"
//               >
//                 Previous
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`px-4 py-2 bg-green-500 text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//               >
//                 {loading ? 'Submitting...' : 'Submit'}
//               </button>
//             </div>
//           </>
//         )}
//       </form>
//     </div>
//   );
// };

// export default AddNewProduct;

import React, { useState } from 'react';
import { Plus, Minus, Upload, AlertCircle, Save } from 'lucide-react';
import toast from 'react-hot-toast';
const AddProductPage = () => {
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    discountPercentage: '',
    rating: '0',
    stock: '',
    brand: '',
    dimensions: '',
    bulletPoints: [''],
    weight: '',
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: 'in-stock',
    returnPolicy: '',
    images: [],
    files: []
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Kitchen',
    'Books',
    'Sports',
    'Beauty',
    'Toys',
    'Automotive',
  ];

  const availabilityOptions = [
    { value: 'in-stock', label: 'In Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'pre-order', label: 'Pre-Order' },
    { value: 'discontinued', label: 'Discontinued' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBulletPointChange = (index, value) => {
    const newBulletPoints = [...formData.bulletPoints];
    newBulletPoints[index] = value;
    setFormData((prev) => ({
      ...prev,
      bulletPoints: newBulletPoints,
    }));
  };

  const addBulletPoint = () => {
    setFormData((prev) => ({
      ...prev,
      bulletPoints: [...prev.bulletPoints, ''],
    }));
  };

  const removeBulletPoint = (index) => {
    const newBulletPoints = formData.bulletPoints.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      bulletPoints: newBulletPoints,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...files], // Store actual files
      images: [...prev.images, ...imageUrls] // Keep preview URLs
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    
    try {
      const submitData = new FormData();
      
      // Append all non-file data
      Object.keys(formData).forEach(key => {
        if (key === 'images' || key === 'files') {
          return;
        }
        if (key === 'bulletPoints') {
          submitData.append(key, formData[key]);
        } else {
          submitData.append(key, formData[key]);
        }
      });
      
      // Append each file
      formData.files.forEach((file) => {
        submitData.append('productImage', file);
      });
  
      const response = await fetch('/api/v1/products/addNewProduct', {
        method: 'POST',
        body: submitData
      });
  
      const data = await response.json();
      
      if (response.ok) {
        toast.success(data.message || 'Product added successfully');
        // Optionally reset form or redirect
      } else {
        throw new Error(data.message || 'Failed to add product');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again');
    } finally {
      setLoading(false);
    }
  };

  

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.stock || formData.stock < 0) newErrors.stock = 'Valid stock is required';
    if (!formData.brand) newErrors.brand = 'Brand is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing and Inventory */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Pricing & Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (<span>&#8377;</span>)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability Status
              </label>
              <select
                name="availabilityStatus"
                value={formData.availabilityStatus}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availabilityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Details</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    placeholder="e.g., 10 x 20 x 30 cm"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight
                  </label>
                  <input
                    type="Number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="in kg e.g., 1.5 "
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bullet Points
                </label>
                {formData.bulletPoints.map((point, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handleBulletPointChange(index, e.target.value)}
                      placeholder={`Bullet point ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.bulletPoints.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBulletPoint(index)}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBulletPoint}
                  className="mt-2 flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Bullet Point
                </button>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warranty Information
                </label>
                <textarea
                  name="warrantyInformation"
                  value={formData.warrantyInformation}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shipping Information
                </label>
                <textarea
                  name="shippingInformation"
                  value={formData.shippingInformation}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Return Policy
                </label>
                <textarea
                  name="returnPolicy"
                  value={formData.returnPolicy}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Images</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 text-gray-500 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload images</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              {errors.images && (
                <div className="flex gap-2 p-4 border border-red-200 bg-red-50 rounded-lg text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <p>{errors.images}</p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-contain rounded-lg bg-gray-100"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            {/* <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button> */}
              <button
      type="submit"
      disabled={loading}
      className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <Save className="h-4 w-4 mr-2" />
      {loading ? 'Saving...' : 'Save Product'}
    </button>
          </div>
          </form>
          </div>

</div>
  );
}   

export default AddProductPage;