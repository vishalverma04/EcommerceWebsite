import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Calendar, CreditCard, User } from 'lucide-react';
import axios from 'axios';

const PaymentSuccess = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reference = searchParams.get('reference');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await axios.get(`/api/order/${reference}`);
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    if (reference) {
      fetchOrderDetails();
    }
  }, [reference]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Success Header */}
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-green-600 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details */}
        {orderDetails && (
          <div className="space-y-4">
            <div className="h-px bg-gray-200 my-6" />
            
            {/* Transaction ID */}
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p className="font-medium">{reference}</p>
              </div>
            </div>

            {/* Amount */}
            <div className="flex items-center">
              <ShoppingBag className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Amount Paid</p>
                <p className="font-medium">
                  ₹{orderDetails.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">
                  {new Date(orderDetails.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Customer */}
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium">{orderDetails.userId.fullName}</p>
              </div>
            </div>

            <div className="h-px bg-gray-200 my-6" />

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link 
                to="/orders" 
                className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg font-medium transition-colors"
              >
                View Order Details
              </Link>
              <Link 
                to="/" 
                className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center rounded-lg font-medium transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;