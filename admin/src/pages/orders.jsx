import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import ordersData from "../mock/ordersData"; // Mock data for demonstration

ChartJS.register(ArcElement, Tooltip, Legend);

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setOrders(ordersData); // Replace this with API call
  }, []);

  // Filter orders by status
  const filteredOrders =
    statusFilter === ""
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  // Pie Chart Data
  const statusCount = orders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    { Pending: 0, Shipped: 0, Delivered: 0, Canceled: 0, "Return Requested": 0, Refunded: 0 }
  );

  const pieData = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: [
          "#FF6384", // Pending
          "#36A2EB", // Shipped
          "#4BC0C0", // Delivered
          "#FFCE56", // Canceled
          "#E7E9ED", // Return Requested
          "#9966FF", // Refunded
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#4BC0C0",
          "#FFCE56",
          "#E7E9ED",
          "#9966FF",
        ],
      },
    ],
  };

  // Handle status change
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Orders Overview</h1>
          {/* <button
            onClick={() => navigate("/addNewOrder")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add New Order
          </button> */}
        </div>

        {/* Stats and Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Total Orders */}
          <div className="bg-white p-6 shadow rounded">
            <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
            <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
          </div>
          {/* Last Month Orders */}
          <div className="bg-white p-6 shadow rounded">
            <h2 className="text-lg font-semibold text-gray-700">
              Last Month Orders
            </h2>
            <p className="text-3xl font-bold text-gray-900">
              {orders.filter((order) => order.date.includes("11-")).length}
            </p>
          </div>
          {/* Last Week Orders */}
          <div className="bg-white p-6 shadow rounded">
            <h2 className="text-lg font-semibold text-gray-700">Last Week Orders</h2>
            <p className="text-3xl font-bold text-gray-900">
              {orders.filter((order) => order.date.includes("12-")).length}
            </p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 shadow rounded mb-10">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Order Status</h2>
          <div className="w-full md:w-1/2 mx-auto">
            <Pie data={pieData} />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white p-6 shadow rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">All Orders</h2>
            <select
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              {Object.keys(statusCount).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">{order.date}</td>
                  <td className="px-4 py-2">{order.status}</td>
                  <td className="px-4 py-2">
                    <select
                      className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      {Object.keys(statusCount).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
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

export default OrdersPage;
