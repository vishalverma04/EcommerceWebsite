import React, { useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  UserPlus
} from 'lucide-react';

const CustomerGrowthAnalytics = ({ AllCustomers }) => {
  // Process customer data to get monthly metrics
  const monthlyGrowthData = useMemo(() => {
    // Create a map to store customers by month
    const monthlyData = new Map();

    // Process each customer
    AllCustomers.forEach(customer => {
      const date = new Date(customer.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, {
          monthYear: `${new Date(date.getFullYear(), date.getMonth(), 1).toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`,
          month: new Date(date.getFullYear(), date.getMonth(), 1).toLocaleString('default', { month: 'short' }),
          year: date.getFullYear(),
          newCustomers: 0,
          totalCustomers: 0
        });
      }
      
      const monthData = monthlyData.get(monthKey);
      monthData.newCustomers += 1;
    });

    // Convert to array and sort by date
    let sortedData = Array.from(monthlyData.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([_, data]) => data);

    // Calculate running total of customers
    let runningTotal = 0;
    sortedData = sortedData.map(data => {
      runningTotal += data.newCustomers;
      return {
        ...data,
        totalCustomers: runningTotal
      };
    });

    return sortedData;
  }, [AllCustomers]);

  // Calculate growth metrics
  const growthMetrics = useMemo(() => {
    if (monthlyGrowthData.length < 2) {
      return {
        growthRate: 0,
        currentMonthNew: 0,
        lastMonthNew: 0,
        totalCustomers: AllCustomers.length
      };
    }

    const currentMonth = monthlyGrowthData[monthlyGrowthData.length - 1];
    const lastMonth = monthlyGrowthData[monthlyGrowthData.length - 2];

    const growthRate = lastMonth.totalCustomers > 0
      ? ((currentMonth.totalCustomers - lastMonth.totalCustomers) / lastMonth.totalCustomers * 100).toFixed(1)
      : 100;

    return {
      growthRate,
      currentMonthNew: currentMonth.newCustomers,
      lastMonthNew: lastMonth.newCustomers,
      totalCustomers: currentMonth.totalCustomers
    };
  }, [monthlyGrowthData, AllCustomers]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    
    return (
      <div className="bg-white p-3 border rounded shadow">
        <p className="font-medium text-gray-900 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Growth Analytics</h1>
        <p className="text-gray-600">Track and analyze customer growth metrics</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

      <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-gray-500">Total Customers</p>
              <h3 className="text-2xl font-bold text-purple-600">{growthMetrics.totalCustomers}</h3>
            </div>
            <Users className="text-purple-500" size={24} />
          </div>

          <p className="text-sm text-gray-500">All Time</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-gray-500">Last Month New</p>
              <h3 className="text-2xl font-bold text-yellow-600">{growthMetrics.lastMonthNew}</h3>
            </div>
            <UserPlus className="text-yellow-500" size={24} />
          </div>
          <p className="text-sm text-gray-500">Previous Month</p>
        </div>

        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-gray-500">Current Month New</p>
              <h3 className="text-2xl font-bold text-blue-600">{growthMetrics.currentMonthNew}</h3>
            </div>
            <UserPlus className="text-blue-500" size={24} />
          </div>
          <p className="text-sm text-gray-500">This Month</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-gray-500">Growth Rate</p>
              <h3 className="text-2xl font-bold text-green-600">+{growthMetrics.growthRate}%</h3>
            </div>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <p className="text-sm text-gray-500">Month over Month</p>
        </div>


        

        
      </div>

      {/* Growth Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">Customer Growth Trend</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthYear" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="totalCustomers" 
              stroke="#3b82f6" 
              name="Total Customers"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="newCustomers" 
              stroke="#10b981" 
              name="New Customers"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Details Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Customers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Customers</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...monthlyGrowthData].reverse().map((data, index) => (
              <tr key={`${data.month}-${data.year}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {data.monthYear}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.newCustomers}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.totalCustomers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerGrowthAnalytics;