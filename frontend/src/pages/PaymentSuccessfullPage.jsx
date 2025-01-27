import React from 'react';
import { CheckCircle, CreditCard, Calendar, Copy, ExternalLink } from 'lucide-react';

const RazorpaySuccess = ({ paymentResponse }) => {
  // Sample Razorpay response data structure
  const samplePaymentResponse = {
    razorpay_payment_id: "pay_LKz6hrP4X6jz7Y",
    razorpay_order_id: "order_LKz6VmvXwRBcmd",
    razorpay_signature: "d34997b085f11c7f38f0718887a6b1f3d3095a7f",
    amount: 24999, // Amount in paise (Indian currency)
    currency: "INR",
    status: "captured",
    method: "card",
    card: {
      last4: "4242",
      network: "Visa"
    },
    email: "customer@example.com",
    contact: "+919876543210",
    created_at: new Date().toISOString()
  };

  // Use provided payment response or sample data
  const payment = paymentResponse || samplePaymentResponse;

  const formatAmount = (amount, currency) => {
    const value = amount / 100; // Convert paise to rupees
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(value);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* Success Header */}
      <div className="flex flex-col items-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">Transaction completed securely via Razorpay</p>
      </div>

      {/* Amount Section */}
      <div className="bg-green-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Amount Paid</span>
          <span className="text-xl font-bold text-gray-800">
            {formatAmount(payment.amount, payment.currency)}
          </span>
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-4">
        {/* Payment ID */}
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Razorpay Payment ID</p>
            <p className="font-medium text-gray-800">{payment.razorpay_payment_id}</p>
          </div>
          <button 
            onClick={() => copyToClipboard(payment.razorpay_payment_id)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <Copy className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Card Details */}
        <div className="flex items-center">
          <CreditCard className="w-5 h-5 text-gray-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Payment Method</p>
            <p className="font-medium text-gray-800">
              {payment.card.network} card ending in {payment.card.last4}
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-gray-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Transaction Date</p>
            <p className="font-medium text-gray-800">{formatDate(payment.created_at)}</p>
          </div>
        </div>

        {/* Order ID */}
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-medium text-gray-800">{payment.razorpay_order_id}</p>
          </div>
          <button 
            onClick={() => copyToClipboard(payment.razorpay_order_id)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <Copy className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3">
        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Download Receipt
        </button>
        
        <a 
          href={`https://dashboard.razorpay.com/app/payments/${payment.razorpay_payment_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
        >
          View on Razorpay Dashboard
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>

      {/* Contact Information */}
      <div className="mt-6 border-t pt-6">
        <div className="text-sm text-gray-600">
          <p>Email: {payment.email}</p>
          <p>Phone: {payment.contact}</p>
        </div>
      </div>

      {/* Support Section */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          Having trouble? <a href="#" className="text-blue-600 hover:text-blue-700">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default RazorpaySuccess;