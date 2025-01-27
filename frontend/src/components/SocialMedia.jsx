import React from 'react';
import { Instagram } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-6 h-6 fill-white"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const SocialMediaIcons = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/7303899440', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/hgenterprisesindia?igsh=M3RxdmQxbWp4Ymth', '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
      {/* WhatsApp Icon */}
      <button
        onClick={handleWhatsAppClick}
        className="relative group"
        aria-label="Chat on WhatsApp"
      >
        {/* Background with WhatsApp's original color */}
        <div className="bg-[#25D366] p-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 animate-bounce-slow hover:bg-[#14c154]">
          <WhatsAppIcon />
          {/* Ripple Effect */}
          <span className="absolute inset-0 rounded-full border-4 border-[#25D366] animate-ripple"></span>
        </div>
        
      </button>

      {/* Instagram Icon */}
      <button
        onClick={handleInstagramClick}
        className="relative group"
        aria-label="Follow on Instagram"
      >
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 p-4 rounded-full shadow-lg hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 animate-bounce-slow-delayed">
          <Instagram className="w-6 h-6 text-white" />
          {/* Ripple Effect */}
          <span className="absolute inset-0 rounded-full border-4 border-pink-500 animate-ripple-delayed"></span>
        </div>
       
      </button>

      <style jsx global>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-ripple {
          animation: ripple 1.5s infinite;
        }

        .animate-ripple-delayed {
          animation: ripple 1.5s infinite;
          animation-delay: 0.5s;
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }

        .animate-bounce-slow-delayed {
          animation: bounce-slow 2s infinite;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default SocialMediaIcons;