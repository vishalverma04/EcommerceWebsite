import React, { useState } from 'react';
import { Home, Building2, Plus, X, Check, Trash } from 'lucide-react';
import { getAllAddresses,addNewAddress,deleteAddress } from '../../utility/address';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../pages/Loader';

const Address = () => {

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId=localStorage.getItem('userId');

  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?._id);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'home',
    street: '',
    city: '',
    state: '',
    pincode: '',
    fullName:'',
    mobileNumber:'',
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {  
        const addresses = await getAllAddresses(userId);
        setAddresses(addresses);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleAddNewAddress = async() => {
    if (!newAddress.street || !newAddress.city || 
        !newAddress.state || !newAddress.pincode ) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      const {address,res}=await addNewAddress(userId, newAddress);
      if(res===true){
        setAddresses([...addresses, address]);
      
      setIsAddingNew(false);

    setNewAddress({
      type: 'home',
      street: '',
      city: '',
      state: '',
      pincode: '',
      fullName:'',
      mobileNumber:'',
    });
  }
    } catch (error) {
      toast.error(error.message);
    }finally{
      
    }
    
  };

  const handleDeleteAddress =async (id) => {
    try {
      const response=await deleteAddress(userId, id);
      if(response===true){
        setAddresses(addresses.filter((address) => address._id !== id));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  

  if(loading) { return <Loading />; }

  return (
    
    <div className="md:col-span-5 p-4">
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="font-semibold text-lg mb-4">My Addresses</h2>
        
        <div className="space-y-4 mb-6">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`relative flex items-start p-4 border rounded-lg cursor-pointer transition-all duration-200 
                ${selectedAddress === address._id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'}`}
              onClick={() => setSelectedAddress(address._id)}
            >
              
              <div className="ml-4 flex-grow">
                <div className="flex items-center gap-2">
                  {address.type === 'home' ? (
                    <Home className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Building2 className="w-4 h-4 text-blue-600" />
                  )}
                  <span className="font-medium">{address.type.toUpperCase()}</span>
                </div>
                <p className="mt-1 font-medium">{address.fullName}</p>
                <p className="text-sm text-gray-600">
                  {address.street}, {address.city}, {address.state} - {address.pincode}
                </p>
                <p className="text-sm text-gray-600">Phone: {address.mobileNumber}</p>
              </div>
              
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteAddress(address._id);
                }}
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
  
        {!isAddingNew ? (
          <div className='space-y-4'> 
          <button
            className="w-full py-3 border-2 border-dashed border-blue-500 text-blue-600 rounded-lg
              flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
            onClick={() => setIsAddingNew(true)}
          >
            <Plus className="w-4 h-4" />
            Add New Address
          </button>
          </div>
        ) : (
          <div className="bg-white p-6 border border-gray-200 rounded-lg animate-fade-in">
            <h3 className="text-xl font-semibold mb-6">Add New Address</h3>
            
            <div className="flex gap-4 mb-6">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors
                  ${newAddress.type === 'home'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setNewAddress({ ...newAddress, type: 'home' })}
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors
                  ${newAddress.type === 'office'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setNewAddress({ ...newAddress, type: 'office' })}
              >
                <Building2 className="w-4 h-4" />
                Office
              </button>
            </div>
  
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newAddress.fullName}
                  onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>
  
              <div>
                <label className="block text-sm text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter street address"
                />
              </div>
  
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter state"
                  />
                </div>
              </div>
  
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">PIN Code</label>
                  <input
                    type="text"
                    value={newAddress.pincode}
                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter PIN code"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={newAddress.mobileNumber}
                    onChange={(e) => setNewAddress({ ...newAddress, mobileNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
  
            <div className="flex gap-4 mt-6">
              <button
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md 
                  hover:bg-gray-200 transition-colors"
                onClick={() => setIsAddingNew(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md 
                  hover:bg-blue-700 transition-colors"
                onClick={handleAddNewAddress}
              >
                Save Address
              </button>
              
            </div>
          </div>
        )}
      </div>
      </div>
      </div>
    );
};

export default Address;