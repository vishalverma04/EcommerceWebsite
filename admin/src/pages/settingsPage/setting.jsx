import { useState } from 'react';
import { Settings, Image, Grid } from 'lucide-react';
import HeroImageAdmin from './HeroSection';
import CategorySections from './CategorySection';

const AdminSettings = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  // Mock components for demonstration - replace with your actual components
  const HeroImageSection = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Hero Image Management</h2>
      <HeroImageAdmin/>
    </div>
  );

  const CategorySection = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Category Management</h2>
      <CategorySections/>
    </div>
  );

  const menuItems = [
    {
      id: 'hero',
      title: 'Hero Images',
      icon: <Image className="w-5 h-5" />,
      component: HeroImageSection
    },
    {
      id: 'category',
      title: 'Categories',
      icon: <Grid className="w-5 h-5" />,
      component: CategorySection
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center">
            <Settings className="w-6 h-6 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-4">
          {/* Sidebar Navigation */}
          <div className="col-span-2">
            <nav className="space-y-1 flex bg-white shadow rounded-lg overflow-hidden">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left
                    ${selectedSection === item.id 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="col-span-4">
            {selectedSection ? (
              <div className="bg-white shadow rounded-lg w-full">
                {menuItems.find(item => item.id === selectedSection)?.component()}
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <Settings className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Welcome to Admin Settings
                </h3>
                <p className="text-gray-500">
                  Select a section from the sidebar to manage your website settings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;