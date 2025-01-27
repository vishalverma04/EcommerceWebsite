import React from 'react';
import { 
  CheckCircle,
  Shield, 
  Waves,
  Settings, 
  Filter,
  ActivitySquare,
  Beaker,
  Clock,
  Award,
  FileCheck
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const ServicePage = () => {
    const navigate = useNavigate();

  return (
    <div className=" bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Header Section */}
      <header className=" py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 text-blue-600">RO Service And Product Warranty</h1>
            <p className="text-lg text-gray-800 mb-12">Keep your RO running smoothly & register your product warranty now!</p>
          </div>
          
          {/* Information Cards in Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* RO Service & Maintenance Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-black/20 cursor-pointer hover:shadow-[12px_12px_12px_rgba(0,0,0,0.5)] transition-shadow duration-200"
             onClick={() => navigate('/services/ro-service')}
            >
              <div className="flex items-center gap-3 mb-6">
                <Waves className="h-8 w-8 text-blue-500" />
                <h2 className="text-2xl font-bold">RO Service & Maintenance</h2>
              </div>
              <p className="text-gray-800 mb-8">Keep your water purification system running at peak performance with our professional RO service. We offer comprehensive maintenance, filter replacement, and system optimization to ensure clean, safe drinking water for your home or business.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Settings className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Complete System Inspection</h3>
                    <p className="text-gray-800 text-sm">Thorough checkup of all components</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Filter className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Filter Replacement</h3>
                    <p className="text-gray-800 text-sm">Timely replacement of all filters</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ActivitySquare className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Performance Optimization</h3>
                    <p className="text-gray-800 text-sm">System tuning for best results</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Beaker className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Water Quality Testing</h3>
                    <p className="text-gray-800 text-sm">Regular quality checks</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warranty Registration Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-black/20 cursor-pointer hover:shadow-[12px_12px_12px_rgba(0,0,0,0.5)] transition-shadow duration-200"
                onClick={() => navigate('/services/warranty')}
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-blue-500" />
                <h2 className="text-2xl font-bold">Warranty Registration</h2>
              </div>
              <p className="text-gray-800 mb-8">Protect your investment by registering your product warranty. Our streamlined registration process ensures you get full coverage and support for your water purification system, giving you peace of mind for years to come.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Extended Coverage Options</h3>
                    <p className="text-gray-800 text-sm">Flexible warranty plans</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Priority Support Access</h3>
                    <p className="text-gray-800 text-sm">24/7 dedicated assistance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Genuine Replacement Parts</h3>
                    <p className="text-gray-800 text-sm">Certified components only</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileCheck className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Documentation Management</h3>
                    <p className="text-gray-800 text-sm">Easy access to records</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </header>

      
    </div>
  );
};

export default ServicePage;