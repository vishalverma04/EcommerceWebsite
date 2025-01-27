// utils/cart.js
import axios from 'axios'
import toast from 'react-hot-toast'
import {useAuth} from "../contexts/AuthContext"

export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItem = cart.find((item) => item.productId === product._id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId: product._id, quantity, product:{
    title:product.title,
    category:product.category,
    price:product.price,
    discountPercentage:product.discountPercentage,
    rating:product.rating,
    brand:product.brand,
    weight:product.weight,
    dimensions:product.dimensions,
    warrantyInformation:product.warrantyInformation,
    shippingInformation:product.shippingInformation,
    availabilityStatus:product.availabilityStatus,
    returnPolicy:product.returnPolicy,
    images:product.images[0],
    } });
  }

  saveCart(cart);
};

export const removeFromCart = (productId) => {
  const cart = getCart().filter((item) => item.productId !== productId);
  saveCart(cart);
};

export const updateCartItemQuantity = (productId, quantity) => {
  const cart = getCart();
  const item = cart.find((item) => item.productId === productId);

  if (item) {
    item.quantity = quantity;
  }

  saveCart(cart);
};

export const calculateCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

export const calculateCartOriginalTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + Math.round(item.product.price / (1 - item.product.discountPercentage / 100)) * item.quantity, 0);
};

export const checkoutHander=async (amount,isLoggedIn,loggedInUser,address,cart)=>{
  if(!isLoggedIn){
   toast.error("Please Login to place order")
   navigate('/login')
   return;
  }
   try {
     const {data:{key}}=await axios.get("/api/getkey")
     const {data:{order,razorpayOrderId}}=await axios.post("/api/checkout",{
        amount,shippingAddress:address._id,cart,userId:loggedInUser.userId
     })
     
     const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: loggedInUser.fullName,
        description: "Place order of RazorPay",
        image: "https://cdn.razorpay.com/logos/GhRQcyean79PqE_medium.png",
        order_id: razorpayOrderId,
        callback_url: "http://localhost:4000/api/paymentverification",
        prefill: {
            name: loggedInUser.fullName,
            email: loggedInUser.email,
            contact: loggedInUser.mobileNumber
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#4169e1"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
   } catch (error) {
     toast.error(error.message)
   }
 }
