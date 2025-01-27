import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Package,
  Settings,
  Clock
} from 'lucide-react';

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CustomerDetails = () => {
  // Format date to readable string

  const location = useLocation();
  const customer = location.state.customer || {};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const navigate=useNavigate()
  const handleOrderClick=(order)=>{
    navigate(`/order/${order._id}`, { state: { order } });
  }

  const handleServiceClick=(service)=>{
      // console.log(service)
     navigate(`/service/${service._id}`, {state:{serviceRequest :service}})
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Customer Header */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Customer Details</h1>
          <span className="text-sm text-gray-500">ID: {customer._id}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <User className="text-blue-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{customer.fullName}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Mail className="text-blue-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{customer.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone className="text-blue-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Mobile Number</p>
              <p className="font-medium">{customer.mobileNumber}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="text-blue-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Joined On</p>
              <p className="font-medium">{formatDate(customer.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Addresses Section */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <div className="flex items-center mb-4">
          <MapPin className="text-blue-500 mr-2" size={20} />
          <h2 className="text-xl font-semibold">Addresses</h2>
        </div>
        
        {customer.address.length === 0 ? (
          <p className="text-gray-500">No addresses added yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customer.address.map((address, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{address.type || 'Address'} {index + 1}</span>
                  {address.isDefault && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Default</span>
                  )}
                </div>
                <p className="text-gray-600">{address.street}</p>
                <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                <p className="text-gray-600">{address.country}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Service Requests Section */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <div className="flex items-center mb-4">
          <Settings className="text-blue-500 mr-2" size={20} />
          <h2 className="text-xl font-semibold">Service Requests</h2>
        </div>
        
        {customer.serviceRequests.length === 0 ? (
          <p className="text-gray-500">No service requests yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customer.serviceRequests.map((request) => (
                  <tr key={request._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 cursor-pointer"
                    onClick={()=>handleServiceClick(request)}
                    >{request._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.serviceType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(request.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Package className="text-blue-500 mr-2" size={20} />
          <h2 className="text-xl font-semibold">Orders</h2>
        </div>
        
        {customer.orders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customer.orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 cursor-pointer"
                      onClick={()=>handleOrderClick(order)}
                    >{order._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;