// src/pages/CustomerPage.jsx
import React from "react";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import customersData from "../mock/customersData"; // Mock data for customers

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [lastMonthCustomers, setLastMonthCustomers] = useState([]);
  const [lastWeekCustomers, setLastWeekCustomers] = useState([]);

  useEffect(() => {
    const today = new Date();
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
    const lastWeek = new Date(today.setDate(today.getDate() - 7));

    const allCustomers = customersData; // Mock data
    setCustomers(allCustomers);

    const filterLastMonth = allCustomers.filter(
      (customer) => new Date(customer.joinedDate) >= lastMonth
    );
    setLastMonthCustomers(filterLastMonth);

    const filterLastWeek = allCustomers.filter(
      (customer) => new Date(customer.joinedDate) >= lastWeek
    );
    setLastWeekCustomers(filterLastWeek);
  }, []);

  const userGrowthData = {
    labels: ["January", "February", "March", "April", "May", "June","july","August","September","October","November","December"],
    datasets: [
      {
        label: "New Customers",
        data: [12, 19, 8, 15, 22, 10,5,3,8,10,12,19], // Example data
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Customers */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Total Customers</h2>
          <p className="text-4xl font-semibold text-blue-600">{customers.length}</p>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">User Growth</h2>
          <Bar data={userGrowthData} />
        </div>
      </div>

      {/* Last Month Customers */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Last Month's Customers</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Joined Date
                </th>
              </tr>
            </thead>
            <tbody>
              {lastMonthCustomers.map((customer, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 text-gray-700">{customer.name}</td>
                  <td className="px-4 py-2 text-gray-700">{customer.email}</td>
                  <td className="px-4 py-2 text-gray-700">{customer.joinedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Last Week Customers */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Last Week's Customers</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Joined Date
                </th>
              </tr>
            </thead>
            <tbody>
              {lastWeekCustomers.map((customer, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 text-gray-700">{customer.name}</td>
                  <td className="px-4 py-2 text-gray-700">{customer.email}</td>
                  <td className="px-4 py-2 text-gray-700">{customer.joinedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
