import React, { useState } from 'react';
import { Calendar, Filter,RefreshCw,Search  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { ORDER_STATUS } from  '../../constant.js';

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response=await axios.get("/api/v1/admin/orders");
        if(response.status===200){
          setOrders(response.data.orders);  
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
  const [paymentFilter, setPaymentFilter] = useState("");
  const [search, setSearch] = useState("");

  // Handle status change
  const handleStatusChange =async (orderId, newStatus) => {
    const response=await axios.put(`${SERVER_URL}/api/v1/admin/orders/${orderId}/status`, { status: newStatus });
    if(response.status===200){
      toast.success("Order status updated successfully");
      if(newStatus==="delivered"){
        const order=orders.find(order=>order._id===orderId);
        order.deliveredAt=new Date();
      }
     setOrders(orders.map(order => 
      order._id === orderId ? { ...order, status: newStatus } : order
    ));
    }else{
      toast.error("Error updating order status");
    }
  };

  // Filter orders based on date range and status

  const [filteredOrders, setFilteredOrders] = useState(orders);

  

   useEffect(() => {
    let filteredOrders = orders.filter((order) => {
      let startDateMatch = true;
      let endDateMatch = true;
      let statusMatch = true;
      let paymentMatch = true;
      let searchMatch = true;

      if (search) {
        searchMatch= order._id.toLowerCase().includes(search.toLowerCase());
      }


      if (startDate) {
        startDateMatch = new Date(order.date) >= new Date(startDate);
      }

      if (endDate) {
        endDateMatch = new Date(order.date) <= new Date(endDate+"T23:59:59.999Z");
      }

      if (statusFilter) {
        statusMatch = order.status === statusFilter;
      }

      if (paymentFilter) {
        paymentMatch = order.payment.paymentStatus === paymentFilter;
      }

      return startDateMatch && endDateMatch && statusMatch && paymentMatch && searchMatch;
    });

    setFilteredOrders(filteredOrders);
  }, [startDate, endDate, statusFilter, paymentFilter, orders, search]);



const navigate=useNavigate();
const handleClick = (order) => {
  navigate(`/order/${order._id}`, { state: { order } });
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
        <h1 className="text-2xl font-bold mb-6">Orders Management</h1>
        
        

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
              <span className='text-sm text-gray-500'>Payment Status:</span>
              <Filter size={20} className="text-gray-500" />
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="border rounded-full px-3 py-2"
              >
                <option value="">All Status</option>
                <option value="completed">completed</option>
                <option value="pending">pending</option>
              </select>
            </div>



            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-full">
            <span className='text-sm text-gray-500'>Order Status:</span>
              <Filter size={20} className="text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-full px-3 py-2"
              >
                <option value="">All Status</option>
                {ORDER_STATUS.map(status => (
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
              setPaymentFilter("");
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
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Payment</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Items</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Total</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 ">
              {filteredOrders.slice().reverse().map((order) => (
                <tr key={order._id} className="hover:bg-blue-50">
                  <td className="px-6 py-4 text-md text-gray-600 cursor-pointer hover:text-blue-500 " onClick={()=>{handleClick(order)}}>{order._id}</td>
                  <td className="px-6 py-4 text-sm "><span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${order.payment.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : ''}
                    ${order.payment.paymentStatus === 'pending' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {order.payment.paymentStatus.toUpperCase()}
                  </span>

                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{getDate(order.date)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.items.length}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">₹{order.total}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : ''}
                      ${order.status === 'shipped' ? 'bg-purple-100 text-purple-800' : ''}
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                      ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      {ORDER_STATUS.map(status => (
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
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;