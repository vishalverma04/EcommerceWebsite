import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams(); // Product ID from URL
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "electronics",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    dimensions: "",
    bulletPoints: [],
    weight: "",
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "In Stock",
    returnPolicy: "",
    images: [],
  });

  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    // Fetch product details by ID
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleBulletPointChange = (index, value) => {
    const updatedPoints = [...productData.bulletPoints];
    updatedPoints[index] = value;
    setProductData({ ...productData, bulletPoints: updatedPoints });
  };

  const addBulletPoint = () => {
    setProductData({ ...productData, bulletPoints: [...productData.bulletPoints, ""] });
  };

  const removeBulletPoint = (index) => {
    const updatedPoints = productData.bulletPoints.filter((_, i) => i !== index);
    setProductData({ ...productData, bulletPoints: updatedPoints });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle image uploads if there are new images
      const uploadedImageLinks = [];
      if (newImages.length > 0) {
        for (const image of newImages) {
          const formData = new FormData();
          formData.append("image", image);
          const response = await axios.post("/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          uploadedImageLinks.push(response.data.url);
        }
      }

      const updatedProduct = {
        ...productData,
        images: [...productData.images, ...uploadedImageLinks],
      };

      // Update product details
      await axios.put(`/api/products/${id}`, updatedProduct);
      alert("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Update Product</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={productData.title}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Discount Percentage</label>
            <input
              type="number"
              name="discountPercentage"
              value={productData.discountPercentage}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Bullet Points</label>
          {productData.bulletPoints.map((point, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={point}
                onChange={(e) => handleBulletPointChange(index, e.target.value)}
                className="flex-1 border rounded-md p-2"
              />
              <button
                type="button"
                onClick={() => removeBulletPoint(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addBulletPoint}
            className="text-blue-500"
          >
            Add Bullet Point
          </button>
        </div>

        <div>
          <label className="block text-gray-700">Upload New Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
