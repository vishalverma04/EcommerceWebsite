import React, { useState } from 'react';
import { Calendar, Filter,RefreshCw,Search  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

import { SERVICE_STATUS } from  '../../constant.js';

const AdminOrders = () => {

  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response=await axios.get(`${SERVER_URL}/api/v1/admin/services`);
        if(response.status===200){
          setServices(response.data.serviceRequests);  
        }
      } catch (error) {
        toast.error("Error fetching orders");
      }
    };
    fetchOrders();
  }, []);

  // Filter states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [servicetype,setServicesType]=useState("")

  // Handle status change
  const handleStatusChange =async (serviceId, newStatus) => {
    const response=await axios.put(`${SERVER_URL}/api/v1/admin/services/${serviceId}/status`, { status: newStatus });
    if(response.status===200){
      toast.success("services status updated successfully");
      if(newStatus==="Resolved"){
        const service=services.find(service=>service._id===serviceId);
        service.resolvedAt=new Date();
      }
     setServices(services.map(service => 
        service._id === serviceId ? { ...service, status: newStatus } : service
    ));
    }else{
      toast.error("Error updating service status");
    }
  };

  // Filter orders based on date range and status

  const [filteredServices, setFilteredServices] = useState(services);

   useEffect(() => {
    let filteredServices = services.filter((service) => {
      let startDateMatch = true;
      let endDateMatch = true;
      let statusMatch = true;
      let searchMatch = true;
      let serviceTypeMatch=true;

      if (search) {
        searchMatch= service._id.toLowerCase().includes(search.toLowerCase());
      }


      if (startDate) {
        startDateMatch = new Date(service.createdAt) >= new Date(startDate);
      }

      if (endDate) {
        endDateMatch = new Date(service.createdAt) <= new Date(endDate);
      }

      if (statusFilter) {
        statusMatch = service.status === statusFilter;
      }

      if(servicetype){
        serviceTypeMatch=service.serviceType===servicetype;
      }


      return startDateMatch && endDateMatch && statusMatch  && searchMatch && serviceTypeMatch;
    });

    setFilteredServices(filteredServices);
  }, [startDate, endDate, statusFilter, services, search,servicetype]);



const navigate=useNavigate();
const handleClick = (service) => {
  navigate(`/service/${service._id}`, { state: { serviceRequest:service } });
}
const getDate = (date) => {
  // DD-MM-YYYY
  const dateObj = new Date(date);
  const dateformat =dateObj.getDate() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getFullYear(); 
  return dateformat;
}
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Service Management</h1>
        
        

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-wrap gap-4 items-center">
               
            <div className="flex w-full outline-none items-center gap-2">
              <Search size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search Orders by ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-3 py-2 w-full outline-none text-gray-800"
              />
            </div>
            
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-full">
                            <span className='text-sm text-gray-500'>Service Type:</span>
                            <Filter size={20} className="text-gray-500" />
                            <select
                              value={servicetype}
                              onChange={(e) => setServicesType(e.target.value)}
                              className="border rounded-full px-3 py-2"
                            >
                              <option value="">All Type</option>
                              <option value="RO">RO</option>
                              <option value="warranty">warranty</option>
                              
                            </select>
                          </div>

            <div className="flex items-center gap-2">
            <span className='text-sm text-gray-500'>From: </span>
              <Calendar size={20} className="text-gray-500" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded px-3 py-2"
                placeholder="Start Date"
              />
            </div>
            <div className="flex items-center gap-2">
            <span className='text-sm text-gray-500'>To: </span>
              <Calendar size={20} className="text-gray-500" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded px-3 py-2"
                placeholder="End Date"
              />
            </div>



            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-full">
            <span className='text-sm text-gray-500'>Service Status:</span>
              <Filter size={20} className="text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-full px-3 py-2"
              >
                <option value="">All Status</option>
                {SERVICE_STATUS.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div >
            <RefreshCw size={20} onClick={()=>{
              toast.success("Filters cleared");
              setStartDate("");
              setEndDate("");
              setStatusFilter("");
              setServicesType("");
              setSearch("");
            }}/>
            </div>
            


          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Service ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Service Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 ">
              {filteredServices.slice().reverse().map((service) => (
                <tr key={service._id} className="hover:bg-blue-50">
                  <td className="px-6 py-4 text-md text-green-500 cursor-pointer hover:text-blue-500 " onClick={()=>{handleClick(service)}}>{service._id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{service.serviceType}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{getDate(service.createdAt)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${service.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${service.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : ''}
                      ${service.status === 'Resolved' ? 'bg-green-100 text-green-800' : ''}
                      ${service.status === 'Closed' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <select
                      value={service.status}
                      onChange={(e) => handleStatusChange(service._id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      {SERVICE_STATUS.map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No Service found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;