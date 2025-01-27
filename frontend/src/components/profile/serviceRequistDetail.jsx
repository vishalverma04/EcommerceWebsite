// import React from 'react';
// import { useEffect, useState } from 'react';
// import {
//   Clock, 
//   AlertCircle,
//   CheckCircle2,
//   CircleDot,
//   XCircle,
//   MapPin,
//   Calendar,
//   Phone,
//   User,
//   Package,
//   Hash
// } from 'lucide-react';

// import { useLocation } from 'react-router-dom';

// const ServiceRequestDetails = () => {
//   const [request, setRequest] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const location = useLocation();

//   useEffect(() => {
//     const fetchRequest = async () => {
//         setLoading(true);
//         try {
//             const rs=location.state.request|| null;
//             setRequest(rs);
//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//         }
//     };
//     fetchRequest();
// }, []);

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Pending':
//         return <Clock className="w-6 h-6 text-yellow-500" />;
//       case 'In Progress':
//         return <CircleDot className="w-6 h-6 text-blue-500" />;
//       case 'Resolved':
//         return <CheckCircle2 className="w-6 h-6 text-green-500" />;
//       case 'Closed':
//         return <XCircle className="w-6 h-6 text-gray-500" />;
//       default:
//         return <AlertCircle className="w-6 h-6 text-red-500" />;
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!request) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
//         <h2 className="text-2xl font-bold text-gray-900">Request Not Found</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="md:col-span-5 p-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Service Request Details</h1>
//             <div className="flex items-center gap-2">
//               {getStatusIcon(request.status)}
//               <span className="font-medium text-lg">{request.status}</span>
//             </div>
//           </div>

//           {/* Service Info */}
//           <div className="grid md:grid-cols-2 gap-8 mb-8">
//             <div className="space-y-4">
//               <div className="flex items-start gap-3">
//                 <Package className="w-5 h-5 text-gray-400 mt-1" />
//                 <div>
//                   <p className="text-sm text-gray-500">Product Name</p>
//                   <p className="font-medium text-gray-900">{request.productName}</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <AlertCircle className="w-5 h-5 text-gray-400 mt-1" />
//                 <div>
//                   <p className="text-sm text-gray-500">Service Type</p>
//                   <p className="font-medium text-gray-900">{request.serviceType}</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <AlertCircle className="w-5 h-5 text-gray-400 mt-1" />
//                 <div>
//                   <p className="text-sm text-gray-500">Problem Description</p>
//                   <p className="font-medium text-gray-900">{request.problem}</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <Hash className="w-5 h-5 text-gray-400 mt-1" />
//                 <div>
//                   <p className="text-sm text-gray-500">Serial Number</p>
//                   <p className="font-medium text-gray-900">{request.serialNumber}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-start gap-3">
//                 <User className="w-5 h-5 text-gray-400 mt-1" />
//                 <div>
//                   <p className="text-sm text-gray-500">Customer Name</p>
//                   <p className="font-medium text-gray-900">{request.name}</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <Phone className="w-5 h-5 text-gray-400 mt-1" />
//                 <div>
//                   <p className="text-sm text-gray-500">Mobile Number</p>
//                   <p className="font-medium text-gray-900">{request.mobileNumber}</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <Calendar className="w-5 h-5 text-gray-400 mt-1" />
//                 <div>
//                   <p className="text-sm text-gray-500">Request Date</p>
//                   <p className="font-medium text-gray-900">{formatDate(request.createdAt)}</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <Calendar className="w-5 h-5 text-gray-400 mt-1" />
//                 <div>
//                   <p className="text-sm text-gray-500">Order Date</p>
//                   <p className="font-medium text-gray-900">{formatDate(request.orderedDate)}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Address Section */}
//           <div className="border-t pt-6">
//             <div className="flex items-center gap-2 mb-4">
//               <MapPin className="w-5 h-5 text-gray-400" />
//               <h2 className="text-xl font-semibold text-gray-900">Service Address</h2>
//             </div>
//             <div className="bg-gray-50 rounded-xl p-4">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Flat/House No.</p>
//                   <p className="font-medium text-gray-900">{request.address.flatNo}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Street</p>
//                   <p className="font-medium text-gray-900">{request.address.street}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Landmark</p>
//                   <p className="font-medium text-gray-900">{request.address.landmark}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">City</p>
//                   <p className="font-medium text-gray-900">{request.address.city}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">State</p>
//                   <p className="font-medium text-gray-900">{request.address.state}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Pincode</p>
//                   <p className="font-medium text-gray-900">{request.address.pincode}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-4 mt-8">
//             <button
//               onClick={() => window.history.back()}
//               className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
//             >
//               Back to List
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceRequestDetails;


import React from 'react';
import { useEffect, useState } from 'react';
import {
  Clock, 
  AlertCircle,
  CheckCircle2,
  CircleDot,
  XCircle,
  MapPin,
  Calendar,
  Phone,
  User,
  Package,
  Hash,
  ArrowLeft
} from 'lucide-react';

import { useLocation } from 'react-router-dom';

const LoadingSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="flex justify-between">
      <div className="h-8 w-64 bg-gray-200 rounded"></div>
      <div className="h-8 w-32 bg-gray-200 rounded"></div>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
    <div className="space-y-4">
      <div className="h-6 w-32 bg-gray-200 rounded"></div>
      <div className="grid md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-full bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
    <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Request</h2>
    <p className="text-gray-600 mb-6">{message}</p>
    <button
      onClick={onRetry}
      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      Try Again
    </button>
  </div>
);

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Pending':
        return { icon: Clock, color: 'bg-yellow-100 text-yellow-800' };
      case 'In Progress':
        return { icon: CircleDot, color: 'bg-blue-100 text-blue-800' };
      case 'Resolved':
        return { icon: CheckCircle2, color: 'bg-green-100 text-green-800' };
      case 'Closed':
        return { icon: XCircle, color: 'bg-gray-100 text-gray-800' };
      default:
        return { icon: AlertCircle, color: 'bg-red-100 text-red-800' };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full ${config.color}`}>
      <Icon className="w-4 h-4 mr-2" />
      <span className="font-medium">{status}</span>
    </div>
  );
};

const ServiceRequestDetails = ({ requestId }) => {
    const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const fetchRequest = async () => {
        setLoading(true);
        try {
            const rs=location.state.request|| null;
            setRequest(rs);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    fetchRequest();
}, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <Icon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="font-medium text-gray-900 break-words">{value || 'N/A'}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="md:col-span-5 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:col-span-5 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <ErrorState message={error} onRetry={fetchRequestDetails} />
          </div>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="md:col-span-5 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <ErrorState 
              message="Service request not found" 
              onRetry={() => window.history.back()}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:col-span-5 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Service Request Details</h1>
            </div>
            <StatusBadge status={request.status} />
          </div>

          {/* Service Info */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <InfoItem 
              icon={Package} 
              label="Product Name" 
              value={request.productName} 
            />
            <InfoItem 
              icon={AlertCircle} 
              label="Service Type" 
              value={request.serviceType} 
            />
            <InfoItem 
              icon={AlertCircle} 
              label="Problem Description" 
              value={request.problem} 
            />
            <InfoItem 
              icon={Hash} 
              label="Serial Number" 
              value={request.serialNumber} 
            />
            <InfoItem 
              icon={User} 
              label="Customer Name" 
              value={request.name} 
            />
            <InfoItem 
              icon={Phone} 
              label="Mobile Number" 
              value={request.mobileNumber} 
            />
            <InfoItem 
              icon={Calendar} 
              label="Request Date" 
              value={formatDate(request.createdAt)} 
            />
            <InfoItem 
              icon={Calendar} 
              label="Order Date" 
              value={formatDate(request.orderedDate)} 
            />
          </div>

          {/* Address Section */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900">Service Address</h2>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: 'Flat/House No.', value: request.address.flatNo },
                  { label: 'Street', value: request.address.street },
                  { label: 'Landmark', value: request.address.landmark },
                  { label: 'City', value: request.address.city },
                  { label: 'State', value: request.address.state },
                  { label: 'Pincode', value: request.address.pincode }
                ].map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="font-medium text-gray-900">{item.value || 'N/A'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestDetails;