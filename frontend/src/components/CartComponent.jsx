import React, { useState } from 'react';
import { updateCartItemQuantity, removeFromCart } from '../utility/cart';
import { Trash2, Plus, Minus, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CartComponent({item, onCartChange}) {
  const { product, quantity } = item;
    const {
    title,
    price,
    discountPercentage,
    rating,
    brand,
    images,
  } = product;

  const handleQuantityChange = (id, change) => {
    let newQuantity = quantity+change
    newQuantity=newQuantity<1?1:newQuantity
  updateCartItemQuantity(item.productId, newQuantity);
  onCartChange(); // Notify parent component to refresh the cart
  };

const handleRemove = () => {
  removeFromCart(item.productId);
  onCartChange(); // Notify parent component to refresh the cart
};

 const originalPrice=Math.round(price / (1 - discountPercentage / 100))

 const [wishList,setWishList]=useState(false)
 const [color,setcolor]=useState()
 const handleWishList=()=>{
   if(wishList){
    toast.success("remove from wishlist")
    setWishList(false)
    setcolor("")
   }else{
    toast.success("added to wishlist")
    setWishList(true)
    setcolor("fill-red-600")
   }
 }
 const navigate = useNavigate();
 const handleCardClick = () => {
  navigate(`/product/${product.title}`,
  {
    state:{
      product:product
    }
  }
  );
};


  return (
    <>
      <div key={item.id} className="flex gap-4 pb-6 border-b">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={images} 
                          alt={title}
                          className="w-full h-full object-contain items-center"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-lg">{title}</h3>
                            {/* <p className="text-sm text-gray-500">Seller: {item.seller}</p> */}
                            <p className="text-sm text-gray-500">Brand: <span className='text-black'>{brand}</span></p>
                            <p className="text-sm text-gray-500">Rating: <span className='text-black'>⭐{rating || 4.8}</span> </p>
                            {/* <p className="text-sm text-gray-500">Discount:<span className='text-black'> {discountPercentage}%</span> </p> */}
                            <p className={`text-sm mt-2 ${1==1 ? 'text-green-600' : 'text-red-600'}`}>
                         in stock
                      </p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              className="text-gray-400 hover:text-gray-600"
                              onClick={handleRemove}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                            <button className="text-red-600 hover:text-red-500"
                            onClick={handleWishList}
                            >
                              {/* <Heart className={`h-5 w-5 ${color}`} /> */}
                            </button>
                          </div>
                        </div>

                        {/* Price and Quantity */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-md">
                              <button 
                                className="px-3 py-1 hover:bg-gray-50"
                                onClick={() => handleQuantityChange(item.id, -1)}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-1 border-x">{quantity}</span>
                              <button 
                                className="px-3 py-1 hover:bg-gray-50"
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                              
                            </div>
                            <span className="text-lg font-semibold">
                              Price: ₹{price}
                              </span>
                              <span className="text-sm text-gray-500 line-through ">
                              ₹{originalPrice}
                              </span>
                          </div>
                          
                          <div className="text-right">
                          
                            <div className="flex items-center gap-2">
                            
                              <span className="text-lg font-semibold">
                              Total: ₹{(price * quantity)}
                              </span>
                              <span className="text-sm text-gray-500 line-through ">
                              ₹{originalPrice * quantity}
                              </span>
                              
                            </div>
                            <p className="text-sm text-green-600">{item.deliveryDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
    </>
  )
}

export default CartComponent
