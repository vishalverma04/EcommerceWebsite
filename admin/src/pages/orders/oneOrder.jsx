import React from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  Tag,
  MapPin,
  Phone,
  User,
  Receipt,
  CreditCard,
  FileText, 
  Calendar
} from 'lucide-react';

import { ORDER_STATUS } from '../../constant';
import { REFUND_STATUS } from '../../constant';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const OrderTrackingPage = () => {
    const location = useLocation();
    const [order, setOrder] = useState(location.state.order || {});

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const getDate = (date) => {
    // DD-MM-YYYY
    const dateObj = new Date(date);
    const dateformat =dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear(); 
    return dateformat;
  }
  const handleStatusChange =async (orderId, newStatus) => {
    const response=await axios.put(`${SERVER_URL}/api/v1/admin/orders/${orderId}/status`, { status: newStatus });
    if(response.status===200){
      toast.success("Order status updated successfully");
     order.status = newStatus;
     const newOrder = {...order, status: newStatus};
     if(newStatus==='delivered'){
        newOrder.deliveredAt=Date.now();
        }
     setOrder(newOrder);
    }else{
      toast.error("Error updating order status");
    }
  };

  const handleRefundStatusChange =async (orderId, newStatus) => {
    const response=await axios.put(`${SERVER_URL}/api/v1/admin/orders/${orderId}/refundStatus`, { refundStatus: newStatus });
    if(response.status===200){
      toast.success("Refund status updated successfully");
      order.cancellationDetails.refundStatus = newStatus;
      const newOrder = {...order, cancellationDetails: {refundStatus: newStatus}};
      setOrder(newOrder);
    }else{
      toast.error("Error updating refund status");
    }
  };
  

  const handleDateChange =async (orderId, newDate) => {
    if(newDate === '') return;
    const currentDate = new Date(); 
    const date = new Date(newDate);
    if(date < currentDate) return toast.error("Please select a valid date"); ;
    const response=await axios.put(`/api/v1/admin/orders/${orderId}/estDeliveryDate`, { estimatedDeliveryDate: date });
    if(response.status===200){
      toast.success("Delivery date updated successfully");
     order.estimatedDeliveryDate = newDate;
     const newOrder = {...order, estimatedDeliveryDate: newDate};
     setOrder(newOrder);
    }else{
      toast.error("Error updating delivery date");
    }
  };
  const getOriginalPrice=(product)=>{
    return Math.round(product.price/(1-product.discountPercentage/100));
}

  return (
    <div className="max-w-6xl p-4 px-16 ">
      <h1 className="text-2xl font-bold mb-6">Order ID: <span className='text-green-500'>{order._id}</span></h1>
      
      <div className="space-y-4">
          <div key={order._id} 
               className="border rounded-lg shadow-sm bg-white overflow-hidden">
            <div className="p-4 cursor-pointer hover:bg-gray-50">
              <div className="flex items-center justify-between">
               
                <div className="flex items-center space-x-4">
                  {getStatusIcon(order.status)}
                  <div>
                    {/* <p className="font-medium ">Order Id: <span className='text-green-500'>{order._id}</span></p> */}
                    <p className="text-sm text-gray-500">
                      Order Date {getDate(order.createdAt)}
                    </p>
                    <p>
                    {(order.status ==='shipped' || order.status ==='confirmed') &&(
                        <p className="text-sm text-gray-500">Delivery Date: {getDate(order.estimatedDeliveryDate)}</p>
                    ) }

                    </p>
                    {order.status === 'processing' && (<span className="text-yellow-500">Processing</span>)}
                    {order.status === 'confirmed' && (<span className="text-blue-500">Confirmed</span>)}
                    {order.status === 'cancelled' && (<span className="text-red-500">Cancelled</span>)}
                    {order.status === 'shipped' && (<span className="text-purple-500">Shipped</span>)}
                    {order.status === 'delivered' && (
                        <>
                        <span className="text-green-500 ">Delivered On </span>
                        <span className="text-sm text-gray-500">
                           {getDate(order.deliveredAt)}     
                        </span>
                        </>
                    )}
                    <p>
                    {order.status === 'cancelled' && (
                        <>
                       {order.cancellationDetails.refundStatus==='pending' && (
                        <span className="text-red-500">Refund Pending</span>)
                        }
                        {order.cancellationDetails.refundStatus==='rejected' && (
                        <span className="text-red-500">Refund Rejected</span>)
                        }
                        {order.cancellationDetails.refundStatus==='refunded' && (
                        <span className="text-green-500">Refunded</span>)
                        }
                        </>
                    )}
                    </p>
                  </div>
                </div>
                 
                {(order.status ==='shipped' || order.status==='confirmed' ) && <div className='flex flex-col items-center space-x-4'>
                <span className='text-sm text-gray-500'>Update Delivery Date</span>
                    <div className="px-6 py-4 text-sm ">
                        <input
                        type="date"
                        value={order.estimatedDeliveryDate}
                        onChange={(e) => handleDateChange(order._id, e.target.value)}
                        className="border px-4 py-1 text-sm rounded-xl bg-gray-200"
                    />
                </div>
                </div>}

                <div className='flex flex-col items-center space-x-4'>
                <span className='text-sm text-gray-500'>Update Status</span>
                    <div className="px-6 py-4 text-sm">
                        <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="border px-4 py-1 text-sm rounded-xl bg-gray-200"
                    >
                        {ORDER_STATUS.map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                </div>
                </div>

                {/* update refund status */}
                {order.status === 'cancelled' && (
                    <div className='flex flex-col items-center space-x-4'>
                    <span className='text-sm text-gray-500'>Update Refund Status</span>
                    <div className="px-6 py-4 text-sm">
                        <select
                        value={order.cancellationDetails.refundStatus}
                        onChange={(e) => handleRefundStatusChange(order._id, e.target.value)}
                        className="border px-4 py-1 text-sm rounded-xl bg-gray-200"
                    >
                        {REFUND_STATUS.map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                </div>
                </div>
                )}

                <div className="flex items-center space-x-4">
                  <span className="font-medium text-red-500">₹{order.total}</span>
                  
                </div>
              </div>
            </div>
            
              <>
              <div className="border-t p-4">
                <div className="space-y-6">

                  {/* Payment Details Section */}
                  <div className={` p-4 rounded-lg ${order.payment.paymentStatus==='pending' ? `bg-red-100`: `bg-green-100`} `}>
                    <h3 className="font-medium mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                       Payment Details
                    </h3>
                   <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">

                        {order.payment.paymentStatus==='pending' ? (

            <div className="flex items-center space-x-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="capitalize text-red-500">Payment Pending</span>
            </div>
            ):(
              <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="capitalize text-green-500">Payment Successful</span>
              </div>
            )
              }
              <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className='text-gray-600' >Payment ID: {order.payment._id} </span>
            </div>      
                      
            
          </div>
          {order.payment.paymentStatus==='completed' && <div className="space-y-2">
            
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
               <span className=''>Payment Date: {order.payment.paymentDate && getDate(order.payment.paymentDate)}
              </span>
            </div>
          </div>}
        </div>
      </div>

                  {/* Delivery Address Section */}
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Delivery Address
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{order.shippingAddress.fullName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{order.shippingAddress.mobileNumber}</span>
                        </div>
                        
                      </div>
                      <div className="space-y-1 text-gray-600">
                        <p>{order.shippingAddress.street}</p>
                        <p>{order.shippingAddress.city} , {order.shippingAddress.state} , {order.shippingAddress.pincode}</p>
                        <p>{order.shippingAddress.country}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Section */}
                  <div>
                    <h3 className="font-medium mb-4">Order Items</h3>
                    <div className="space-y-4">
                    {order.items.map((item) => (
                        <div key={item.productId._id} className="flex space-x-4 bg-gray-50 p-4 rounded-lg">
                          <img
                            src={item.productId.images[0]}
                            alt={item.productId.title}
                            className="w-20 h-20 object-contain rounded-md"
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{item.productId.title}</h4>
                                <p className="text-sm text-gray-600">{item.productId.brand}</p>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">₹{(item.productId.price * item.quantity)}</div>
                                {item.productId.discountPercentage > 0 && (
                                  <div className="text-sm text-gray-500 line-through">
                                  ₹{(getOriginalPrice(item.productId) * item.quantity)}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Tag className="w-4 h-4" />
                              <span>{item.productId.category}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <RatingStars rating={item.productId.rating} />
                                <span className="text-sm text-gray-600">({item.productId.rating})</span>
                              </div>
                              {item.discount > 0 && (
                                <div className="flex items-center space-x-1 text-green-600">
                                  <p className="w-4 h-4" />
                                  <span className="text-sm font-medium">{item.discount}% OFF</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="text-sm text-gray-600">
                              Quantity: {item.quantity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary Section */}
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Order Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>₹{order.subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping Charge</span>
                        <span className=''>₹{order.shipping}</span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t">
                        <span>Total</span>
                        <span className='text-red-500'>₹{order.total}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Status Section */}
                  <div>
                    <h3 className="font-medium mb-2">Order Status</h3>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      {order.status === 'processing' && (<span className="text-yellow-500">Processing</span>)}
                      {order.status === 'confirmed' && (<span className="text-blue-500">Confirmed</span>)}
                      {order.status === 'shipped' && (<span className="text-blue-500">Shipped</span>)}
                      {order.status === 'delivered' && (<span className="text-green-500">Delivered</span>)}
                    </div>
                  </div>
                  
                </div>
              </div>
              </>
            
          </div>
         
      </div>
    </div>
  );
};

export default OrderTrackingPage;