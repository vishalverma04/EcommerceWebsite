import React, { useState } from 'react';
import { Phone, Mail, MapPin, Instagram, MessageCircle, Send,Building2 } from 'lucide-react';
import image from '../assets/image.png';
import toast from 'react-hot-toast'
import axios from 'axios'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const response=await axios.post('/api/v1/users/emailfromuser',formData)
      if(response.status===201){
        toast.success('Email sent successfully')
        formData.email=''
        formData.message=''
        formData.name=''
        formData.subject=''
      }
    }catch(error){
      toast.error('Email not sent try again')
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
    <header className="bg-white shadow-lg relative overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"></div>
        <div className="max-w-7xl mx-auto py-16 px-4 relative">
          <div className="flex items-center space-x-4 mb-4">
            <Building2 className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white">HG Enterprises India</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Your Trusted Business Partner - Building Relationships Through Excellence
          </p>
        </div>
      </header>
      <div className="w-full px-24 mx-auto">
        {/* Header */}
        

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600">
            Have questions or need assistance? Contact us using the information below.
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Phone */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Phone className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Phone</h2>
            </div>
            <a href="tel:9728598505" className="text-gray-600 hover:text-blue-600 block">
              +91 972 859 8505
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <MessageCircle className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">WhatsApp</h2>
            </div>
            <a href="https://wa.me/917303899440" className="text-gray-600 hover:text-green-600 block">
              +91 730 389 9440
            </a>
          </div>

          {/* Email */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-red-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Email</h2>
            </div>
            <a 
              href="mailto:hgenterprisesindia@outlook.com" 
              className="text-gray-600 hover:text-red-600 block break-words"
            >
              hgenterprisesindia@outlook.com
            </a>
          </div>

          {/* Instagram */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Instagram className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Instagram</h2>
            </div>
            <a 
              href="https://instagram.com/hgenterprisesindia" 
              className="text-gray-600 hover:text-purple-600 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              @hgenterprisesindia
            </a>
          </div>

          {/* Map */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow md:col-span-2">
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-gray-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Location</h2>
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src={image}
                alt="Map location"
                className="w-full h-48 object-cover rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                loading='lazy'
                onClick={() => window.open("https://maps.app.goo.gl/iNuZPLxdhxtGvWPo9", "_blank")}
              />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                required
              ></textarea>
            </div>
            {loading==false ?<button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>:
            <button
              type="submit"
              className='w-full md:w-auto px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-not-allowed'
              disabled
            >
            Sending...
            </button>
            }
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;