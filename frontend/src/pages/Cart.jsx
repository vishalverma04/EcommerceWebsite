import React, { useEffect, useState } from 'react';
import { getCart, calculateCartTotal ,calculateCartOriginalTotal} from '../utility/cart';
import CartItemComponent from '../components/CartComponent';
import EmptyCart from './EmptyCart';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [originalPricetotalPrice, setOriginalTotalPrice] = useState(0);
  const navigate=useNavigate()

  const refreshCart = () => {
    const updatedCart = getCart();
    setCart(updatedCart);
    setTotalPrice(calculateCartTotal());
    setOriginalTotalPrice(calculateCartOriginalTotal());
  };

  useEffect(() => {
    refreshCart();
  }, []);

  

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((savings, item) => 
      savings + ((item.originalPrice - item.price) * item.quantity), 0);
  };

  const handleCheckout=(amount)=>{
  navigate('/checkout',{state:{amount,cart}})
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container rounded-lg mx-auto py-8 px-4">
        {/* <h1 className="text-2xl font-bold mb-6">Your Cart</h1> */}
        <h2 className="text-xl font-semibold mb-4">Shopping Cart ({cart.length} items)</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Cart Items */}
          <div className="flex-1 bg-white p-4 shadow rounded">
         
            <div className="space-y-4">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <CartItemComponent
                    key={item.productId}
                    item={item}
                    onCartChange={refreshCart}
                  />
                ))
              ) : (
                <EmptyCart />
              )}
            </div>
          </div>

          {/* Right Section - Summary */}
          {cart.length > 0 && (
          <div className="lg:col-span-4 w-[30%]">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Price Details</h3>
              <div className="space-y-3 pb-4 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price ({cart.length} items)</span>
                  <span>₹{originalPricetotalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">-₹{originalPricetotalPrice-totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className="text-green-600">FREE</span>
                </div>
              </div>
              <div className="flex justify-between pt-4 font-semibold">
                <span>Total Amount</span>
                <span>₹{totalPrice}</span>
              </div>
              <p className="text-green-600 text-sm mt-2">
                {/* You'll save ${calculateSavings().toFixed(2)} on this order */}
              </p>
              <button className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors" 
              onClick={()=>handleCheckout(totalPrice)}
              >
                Place Order
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

