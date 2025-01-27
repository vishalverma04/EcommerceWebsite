import React, { useState,useEffect } from 'react';
import { Star, ShoppingCart, BaggageClaim , Check, Truck, Shield, RotateCcw, Info, ChevronDown, Package, Ruler,ExternalLink } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { addToCart } from '../utility/cart';
import toast from 'react-hot-toast';
import ProductReviews from './rating';
import { renderStars } from './RenderStars';
const ProductOverview = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddButton = async () => {
    try {
      addToCart(product);
      toast.success("Product added to cart");

    } catch (error) {
      toast.error("An error occurred. Please try again.");
      
    }
  }
  const handleBuyButton = async () => {
    try {
      addToCart(product);
      window.location.href = '/cart';
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  }


  const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="flex items-start space-x-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex-shrink-0">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );

  const TabButton = ({ id, label, active }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 font-medium text-sm transition-colors relative ${
        active 
          ? 'text-blue-600' 
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {label}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
      )}
    </button>
  );
  const beforediscountprice=Math.round(product.price/(1-product.discountPercentage/100));
  const materials=product.material.split(',');
  return (
    <>
    <div className='container mx-auto py-4 md:px-16'>
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto">
        <div className="bg-white rounded-2xl ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100">
              <div className="aspect-w-1 aspect-h-1 w-full bg-gray-50 rounded-xl overflow-hidden">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-[500px] object-contain transform transition-transform hover:scale-105"
                />
              </div>
              <div className="flex space-x-4 mt-6 p-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 ${
                      currentImageIndex === index 
                        ? 'ring-2 ring-blue-500 rounded-lg ' 
                        : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-20 h-20 object-contain rounded-lg hover:opacity-80 transition-opacity"
                    />
                  </button>
                ))}
              </div>
         
         

            </div>

            {/* Product Details */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col h-full">
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        {product.brand}
                      </span>
                      <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                        {product.availabilityStatus}
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex items-center">
                        <div className="flex mr-2">{renderStars(product.rating)}</div>
                        <span className="text-gray-600">{product.rating}</span>
                      </div>
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-600">{product.reviews.length} reviews</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-3">
                      <span className="text-3xl font-bold text-gray-900">
                      ₹{product.price}
                      </span>
                      {product.discountPercentage > 0 && (
                        <>
                          <span className="text-xl text-gray-500 line-through">
                          ₹{beforediscountprice}
                          </span>
                          <span className="px-2 py-1 bg-green-50 text-green-500 rounded-lg text-sm font-medium">
                            Save {product.discountPercentage}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Purchase Controls */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded-lg bg-gray-50">
                    
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.stock} units available
                      </span>
                    </div>

                    <div className="flex space-x-4 px-8 ">
                      <button className="flex-1 bg-yellow-400 text-white py-3 px-8 rounded-xl hover:bg-yellow-500 transform transition-all active:scale-95 flex items-center justify-center space-x-3"
                       onClick={handleAddButton}
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="font-medium">Add to Cart</span>
                      </button>
                      <button className="flex-1 bg-orange-500 text-white py-3 px-8 rounded-xl hover:bg-orange-600 transform transition-all active:scale-95 flex items-center justify-center space-x-3"
                      onClick={handleBuyButton}
                      >
                        <BaggageClaim  className="h-5 w-5" />
                        <span className="font-medium">Buy Now</span>
                      </button>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 gap-4">
                    <FeatureCard
                      icon={Truck}
                      title="Free Express Shipping"
                      description="Orders over ₹1000 qualify for free shipping"
                    />
                    <FeatureCard
                      icon={Shield}
                      title="Extended Warranty"
                      description={product.warrantyInformation}
                    />
                    <FeatureCard
                      icon={RotateCcw}
                      title="Easy Returns"
                      description={product.returnPolicy}
                    />
                    {product.links.length>0 && <div className="flex items-start space-x-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                     <div className="flex-shrink-0">
                       <ShoppingCart className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                    <h4 className="font-medium text-gray-900">Available At</h4>
                    <div className='flex gap-2'>
                       {product.links.map((link)=>(
                        <a
                      key={link._id}
                     href={link.linkUrl}
                     target="_blank"
                     rel="noopener noreferrer"
                 className="bg-blue-100 px-3 py-1 rounded-xl text-blue-600 hover:bg-blue-500 hover:text-white transition-colors"
              >
                <span>{link.linkName}</span>
              </a>
                       ))}
                       </div>
                    </div>
                     </div>}
                  </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-8 pt-6 border-t">
                  <div className="border-b">
                    <div className="flex space-x-8">
                      <TabButton 
                        id="description" 
                        label="Description" 
                        active={activeTab === 'description'} 
                      />
                      <TabButton 
                        id="specs" 
                        label="Specifications" 
                        active={activeTab === 'specs'} 
                      />
                      <TabButton 
                        id="shipping" 
                        label="Shipping" 
                        active={activeTab === 'shipping'} 
                      />
                    </div>
                  </div>

                  <div className="py-4">
                    {activeTab === 'description' && (
                      <div className="space-y-4">
                        <p className="text-gray-600 leading-relaxed">
                          {product.description}
                        </p>
                        <ul className="space-y-3">
                          {product.bulletPoints.map((point, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeTab === 'specs' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-3">
                            <Package className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Weight</p>
                              <p className="font-medium">{product.weight}kg</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Ruler className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Dimensions</p>
                              <p className="font-medium">{product.dimensions}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Materials</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.material && materials.map((material, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {material}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'shipping' && (
                      <div className="space-y-4">
                        <p className="text-gray-600">{product.shippingInformation}</p>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-700">
                              {product.returnPolicy}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProductReviews reviews={product.reviews} rating={product.rating}/>
    </div>
    </>
  );
};

export default ProductOverview;
