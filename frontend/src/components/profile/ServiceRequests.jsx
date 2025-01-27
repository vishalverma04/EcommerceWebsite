import { 
    Clock, 
    AlertCircle, 
    CheckCircle2, 
    CircleDot, 
    XCircle, 
    Search,
    FilterIcon,
    SortAsc
  } from 'lucide-react';

import React,{useState,useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

  const ServiceRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
            const {data} = await axios.get(`/api/v1/users/${userId}/service`);
            if(data.success){
                setRequests(data.serviceRequests);
            }else{
                toast.error(data.error);
            }
            } catch (error) {
              toast.error('Something went wrong');
            }
        };
        fetchRequests();
    }, []);
    
    const [searchTerm, setSearchTerm] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('All');
    const [sortBy, setSortBy] = React.useState('date');
  
    const getStatusIcon = (status) => {
      switch (status) {
        case 'Pending':
          return <Clock className="w-5 h-5 text-yellow-500" />;
        case 'In Progress':
          return <CircleDot className="w-5 h-5 text-blue-500" />;
        case 'Resolved':
          return <CheckCircle2 className="w-5 h-5 text-green-500" />;
        case 'Closed':
          return <XCircle className="w-5 h-5 text-gray-500" />;
        default:
          return <AlertCircle className="w-5 h-5 text-red-500" />;
      }
    };
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
    const filteredRequests = requests
      .filter(request => {
        const matchesSearch = 
          request._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'All' || request.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.requestDate) - new Date(a.requestDate);
        }
        return a.orderId.localeCompare(b.orderId);
      });
      
      const navigate=useNavigate();
    const handleViewRequest = (requestId) => {
      const request = requests.find((req) => req._id === requestId);
      navigate(`/service-requests/${requestId}`,
        {
          state: { request }
        }
      );
    };
  
    return (
      <div className="md:col-span-5 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">

            <h1 className="font-semibold text-lg mb-4">My Service And Warranty Registration</h1>
  
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by service ID, product, or problem..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
              
              <div className="flex gap-4">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <FilterIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
  
                {/* <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="orderId">Sort by Order ID</option>
                  </select>
                  <SortAsc className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </div> */}
              </div>
            </div>
  
            {/* Requests List */}
            <div className="space-y-4">
              {filteredRequests.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 text-lg">No service requests found</p>
                </div>
              ) : (
                filteredRequests.slice().reverse().map((request) => (
                  <div
                    key={request._id}
                    className="border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(request.status)}
                          <span className="font-medium text-gray-900">{request.status}</span>
                          <span className="text-sm text-gray-500">• {request.serviceType==='Other'?'Warranty Registration':'RO service'}</span>
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {request.productName}
                        </h3>
                        
                        <div className="text-base text-gray-500 space-y-1">
                          <p>Registration Id: <span className='text-green-500'>{request._id}</span></p>
                          <p>Problem: {request.problem}</p>
                          {/* <p>Location: {request.address.city}, {request.address.state}</p> */}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-sm text-gray-500">
                          Requested on
                        </span>
                        <span className="font-medium text-gray-900">
                          {formatDate(request.createdAt)}
                        </span>
                        {/* <button
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          onClick={() => handleViewRequest(request._id)}
                        >
                          View Details →
                        </button> */}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>
    );
  };
  
  export default ServiceRequestsPage;