import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-6 md:p-10 bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            Have questions or need assistance? Contact us using the information
            below.
          </p>
          <div className="space-y-4">
          <p className="text-gray-600 mt-2">📞 9728598505, 7303899440</p>
          <p className="text-gray-600 mt-2">📧 Email: hgenterprisesindia@outlook.com</p>
            {/* <p>
              <span className="font-semibold text-gray-700">Address:</span>
                    HG Enterprises India,
              <br></br>
                    Konsiwas road,Vijay Nagar, Rewari
              <br></br>
                     123401, Haryana, India
            </p> */}
            <p className="text-gray-600 mt-2">
              📸 Instagram:{" "}
              <a
                href="https://www.instagram.com/hgenterprisesindia?igsh=M3RxdmQxbWp4Ymth"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @hgenterprisesindia
              </a>
            </p>
            <p className="text-gray-600 mt-2">
              📍 Map:{" "}
              <a
                href="https://maps.app.goo.gl/iNuZPLxdhxtGvWPo9"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Send Us a Message
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Write your message here"
                rows="4"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
