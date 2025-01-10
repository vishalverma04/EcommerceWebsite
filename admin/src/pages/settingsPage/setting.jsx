import React from 'react';
import HeroSection from './HeroSection';
import CategorySection from './CategorySection';

const Settings = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Settings</h1>
      <div className="space-y-8">
        <HeroSection />
        <CategorySection />
      </div>
    </div>
  );
};

export default Settings;