import React, { useState } from "react";

const SettingsPage = () => {
  const [siteTitle, setSiteTitle] = useState("My E-Commerce Website");
  const [tagline, setTagline] = useState("Best products at the best prices.");
  const [contactEmail, setContactEmail] = useState("admin@ecommerce.com");
  const [heroImages, setHeroImages] = useState([]);
  const [theme, setTheme] = useState("light");

  // Handle file upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setHeroImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle form submissions
  const handleSaveSettings = (e) => {
    e.preventDefault();
    // Save settings logic here
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Site Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Site Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Site Title</label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
        </div>

        {/* Hero Section Images */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Hero Section Images</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1"
              />
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              {heroImages.map((image, index) => (
                <div key={index} className="w-32 h-32 bg-gray-100 border rounded-lg">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Hero ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        {/* <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Theme Settings</h2>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === "light"}
                onChange={() => setTheme("light")}
                className="form-radio text-blue-500"
              />
              <span className="ml-2 text-gray-700">Light Mode</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === "dark"}
                onChange={() => setTheme("dark")}
                className="form-radio text-blue-500"
              />
              <span className="ml-2 text-gray-700">Dark Mode</span>
            </label>
          </div>
        </div> */}

        {/* Save Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
