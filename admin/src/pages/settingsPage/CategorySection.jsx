import React, { useState } from 'react';
import { Upload, Trash2, Edit, Plus, Save, X } from 'lucide-react';

const CategorySection = () => {
    const [categories, setCategories] = useState([
      { id: 1, name: 'Electronics', imageUrl: '/api/placeholder/400/400' },
      { id: 2, name: 'Fashion', imageUrl: '/api/placeholder/400/400' }
    ]);
    const [newCategory, setNewCategory] = useState({ name: '', imageFile: null, imagePreview: null });
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');
  
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
  
    const handleAddCategory = () => {
      if (newCategory.name.trim() && newCategory.imagePreview) {
        const category = {
          id: Date.now(),
          name: newCategory.name,
          imageUrl: newCategory.imagePreview // In real app, this would be the uploaded image URL
        };
        setCategories([...categories, category]);
        setNewCategory({ name: '', imageFile: null, imagePreview: null });
      }
    };
  
    const handleDeleteCategory = (id) => {
      setCategories(categories.filter(cat => cat.id !== id));
    };
  
    const handleEdit = (category) => {
      setEditingId(category.id);
      setEditName(category.name);
    };
  
    const handleSave = (id) => {
      setCategories(categories.map(cat => 
        cat.id === id ? { ...cat, name: editName } : cat
      ));
      setEditingId(null);
      setEditName('');
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
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg cursor-pointer hover:bg-gray-700">
              <Upload size={20} />
              <span>Select Category Image</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageSelect}
              />
            </label>
            
            <button
              onClick={handleAddCategory}
              disabled={!newCategory.name || !newCategory.imagePreview}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Plus size={20} />
              <span>Add Category</span>
            </button>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => (
            <div
              key={category.id}
              className="border rounded-lg p-4"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              
              {editingId === category.id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => handleSave(category.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded"
                  >
                    <Save size={20} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default CategorySection;