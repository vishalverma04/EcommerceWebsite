import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { getProductCount,getTotalUserCount ,getCategoriesCount} from '../utils/dashboardData';
import { useEffect,useState } from 'react';
import SalesOverview from './SalesOverview';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [categoryCount,setCategoryCount]=useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const totalProducts = await getProductCount();
      const totalUsers = await getTotalUserCount();
      const totalCategory=await getCategoriesCount();

      setProductCount(totalProducts);
      setUserCount(totalUsers);
      setCategoryCount(totalCategory)
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="text-2xl font-semibold text-gray-800 mb-6">Admin Dashboard</div>

      {/* Summary Cards */}
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Products */}
        
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25zm0 12.75v-6m3 3h-6"
              />
            </svg>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="text-xl font-semibold text-gray-800">{productCount}</p>
          </div>
        </div>

        {/* Total Sales */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-green-100 p-4 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10.5v6.75c0 .621.504 1.125 1.125 1.125h15.75c.621 0 1.125-.504 1.125-1.125V10.5m-18 0l9-6.75 9 6.75m-18 0v10.5c0 .621.504 1.125 1.125 1.125h15.75c.621 0 1.125-.504 1.125-1.125V10.5"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Categories</p>
            <p className="text-xl font-semibold text-gray-800">{categoryCount}</p>
          </div>
        </div>

        {/* Total Orders */}
        {/* <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-yellow-100 p-4 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-yellow-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-3-3v6m-8.25 3.75L3 21h18l-1.75-1.25M3.75 5.25l1.5 1.125M20.25 5.25l-1.5 1.125"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-xl font-semibold text-gray-800">200</p>
          </div>
        </div> */}

        {/* Total Customers */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-red-100 p-4 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9c0 2.071-1.679 3.75-3.75 3.75S8.25 11.071 8.25 9s1.679-3.75 3.75-3.75S15.75 6.929 15.75 9zM6.75 21c0-3.325 2.925-6 6.75-6s6.75 2.675 6.75 6"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Customers</p>
            <p className="text-xl font-semibold text-gray-800">{userCount}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
       <SalesOverview />
    </div>
  );
};

export default Dashboard;
