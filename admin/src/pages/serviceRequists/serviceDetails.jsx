import React, { useState } from 'react';
import { 
  Package, 
  User, 
  Phone, 
  MapPin, 
  FileText, 
  Calendar,
  AlertCircle,
  Tag,
  FileCheck
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { SERVICE_STATUS } from '../../constant';
import axios from 'axios';
import toast from 'react-hot-toast';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ServiceDetailsPage = () => {

    const location =useLocation();
    const serviceRequest=location.state.serviceRequest ||{};
  const {
    serviceType,
    orderId,
    productName,
    name,
    mobileNumber,
    address,
    problem,
    serialNumber,
    orderedDate,
    invoice,
    createdAt
  } = serviceRequest;

  const [status,setStaus]=useState(serviceRequest.status)

  const isWarranty = serviceType === 'warranty';

  

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const StatusBadge = ({ status }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'Pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'In Progress':
          return 'bg-blue-100 text-blue-800';
        case 'Resolved':
          return 'bg-green-100 text-green-800';
        case 'Closed':
          return 'bg-gray-100 text-gray-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
        {status}
      </span>
    );
  };

  const handleStatusChange =async (serviceId, newStatus) => {
    const response=await axios.put(`${SERVER_URL}/api/v1/admin/services/${serviceId}/status`, { status: newStatus });
    if(response.status===200){
      toast.success("services status updated successfully");
      setStaus(newStatus)
    }else{
      toast.error("Error updating service status");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Service Request Details</h1>
            <StatusBadge status={status} />
            <select
              value={status}
              onChange={(e) => handleStatusChange(serviceRequest._id, e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              {SERVICE_STATUS.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={16} />
            <span className="text-sm">Request Date: {formatDate(createdAt)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Service Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="font-medium ">Service Type</p>
                <p className="">{serviceType}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="font-medium ">Product Name</p>
                <p className="">{productName}</p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="font-medium ">Customer Name</p>
                <p className="">{name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="font-medium ">Mobile Number</p>
                <p className="">{mobileNumber}</p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium ">Address</p>
              <p className="">
                {address.flatNo}, {address.street}
                {address.landmark && `, ${address.landmark}`}
                <br />
                {address.city}, {address.state} - {address.pincode}
              </p>
            </div>
          </div>

          {/* Problem Description */}
          

          {/* Warranty-specific fields */}
          {isWarranty && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium ">Order ID</p>
                    <p className="">{orderId}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium ">Serial Number</p>
                    <p className="">{serialNumber}</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium ">Order Date</p>
                    <p className="">{formatDate(orderedDate)}</p>
                  </div>
                </div>

                {invoice && (
                  <div className="flex items-start gap-3">
                    <FileCheck className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium ">Invoice</p>
                      <a 
                        href={invoice}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                      >
                        Download Invoice
                        <FileText className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium ">Problem Description</p>
              <p className="">{problem}</p>
            </div>
          </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;