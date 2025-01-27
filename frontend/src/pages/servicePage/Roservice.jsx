import React, { useEffect } from 'react';
import {
  SettingsIcon,
  CheckCircle2Icon,
  SearchIcon,
  FilterIcon,
  BarChart2Icon,
  BeakerIcon,
    CheckCircle,
    Waves,
    ArrowRight,
    Droplet,
    DropletIcon,
    ClockIcon,

} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link,Element } from 'react-scroll';
import ScheduleROService from './ScheduleService';

const ROServicePage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const detailedServices = [
    {
      icon: <SearchIcon className="w-12 h-12 text-blue-600 mb-4" />,
      title: "Complete System Inspection",
      description: "Thorough examination of all components including membrane, filters, storage tank, and faucet",
      features: [
        "Pressure gauge testing",
        "Leak detection",
        "Component condition assessment",
        "System efficiency evaluation"
      ]
    },
    {
      icon: <FilterIcon className="w-12 h-12 text-blue-600 mb-4" />,
      title: "Filter Replacement",
      description: "Timely replacement of all essential filters to maintain optimal water purification",
      features: [
        "Sediment filter replacement",
        "Carbon filter replacement",
        "RO membrane inspection",
        "Post-carbon filter change"
      ]
    },
    {
      icon: <BarChart2Icon className="w-12 h-12 text-blue-600 mb-4" />,
      title: "Performance Optimization",
      description: "Fine-tuning your RO system for maximum efficiency and performance",
      features: [
        "Flow rate optimization",
        "Pressure adjustment",
        "Tank air pressure check",
        "System sanitization"
      ]
    },
    // {
    //   icon: <BeakerIcon className="w-12 h-12 text-blue-600 mb-4" />,
    //   title: "Water Quality Testing",
    //   description: "Comprehensive testing to ensure your water meets the highest quality standards",
    //   features: [
    //     "TDS level measurement",
    //     "pH balance testing",
    //     "Contamination screening",
    //     "Quality compliance check"
    //   ]
    // }
  ];
  

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Waves className="w-16 h-16 text-blue-200" />
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Professional RO Service
              <span className="block text-blue-200">&amp; Maintenance</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Expert water purification solutions for your home and business
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="schedule" smooth={true} duration={800} >
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg flex items-center group">
              Schedule Service
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            </Link>
            <Link to="services" smooth={true} duration={800} >
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all flex items-center">
              View Services
              <Droplet className="ml-2 w-5 h-5" />
            </button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "24/7", label: "Service Available" },
              { number: "100%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center mt-12 space-x-6">
            {[
              "Certified Experts",
              "Genuine Parts",
              "Quick Response"
            ].map((text, index) => (
              <div key={index} className="flex items-center text-sm text-blue-100">
                <CheckCircle className="w-4 h-4 mr-2" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>

      {/* Detailed Services Section */}
        
      <section className="p-16" >
      <Element name="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Professional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {detailedServices.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                {service.icon}
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle2Icon className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        </Element>
      </section>
      

      {/* Quick Services Section */}
      <section className="p-16 bg-gray-100" >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <DropletIcon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">RO Installation</h3>
              <p className="text-gray-600">Professional installation of new RO systems with quality components and expert setup.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <SettingsIcon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Maintenance & Repair</h3>
              <p className="text-gray-600">Regular maintenance and prompt repair services to keep your RO system running efficiently.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ClockIcon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Annual Service</h3>
              <p className="text-gray-600">Comprehensive annual service plans to ensure optimal performance and water quality.</p>
            </div>
          </div>
        </div>
      </section>

      <Element name="schedule">
      <section className="p-16 bg-gray-50">
       <ScheduleROService/>
      </section>
      </Element>

      {/* Benefits Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Certified technicians with years of experience",
              "24/7 emergency service available",
              "Genuine spare parts and components",
              "Competitive pricing and transparent quotes",
              "Extended warranty on services",
              "Regular maintenance schedules"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle2Icon className="w-6 h-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Schedule Service Modal */}
        

     
    </div>
  );

};

export default ROServicePage;