import React, { useEffect, useState } from 'react';
import {
  ClipboardCheckIcon,
  InfoIcon,
  ClipboardList,
  Shield, 
  CheckCircle, 
  Clock, 
  Award 

} from 'lucide-react';
import axios from 'axios';
import  toast  from 'react-hot-toast';

const WarrantyRegistration = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    const [formData, setFormData] = React.useState({
      orderId: '',
      productName: '',
      flatNo: '',
      street: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
      name: '',
      mobileNumber: '',
      problem: '',
      serialNumber: '',
      deliveredDate: '',
    });
  
    const [file, setFile] = React.useState(null);

    const [loading, setLoading] = React.useState(false);  
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
  
      if (selectedFile) {
        if (selectedFile.type === "application/pdf") {
          setFile(selectedFile);
          toast.success("File uploaded successfully");
        } else {
          toast.error("Please upload a PDF file");
          setFile(null);
        }
      }
    };
  
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
  
    const userId = localStorage.getItem('userId');
  
    const handleSubmit =async (e) => {
      e.preventDefault();
      setLoading(true);
      try{
        const newformData = new FormData();
        newformData.append('serviceType', 'warranty');
        newformData.append('orderId', formData.orderId);
        newformData.append('productName', formData.productName);
        newformData.append('flatNo', formData.flatNo);
        newformData.append('street', formData.street);
        newformData.append('landmark', formData.landmark);
        newformData.append('city', formData.city);
        newformData.append('state', formData.state);
        newformData.append('pincode', formData.pincode);
        newformData.append('name', formData.name);
        newformData.append('mobileNumber', formData.mobileNumber);
        newformData.append('problem', formData.problem);
        newformData.append('serialNumber', formData.serialNumber);
        newformData.append('orderedDate', formData.deliveredDate);
        newformData.append('invoice', file);
        const response = await axios.post(`/api/v1/users/${userId}/service`, newformData);
  
          if(response.status===201){
            toast.success(`Dear ${formData.name}, Your Request submitted successfully`);
            setFormData({
              orderId: '',
              productName: '',
              flatNo: '',
              street: '',
              landmark: '',
              city: '',
              state: '',
              pincode: '',
              name: '',
              mobileNumber: '',
              problem: '',
              serialNumber: '',
              deliveredDate: ''
  
            });
            setFile(null);
          }else{
            toast.error(response.data.error.message);
          }
  
      }catch(error){
        toast.error('Failed to submit the form');
        console.error(error);

      }finally{
        setLoading(false);
      }
      
      };
    const [terms, setTerms] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header Section */}
      <header className="min-h-screen relative bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white transform -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Shield className="w-20 h-20 text-blue-100" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Product Warranty Registration
              <span className="block text-lg text-blue-100 mt-4 font-normal">
                Protect your investment with our comprehensive warranty coverage
              </span>
            </h1>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Protected",
                description: "Full warranty coverage"
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Quick Process",
                description: "Register in minutes"
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: "Guaranteed",
                description: "Quality assurance"
              }
            ].map((feature, index) => (
              <div key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-colors">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              "Easy Registration",
              "Instant Confirmation",
              "Extended Coverage"
            ].map((text, index) => (
              <div key={index} 
                className="flex items-center text-sm bg-white/10 rounded-full px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                {text}
              </div>
            ))}
          </div>

          {/* Important Notice */}
          <div className="mt-12 text-center">
            <p className="text-sm text-blue-100">
              Please have your product details and purchase information ready
            </p>
          </div>
        </div>
      </div>
    </header>

      {/* Warranty Benefits */}
      <div className="container mx-auto px-4 m-12">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <InfoIcon className="w-5 h-5 mr-2 text-blue-600" />
            Warranty Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Extended warranty coverage",
              "Priority customer support",
              "Free maintenance checks",
              "Exclusive service offers",
              "Genuine spare parts guarantee",
              "Instant warranty validation"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <ClipboardCheckIcon className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Warranty Registration Form</h2>
      <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             
            <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                  placeholder="Enter mobile number"
                  pattern="[0-9]{10}"
                  maxLength="10"
                />
              </div>

              

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                  placeholder="Enter product name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Order ID
                </label>
                <input
                  type="text"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                  placeholder="Enter order ID"
                />
              </div>

              {/* Address Section */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Flat/House No.
                    </label>
                    <input
                      type="text"
                      name="flatNo"
                      value={formData.flatNo}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                      placeholder="Enter flat/house number"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Street/Area
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                      placeholder="Enter street name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Landmark
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter nearby landmark (optional)"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                      placeholder="Enter city name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                      placeholder="Enter state"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                      placeholder="Enter pincode"
                      maxLength="6"
                      pattern="[0-9]{6}"
                    />
                  </div>
                </div>
              </div>

              
                
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Serial Number
                    </label>
                    <input
                      type="text"
                      name="serialNumber"
                      value={formData.serialNumber}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                      placeholder="Enter serial number"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Available at bottom side of the product
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Order Date
                    </label>
                    <input
                      type="date"
                      name="deliveredDate"
                      value={formData.deliveredDate}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                
              

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Problem Description
                </label>
                <textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  rows="4"
                  required
                  placeholder="Describe the issue you're facing"
                />
              </div>

              
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Upload Invoice Copy
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  id='invoice'
                  name='invoice'
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  value={terms}
                  onChange={() => setTerms(!terms)}
                  className="mt-1 mr-2"
                  required
                />
                <p className="text-sm text-gray-600">
                  I agree to the terms and conditions of the warranty and confirm that all provided information is accurate.
                </p>
              </div>
              
              <div className="flex justify-center pt-4">
              {loading==false ? <button
                type="submit"
                className={`flex items-center gap-2  text-white px-8 py-3 rounded-xl font-medium  shadow-lg hover:shadow-xl ${terms ? 'cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors' : 'cursor-not-allowed bg-gray-600 opacity-20'}`}
                disabled={!terms}
                onClick={handleSubmit}
              >
                <ClipboardList size={20} />
                Register Warranty
              </button>:(<button
                 className='flex items-center gap-2  text-white px-8 py-3 rounded-xl font-medium bg-blue-300 opacity-50 shadow-lg  cursor-not-allowed'
              >
              <ClipboardList size={20} />
              submitting...
              </button>)}
            </div>
            </div>

          </form>
        </div>
        </div>
      {/* Important Notes */}
      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-4xl mx-auto bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <InfoIcon className="w-5 h-5 mr-2 text-blue-600" />
            Terms & Conditions
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Please keep your purchase invoice for warranty claims</li>
            <li>• Warranty registration must be completed within 7 days of purchase</li>
            <li>• Make sure to provide accurate product information for validation</li>
            <li>• Sorry, No query will be entertained without registration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WarrantyRegistration;