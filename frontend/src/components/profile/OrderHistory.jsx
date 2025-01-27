import React, { useState,useEffect } from 'react';
import { getAllOrders } from '../../utility/orders';
import { renderStars } from '../RenderStars';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  ChevronDown,
  ChevronUp,
  Tag,
  MapPin,
  Phone,
  User,
  CreditCard,
  FileText,
  Calendar,
  X
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import ReviewSubmission from './ProductRating';
import OrderCancel from './OrderCancel';
import Loader from '../../pages/Loader';

const OrderTrackingPage = () => {
  // Enhanced sample order data with address details
  const userId=localStorage.getItem('userId')
  // const [orders, setOrders] = useState([
  //   {
  //     id: '1',
  //     date: '2025-01-10',
  //     total: 129.99,
  //     status: 'processing',
  //     shippingAddress: {
  //       fullName: 'John Doe',
  //       addressLine1: '123 Main Street',
  //       addressLine2: 'Apt 4B',
  //       city: 'New York',
  //       state: 'NY',
  //       zipCode: '10001',
  //       country: 'United States',
  //       phone: '+1 (555) 123-4567',
  //       email: 'john.doe@example.com'
  //     },
  //     items: [
  //       {
  //         id: 1,
  //         name: 'Wireless Headphones',
  //         brand: 'SoundMax',
  //         category: 'Electronics',
  //         price: 79.99,
  //         originalPrice: 99.99,
  //         quantity: 1,
  //         image: '/api/placeholder/80/80',
  //         rating: 4.5,
  //         discount: 20,
  //       },
  //       {
  //         id: 2,
  //         name: 'Premium Phone Case',
  //         brand: 'TechGear',
  //         category: 'Accessories',
  //         price: 25.00,
  //         originalPrice: 25.00,
  //         quantity: 2,
  //         image: '/api/placeholder/80/80',
  //         rating: 4.0,
  //         discount: 0,
  //       }
  //     ],
  //     shipping: 5.99,
  //     tax: 10.99
  //   }]);

  const [orders, setOrders] = useState([])

  console.log(orders)
 
  const [expandedOrders, setExpandedOrders] = useState({});

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

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

  const getDate = (date) => {
    // DD-MM-YYYY
    const dateObj = new Date(date);
    const dateformat =dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear(); 
    return dateformat;
  }

  const [ratingWindow,setRatingWindow]=useState(false)
  const [ratingProduct,setRatingProduct]=useState()
  const handleReview=(productId)=>{
    setRatingWindow(true)
    setRatingProduct(productId)
    // window.scroll(0,0);
  }
  const [cancelOrderWindow,setCancelOrderWindow]=useState(false)
  const [cancelOrderId,setCancelOrderId]=useState()
  const handleCancelOrder = (orderId) => {
    setCancelOrderWindow(true)
    setCancelOrderId(orderId)
  };

  const getOriginalPrice=(product)=>{
      return Math.round(product.price/(1-product.discountPercentage/100));
  }


     const [loading,setLoading] = useState(false);
      const [reason,setReason]=useState()

    const handleSubmit =async (e) => {
      e.preventDefault();
      setLoading(true);
      
       try{
           await axios.post(`/api/v1/users/${cancelOrderId}/cancelorder`, 
              {
              reason,
              cancelledBy:'customer'
              }
          );
          toast.success('Order cancelled Successfully');

          orders.map((order)=>(
            order._id===cancelOrderId && (order.status='cancelled')
          ))
          setReason('')
  
          setCancelOrderWindow(false);

          setExpandedOrders({})

          window.scroll(0,0);
      
       }catch(error){
          console.log(error)
          toast.error(error.message || 'Something went wrong')
       }finally{
          setLoading(false);
       }
    };
    
  useEffect(()=>{
    const fetchOrders=async()=>{
      const order=await getAllOrders(userId)
      setOrders(order)  
    }
    fetchOrders()
    },[])

    if(loading){
      return <Loader/>
    }

  return (
    <div className="md:col-span-5 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">

      <h1 className="font-semibold text-lg mb-4">My Orders</h1>
      
      <div className="space-y-4">
        {orders.slice().reverse().map((order) => (
          <div key={order._id} 
               className="border rounded-lg shadow-sm bg-white overflow-hidden ">
            <div className="p-4 bg-gray-50 cursor-pointer rounded-lg border hover:border-blue-500"
                 onClick={() => toggleOrderExpand(order._id)}>
              <div className="flex items-center justify-between ">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(order.status)}
                  <div>
                    <p className="font-medium ">Order Id: <span className='text-green-500'>{order._id}</span></p>
                    <p className=" text-gray-500">
                      Placed on {getDate(order.createdAt)}
                    </p>
                    {order.status === 'processing' && (<span className="text-yellow-500">Processing</span>)}
                    {(order.status === 'confirmed' || order.status==='shipped')&& (<p className=" text-gray-500">
                      Delivered on {getDate(order.estimatedDeliveryDate)}
                    </p>)}
                    {order.status === 'shipped' && (<span className="text-blue-500">Shipped</span>)}
                    {order.status === 'confirmed' && (<span className="text-blue-500">Confirmed</span>)}
                    {order.status === 'cancelled' && (<span className="text-red-500">Cancelled</span>)}
                    {order.status === 'delivered' && (<span className="text-green-500">Delivered</span>)}
                    {order.status ==='cancelled' &&
                     order.payment.paymentStatus==='completed' &&
                      order.cancellationDetails.refundStatus==='pending' && 
                      <p className='text-gray-500 text-sm'>Your order has been successfully cancelled. If eligible, your refund will be processed soon. Thank you!
                      </p>
                    }
                    { order.status ==='cancelled' &&
                      order.payment.paymentStatus==='completed' &&
                      order.cancellationDetails.refundStatus==='refunded' && 
                      (
                        <>
                      <p className='text-green-500 '>Your refund has been successfully processed</p>
                      <p className='text-gray-500 text-sm'>Refund ID: {order.cancellationDetails._id}</p>
                      <p className='text-gray-500 text-sm'>Refund On: {getDate(order.cancellationDetails.refundedAt)}</p>
                      </>
                      )
                    }
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-lg text-black">₹{order.total}</span>
                  {expandedOrders[order._id] 
                    ? <ChevronUp className="w-5 h-5 text-gray-500" />
                    : <ChevronDown className="w-5 h-5 text-gray-500" />
                  }
                </div>
              </div>
            </div>
            
            {expandedOrders[order._id] && (
              <>
              <div className="border-t p-4">
                <div className="space-y-6">

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
              <span className="text-sm">Payment ID: {order.payment._id} </span>
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
    

                  {ratingWindow &&(
                    <ReviewSubmission isopen={setRatingWindow} productId={ratingProduct}/>
                  )}
                 

                  {/* Order Items Section */}
                  <div>
                    <h3 className="font-medium mb-4">Order Items</h3>
                    <div className="space-y-4">
                    {order.items.map((item) => (
                      <>
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
                                {item.productId.discountPercentage>0 > 0 && (
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
                                <div className="flex mr-2">{renderStars(item.productId.rating)}</div>
                                <span className="text-sm text-gray-600">({item.productId.rating})</span>
                                {order.status==='delivered' && 
                                <button className='text-white p-1 rounded-lg bg-yellow-400 hover:bg-yellow-500'
                                  onClick={()=>handleReview(item.productId._id)}
                                >Rate Product

                                </button>}
                              </div>
                              {item.productId.discountPercentage > 0 && (
                                <div className="flex items-center space-x-1 text-green-600">
                                  <p className="w-4 h-4" />
                                  <span className="text-sm font-medium">{item.productId.discountPercentage}% OFF</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="text-sm text-gray-600">
                              Quantity: {item.quantity}
                            </div>
                          </div>
                        </div>
                        </>
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
                        <span className='text-black text-lg'>₹{order.total}</span>
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
                      {order.status === 'cancelled' && (<span className="text-red-500">Cancelled</span>)}
                      
                    </div>
                  </div>
                  
                  {/* Cancel Button */}
                  {(order.status === 'processing' || order.status === 'confirmed') && (
                    <div className='w-full flex justify-center item-center'>
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className=" py-2 px-16 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Cancel Order
                    </button>
                    </div>
                  )}
                  {cancelOrderWindow && (
                    <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Write Cancellation Reason</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <X size={24} onClick={()=>setCancelOrderWindow(false)}/>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Review Content */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Cancel Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
              placeholder="write cancellation reason..."
              required
            />
          </div>
          <div className="flex gap-4">
          <button
              type="button"
              className="px-6 py-2 border text-white bg-green-500 rounded-md hover:bg-green-600"
              onClick={()=>setCancelOrderWindow(false)}
            >
              Clear 
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel Order
            </button>
            
          </div>
        </form>
      </div>
    </div>
                    </>
                  )}
                </div>
              </div>
              </>
            )}
          </div>
         
        ))}
         
      </div>
    </div>
  </div>
</div>
  );
};

export default OrderTrackingPage;