import React from 'react';
import { User, ShoppingBag, Heart, MapPin, CreditCard, Bell, LogOut,HandPlatter  } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import OrderHistory from './OrderHistory';
import ServiceRequests from './ServiceRequests';
import { useState } from 'react';
import Address from './Address';

const ProfilePage = () => {

  const [page,setPage]=useState('Orders')

  const menuItems = [
    { icon: ShoppingBag, label: 'Orders',  },
    { icon: HandPlatter, label: 'Service and Warranty', },
    // { icon: Heart, label: 'Wishlist',},
    { icon: MapPin, label: 'Addresses',  },
    // { icon: CreditCard, label: 'Payments',},
    // { icon: Bell, label: 'Notifications', }
  ];

  
  
  const {loggedInUser,logout}=useAuth()
  const handleLogout=()=>{
    logout()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-4">
      <div className="max-w-8xl mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-2">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-blue-600 " />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{loggedInUser.fullName}</h2>
                    <p className="text-sm text-gray-500">{loggedInUser.email}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500">{loggedInUser.mobileNumber}</p>
                  <p className="text-sm text-gray-500">Member since {loggedInUser.joinDate}</p>
                  
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-lg shadow-sm">
              <nav className="p-4">
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={()=>setPage(item.label)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-700">{item.label}</span>
                      </div>
                      {/* {item.count > 0 && (
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                          {item.count}
                        </span>
                      )} */}
                    </button>
                  ))}
                  <button
                    className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-red-500 transition-colors text-red-600 hover:text-white"
                  onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          {page==='Orders' && <OrderHistory />}
          {page==='Service and Warranty' && <ServiceRequests />}
          {page==='Addresses' && <Address/>}

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;