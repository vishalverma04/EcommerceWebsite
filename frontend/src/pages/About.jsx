import React from "react";
import image from "../assets/image.png"

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className=" text-black py-4">
        <h1 className="text-3xl font-bold text-center">About Us</h1>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome to HG ENTERPRISES INDIA!
          </h2>
          <p className="text-gray-600 leading-7 mb-6">
            At <strong>HG ENTERPRISES INDIA</strong>, we are your one-stop destination for high-quality
            electronic goods. Located in the heart of Rewari, Haryana, we take pride in offering
            a wide range of products to make your life more convenient and enjoyable. From advanced
            refrigerators to versatile microwave ovens, we provide reliable electronics to suit every need.
          </p>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h3>
          <ul className="list-disc list-inside text-gray-600 leading-7">
            <li>
              <strong>Wide Selection:</strong> Explore a variety of top-notch electronic appliances for your home and kitchen.
            </li>
            <li>
              <strong>Trusted Brands:</strong> We stock only the best and most trusted brands, ensuring durability and performance.
            </li>
            <li>
              <strong>Customer Satisfaction:</strong> Your satisfaction is our priority, and we are committed to delivering excellent service.
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Contact Details */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Details</h3>
            <p className="text-gray-600 mb-2">
              <strong>Shop Name:</strong> HG ENTERPRISES INDIA
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Mobile No.:</strong>{" "}
              <span  className="text-blue-600 hover:underline">9728598505</span>,{" "}
              <span  className="text-blue-600 hover:underline">7303899440</span>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> <a href="mailto:info@hgenterprisesindia.com" className="text-blue-600 hover:underline">info@hgenterprisesindia.com</a>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Instagram:</strong>{" "}
              <a
                href="https://www.instagram.com/hgenterprisesindia?igsh=M3RxdmQxbWp4Ymth"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                @hgenterprisesindia
              </a>
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> HG ENTERPRISES INDIA, konsiwas road, vijay nagar, rewari, haryana 123401
            </p>
          </div>

          {/* Map */}
          <div className="bg-white shadow-lg rounded-lg p-8"
          
          >
          
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Visit Us</h3>
            <img
              src={image}
              width="100%"
              height="250"
              allowFullScreen
              loading="lazy"
              className="rounded-lg border-2 border-gray-300"
              title="HG ENTERPRISES Location"
              onClick={() => window.open("https://maps.app.goo.gl/iNuZPLxdhxtGvWPo9", "_blank")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
//<a href="https://maps.app.goo.gl/iNuZPLxdhxtGvWPo9"></a>