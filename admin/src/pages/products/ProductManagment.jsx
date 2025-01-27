import React, { useState ,useEffect} from 'react';
import { Edit, Trash2, Search, Plus, X, Minus } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCategoryContext } from '../../contexts/categoryContext';


// ProductTable Component
const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price(₹)</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Stock</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-12 w-12 rounded object-cover"
                />
              </td>
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{product.title}</div>
                <div className="text-sm text-gray-500">{product.brand}</div>
              </td>
              <td className="px-6 py-4 text-gray-500">{product.category}</td>
              <td className="px-6 py-4 text-gray-900">₹{product.price}</td>
              <td className="px-6 py-4 text-gray-500">{product.stock}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  product.stock >0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock>0 ? "Active" :"In Active"}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <button 
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => onDelete(product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// SearchBar Component
const SearchBar = ({ onSearch }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        placeholder="Search products by name, category, brand ..."
        onChange={(e) => onSearch(e.target.value)}
        className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

// EditProductModal Component
const EditProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState(product || {
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData,product._id);
    onClose();
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
  const handleBulletPointChange = (index, value) => {
    const newBulletPoints = [...formData.bulletPoints];
    newBulletPoints[index] = value;
    setFormData((prev) => ({
      ...prev,
      bulletPoints: newBulletPoints,
    }));
  };

  const {categories}=useCategoryContext()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white  rounded-lg p-6 w-full max-w-[60%] h-full overflow-scroll">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name.toLowerCase()}>
                    {category.name}
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
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

           </div>
          

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">Discount(%)</label>
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">Dimensions</label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                placeholder="e.g., 10 x 20 x 30 cm"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">Weight(kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="in kg e.g., 1.5 "
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">Warranty Information</label>
            <textarea
              name="warrantyInformation"
              value={formData.warrantyInformation}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">Shipping Information</label>
            <textarea
              name="shippingInformation"
              value={formData.shippingInformation}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">Return Policy</label>
            <textarea
              name="returnPolicy"
              value={formData.returnPolicy}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          </div>

          


          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main ProductManagement Component
const ProductManagement = () => {
  const [loading,setLoading]=useState(false)
  const [products, setProducts] = useState([]);

  const navigate=useNavigate()

  const fetchProducts = async () => {
    const {data} = await axios.get('/api/v1/admin/products');
    setProducts(data.products)
  };
 
  useEffect(() => {
    setLoading(true)
    try {
      fetchProducts();
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
    
  }, []);

 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete =async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      if(window.confirm('again are sure product will delete permanently')){
        const response= await axios.delete(`/api/v1/admin/product/${productId}`)
        if(response.status==200){
          toast.success(response.data.message)
          fetchProducts()
        }else{
          toast.error(response.data.message)
        }
      }
    }
  };

  const handleSave = async(formData,productId) => {
    setLoading(true)
    try {
     const response=await axios.put(`/api/v1/admin/product/${productId}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )  
    if(response.status==200){
      toast.success(response.data.message)
    setIsModalOpen(false);
    setEditingProduct(null);
    }else{
      toast.error(response.data.message)
    } 
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
      fetchProducts()
    }
    
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Product Management</h1>
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          <button
            onClick={() => {
              navigate('/addnewproduct')
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add New Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <EditProductModal
          product={editingProduct}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProductManagement;