import React, { useState } from 'react';
import { Upload, Trash2, Edit, Plus, Save, X } from 'lucide-react';
const HeroSection = () => {
    const [images, setImages] = useState([
      { id: 1, url: '/api/placeholder/800/400', title: 'Hero Image 1' },
      { id: 2, url: '/api/placeholder/800/400', title: 'Hero Image 2' }
    ]);
    const [editingId, setEditingId] = useState(null);
    const [newTitle, setNewTitle] = useState('');
  
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        // In real implementation, handle file upload to server
        const newImage = {
          id: Date.now(),
          url: URL.createObjectURL(file),
          title: file.name
        };
        setImages([...images, newImage]);
      }
    };
  
    const handleDelete = (id) => {
      setImages(images.filter(img => img.id !== id));
    };
  
    const handleEdit = (image) => {
      setEditingId(image.id);
      setNewTitle(image.title);
    };
  
    const handleSave = (id) => {
      setImages(images.map(img => 
        img.id === id ? { ...img, title: newTitle } : img
      ));
      setEditingId(null);
      setNewTitle('');
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Hero Section Images</h2>
        
        {/* Upload Section */}
        <div className="mb-6">
          <label className="flex items-center gap-2 w-fit px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
            <Upload size={20} />
            <span>Upload New Image</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>
  
        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map(image => (
            <div key={image.id} className="border rounded-lg p-4">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              
              {editingId === image.id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="flex-1 border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => handleSave(image.id)}
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
                  <span className="font-medium">{image.title}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(image)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
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

  export default HeroSection;