import React from 'react';
import { 
  Phone, 
  Mail, 
  Instagram, 
  Waves,
  MapPin, 
  RefrigeratorIcon, 
  Tv, 
  Wifi, 
  ShoppingBag,
  Heart,
  Users,
  CheckCircle,
  Clock
} from 'lucide-react';

const AboutUs = () => {
  return (
    <div className=" mx-auto px-16 py-8">
      {/* Hero Section */}
      <div className="text-center ">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">HG ENTERPRISES INDIA</h1>
        <p className="text-xl text-gray-600">Welcome to HG Enterprises India - Your Trusted Partner in Home Electronics</p>
      </div>

      {/* Our Story */}
      <div className='grid mb-12 md:grid-cols-2 gap-8 items-center'>
          <img
          src="https://westernequipments.com/wp-content/uploads/2024/08/Revised-Banner.jpg"
          alt="Hero"
          className="w-full h-full object-cover transition-opacity duration-1000"

          ></img>
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Your Trusted Business Partner</h2>
        <p className="text-gray-600 leading-relaxed">
          At HG Enterprises India, we understand that choosing the right electronic appliances is crucial for modern living. 
          That's why we've carefully curated a comprehensive selection of products from the world's most trusted brands. 
          From energy-efficient refrigerators to state-of-the-art microwave ovens, we ensure that every product in our 
          inventory meets the highest standards of quality and performance.
        </p>
      </div>
      </div>

      {/* What Sets Us Apart */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">What Sets Us Apart</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
            <Users className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Product Knowledge</h3>
            <p className="text-gray-600">Our team stays up-to-date with the latest technological advancements to provide expert guidance.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
            <CheckCircle className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
            <p className="text-gray-600">We partner exclusively with renowned manufacturers to guarantee genuine products.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
            <Heart className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer-First Approach</h3>
            <p className="text-gray-600">Your satisfaction is the cornerstone of our business, with exceptional service and support.</p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Product Range</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <RefrigeratorIcon className="w-6 h-6 text-blue-600" />
            <span>Refrigerators</span>
          </div>
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <Waves className="w-6 h-6 text-blue-600" />
            <span>RO</span>
          </div>
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <Wifi className="w-6 h-6 text-blue-600" />
            <span>Air Conditioners</span>
          </div>
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            <span>Kitchen Appliances</span>
          </div>
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <Tv className="w-6 h-6 text-blue-600" />
            <span>Home Entertainment</span>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Connect With Us</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold">Address:</p>
                <p className="text-gray-600">HG ENTERPRISES INDIA</p>
                <p className="text-gray-600">Konsiwas Road, Vijay Nagar</p>
                <p className="text-gray-600">Rewari, Haryana 123401</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold">Business Hours:</p>
                <p className="text-gray-600">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                <p className="text-gray-600">Sunday: 10:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold">Contact Numbers:</p>
                <p className="text-gray-600">+91 97285 98505</p>
                <p className="text-gray-600">+91 73038 99440</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-600" />
              <p className="text-gray-600">info@hgenterprisesindia.com</p>
            </div>
            <div className="flex items-center gap-3">
            <a className='flex gap-3' 
            href="https://www.instagram.com/hgenterprisesindia?igsh=M3RxdmQxbWp4Ymth"
             target='_blank'
            >
              <Instagram className="w-6 h-6 text-blue-600" />
              <p className="text-gray-600">@hgenterprisesindia</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;