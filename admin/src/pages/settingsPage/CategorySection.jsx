import React, { useState,useEffect } from 'react';
import { Upload, Trash2, Edit, Plus, Save, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCategoryContext } from '../../contexts/categoryContext';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const CategorySection = () => {

    const { categories, setCategories,fetchCategories } = useCategoryContext();

  const [loading, setLoading] = useState(false);
    useEffect(() => {
      fetchCategories();
    }, []);

    const [newCategory, setNewCategory] = useState({ name: '', imageFile: null, imagePreview: null });
    
  
    const handleImageSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        setNewCategory({
          ...newCategory,
          imageFile: file,
          imagePreview: URL.createObjectURL(file)
        });
      }
    };
  
    const handleAddCategory = async () => {
      setLoading(true);
      try{
        const formData = new FormData();
        formData.append('name', newCategory.name);
        formData.append('image', newCategory.imageFile);
  
        const { data } = await axios.post(`${SERVER_URL}/api/v1/settings/addnewcategory`, formData);
        setCategories([...categories, data.newCategory]);
        setNewCategory({ name: '', imageFile: null, imagePreview: null });
        toast.success('Category added successfully');
      }catch(error){
        toast.error('Failed to add category');
      }finally{
        setLoading(false);
      }
    };
  
    const handleDeleteCategory =async (id) => {
      if(window.confirm('Are you sure?')){
         try {
            const {data} = await axios.delete(`${SERVER_URL}/api/v1/settings/deletecategory/${id}`);
            setCategories(categories.filter(category=>category._id!==id))
            toast.success(data.message)
        } catch (error) {
            toast.error('Internal Server Error');
        }        
      }
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        
        {/* Add Category Form */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            placeholder="Enter category name"
            className="w-full border rounded-lg px-4 py-2"
          />
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
              <Upload size={20} />
              <span>Select Category Image</span>
              <input
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
                onChange={handleImageSelect}
              />
            </label>
            
            {loading===false?<button
              onClick={handleAddCategory}
              disabled={!newCategory.name || !newCategory.imagePreview}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Plus size={20} />
              <span>Add Category</span>
            </button>:(
              <button
                 disabled
                 className='flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-400 cursor-not-allowed'
              >
              <Plus size={20} />
              <span>Adding...</span>
              </button>
            )}
          </div>
  
          {newCategory.imagePreview && (
            <div className="w-24 h-24 relative">
              <img
                src={newCategory.imagePreview}
                alt="Category preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => setNewCategory({ ...newCategory, imageFile: null, imagePreview: null })}
                className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
  
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(category => (
            <div
              key={category._id}
              className="border rounded-lg p-4"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-20  h-20 object-cover rounded-full mb-3"
              />
              
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.name}</span>
      
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={20} />
                    </button>
                </div>
              
            </div>
          ))}
        </div>

      </div>
    );
  };

  export default CategorySection;