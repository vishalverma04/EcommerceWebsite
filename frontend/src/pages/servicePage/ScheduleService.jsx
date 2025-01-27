import { AlertCircle, ClipboardList } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ScheduleROService = () => {
  
  const [formData, setFormData] = React.useState({
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
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const userId = localStorage.getItem('userId');

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      formData.serviceType = 'RO';  
      const response = await axios.post(`/api/v1/users/${userId}/service`, formData);
        if(response.status===201){
          toast.success(`Dear ${formData.name}, Your Request submitted successfully`);
          setFormData({
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
          });
        }else{
          toast.error(response.data.error.message);
        }

    }catch(error){
      toast.error('Failed to submit the form');
    }
    
    };

  return (

    <div className="min-h-screen bg-gray-50 max-w-6xl mx-auto px-4">
     
      
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Schedule Service</h2>
            {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button> */}
        </div>
        {/* Form Type Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {/* Service Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
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

              

              <div className="space-y-2 md:col-span-2">
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
              
            </div>

            

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <ClipboardList size={20} />
                Schedule Service
              </button>
            </div>
          </form>
        </div>
      </div>

  );
};

export default ScheduleROService;