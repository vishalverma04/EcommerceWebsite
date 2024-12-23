import React from "react";

const Services = () => {
  const services = [
    {
      title: "Installation Service",
      description:
        "We provide professional installation services for all electronic products purchased from us.",
      icon: "🔧",
    },
    {
      title: "Warranty Support",
      description:
        "Get hassle-free warranty support for your products. We ensure quick resolution of any issues.",
      icon: "📜",
    },
    {
      title: "Repair Service",
      description:
        "Facing issues with your electronics? Our expert technicians offer quick and reliable repair services.",
      icon: "🛠️",
    },
    {
      title: "Customer Support",
      description:
        "Need help? Our dedicated customer support team is available 24/7 to assist you with any queries.",
      icon: "📞",
    },
    {
      title: "Product Exchange",
      description:
        "We offer easy product exchange services if you encounter any manufacturing defects.",
      icon: "🔄",
    },
    {
      title: "Device Recycling",
      description:
        "Environmentally friendly e-waste management and recycling services for your old devices.",
      icon: "♻️",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Our Services
        </h1>
        <p className="text-center text-gray-600 mb-12">
          We offer a wide range of product-related services to ensure the best
          experience for our customers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4 text-blue-500">{service.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
