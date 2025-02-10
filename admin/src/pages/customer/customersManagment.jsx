import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Users, 
  TrendingUp, 
  UserPlus, 
  UserMinus,
  DollarSign ,
  Calendar,
    Clock,
    ShoppingCart,
    RefreshCw

} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import CustomerGrowthAnalytics from '../settingsPage/customerGrowth';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const CustomerDashboard = () => {
  // Sample customer data
  const [AllCustomers, setAllCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const { data } = await axios.get(`${SERVER_URL}/api/v1/admin/getallusers`);
                setAllCustomers(data.users);
            } catch (error) {
                toast.error('Error fetching customers');
            }
        };
        fetchCustomers();
    }, []);

   const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = useMemo(() => {
    return AllCustomers.filter(customer => {
      const matchesSearch = (
        customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

      let startDateMatch = true;
      let endDateMatch = true;

      if(startDate){
        startDateMatch = new Date(customer.createdAt) >= new Date(startDate);
      }

      if(endDate){
        endDateMatch = new Date(customer.createdAt) <= new Date(endDate+'T23:59:59');
      }
        
      return matchesSearch && startDateMatch && endDateMatch;
    });
  }, [AllCustomers, searchTerm,startDate,endDate ]);

  const dateFormat=(date)=>{
    const d=new Date(date);
    return `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
    }

    const navigate = useNavigate();

    const handleCustomerClick = (customer) => {
        navigate(`/customers/${customer._id}`, { state: { customer } });
    };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <CustomerGrowthAnalytics AllCustomers={AllCustomers} />

      {/* Search and Filter */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-gray-800 ">Customers</h1>
      <div className="bg-white p-4 rounded-lg shadow mb-2">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search customers..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

            <div className="flex items-center gap-2">
            <RefreshCw size={20} onClick={()=>{
              toast.success("Filters cleared");
              setStartDate("");
              setEndDate("");
              setSearchTerm("");
            }}/>
            </div>


        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
              
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer._id}>
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => handleCustomerClick(customer)}>
                  <div className="text-sm font-medium text-green-500">{customer._id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{customer.fullName}</div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{customer.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.mobileNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {dateFormat(customer.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      </div>

    </div>
  );
};

export default CustomerDashboard;