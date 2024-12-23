import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <h2 className="text-xl font-bold">HG ENTERPRISES INDIA</h2>
            <p className="text-gray-400 mt-4">
              Your one-stop shop for all your electronics needs. Experience the
              best quality products and services.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-yellow-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-500">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-yellow-500">
                  Services
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-yellow-500">
                  Products
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">
              Email: hgenterprisesindia@outlook.com
            </p>
            <p className="text-gray-400">Phone: +91-9728598505, +91-7303899440</p>
            <p className="text-gray-400">Address: HG Enterprises India,
            <br></br>
                 Konsiwas road,Vijay Nagar, Rewari
                 <br></br>
Haryana,123401 ,India
</p>
            
          </div>

          {/* Newsletter Subscription */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Stay updated with our latest offers and products.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg text-black"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-600"
              >
                Subscribe
              </button>
            </form>
          </div> */}
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} HG Enterprises India. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* <a
              href="#"
              className="hover:text-yellow-500"
              aria-label="Facebook"
            >
              Facebook
            </a> */}
            {/* <a href="#" className="hover:text-yellow-500" aria-label="Twitter">
              Twitter
            </a> */}
            <a
              href="https://www.instagram.com/hgenterprisesindia?igsh=M3RxdmQxbWp4Ymth"
              className="hover:text-yellow-500"
              aria-label="Instagram"
              target="_main"
            >
              Instagram
            </a>
            <a
              href="https://maps.app.goo.gl/iNuZPLxdhxtGvWPo9"
              className="hover:text-yellow-500"
              aria-label="Map"
              target="_main"
            >
              Map
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
