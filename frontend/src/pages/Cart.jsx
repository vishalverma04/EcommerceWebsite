import React, { useState } from "react";

const CartPage = () => {
  // Example cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1049,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 2999,
      quantity: 2,
      image: "https://via.placeholder.com/100",
    },
  ]);

  // Handle quantity change
  const handleQuantityChange = (id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: action === "increment" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  // Handle item removal
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {/* Cart Items */}
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 shadow rounded mb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-600">Price: ₹{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                        onClick={() => handleQuantityChange(item.id, "decrement")}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-center">{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                        onClick={() => handleQuantityChange(item.id, "increment")}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-white p-4 shadow rounded">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>₹50</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{totalPrice + 50}</span>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Your cart is empty. Add some products!</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
