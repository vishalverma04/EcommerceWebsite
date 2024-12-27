import { useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'
const AddNewProduct = () => {
  const [step, setStep] = useState(1); // Track current step
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "electronics",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    dimensions: "",
    bulletPoints: [""],
    weight: "",
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "In Stock",
    returnPolicy: "",
    images: [],
  });

  const handleChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const addBulletPoint = () => {
    setProduct((prev) => ({
      ...prev,
      bulletPoints: [...prev.bulletPoints, ""],
    }));
  };

  const removeBulletPoint = (index) => {
    setProduct((prev) => {
      const updatedBulletPoints = [...prev.bulletPoints];
      updatedBulletPoints.splice(index, 1);
      return { ...prev, bulletPoints: updatedBulletPoints };
    });
  };

  const handleBulletPointChange = (index, value) => {
    setProduct((prev) => {
      const updatedBulletPoints = [...prev.bulletPoints];
      updatedBulletPoints[index] = value;
      return { ...prev, bulletPoints: updatedBulletPoints };
    });
  };
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file)); // Create preview URLs
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const removeImage = (index) => {
    setProduct((prev) => {
      const updatedImages = [...prev.images];
      updatedImages.splice(index, 1);
      return { ...prev, images: updatedImages };
    });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const [loading,setLoading]=useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(product)
    try {
      const {data}=await axios.post('/api/v1/products/addNewProduct',{
        title:product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        brand: product.brand,
        dimensions: product.dimensions,
        bulletPoints: product.bulletPoints,
        weight: product.weight,
        warrantyInformation: product.warrantyInformation,
        shippingInformation: product.shippingInformation,
        availabilityStatus: "In Stock",
        returnPolicy: product.returnPolicy,
        images: product.images,
      })
      console.log(data)
      if(data.statusCode===200){
        toast.success("Product Added Successfully...")
      }
      if(data.status>=500){
        toast.error(data.message)
        return;
      }
    } catch (error) {
      toast.error('something went wrong while sending data...')
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow m-16">
      <h1 className="text-2xl font-bold mb-6 w-full">Add New Product</h1>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Basic Details</h2>
            <div className="mb-4">
              <label className="block font-medium">Name</label>
              <input
                type="text"
                value={product.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Brand</label>
              <input
                type="text"
                value={product.brand}
                onChange={(e) => handleChange("brand", e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Description</label>
              <textarea
                value={product.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Category</label>
              <select
                value={product.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Pricing & Stock</h2>
            <div className="mb-4">
              <label className="block font-medium">Price</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Discount Percentage</label>
              <input
                type="number"
                value={product.discountPercentage}
                onChange={(e) =>
                  handleChange("discountPercentage", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Stock</label>
              <input
                type="number"
                value={product.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Specifications</h2>
            
            {/* Bullet Points */}
            <div className="mb-4">
              <label className="block font-medium">Bullet Points</label>
              {product.bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) =>
                      handleBulletPointChange(index, e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeBulletPoint(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addBulletPoint}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Bullet Point
              </button>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>
          </>
        )}
        
        {step === 4 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
            <div className="mb-4">
              <label className="block font-medium">Weight</label>
              <input
                type="text"
                value={product.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Dimensions</label>
              <input
                type="text"
                value={product.dimensions}
                onChange={(e) => handleChange("dimensions", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Warranty Information</label>
              <input
                type="text"
                value={product.warrantyInformation}
                onChange={(e) =>
                  handleChange("warrantyInformation", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Shipping Information</label>
              <input
                type="text"
                value={product.shippingInformation}
                onChange={(e) =>
                  handleChange("shippingInformation", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Return Policy</label>
              <textarea
                value={product.returnPolicy}
                onChange={(e) => handleChange("returnPolicy", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>
          </>
        )}
        {step === 5 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Images</h2>
            <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-gray-700 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            />
            <div className="mt-4 grid grid-cols-3 gap-4 p-4">
              {product.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-contain p-2 rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Previous
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </>
        )}
        
      </form>
    </div>
  );
};

export default AddNewProduct;

