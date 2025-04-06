// pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalTelecallers: 5,
    totalCalls: 120,
    totalCustomers: 80
  });

  const recentActivities = [
    { type: 'Call Made', name: 'Ravi Kumar', date: '2025-04-05' },
    { type: 'New Lead Added', name: 'Anjali Singh', date: '2025-04-05' }
  ];

  const callTrends = [
    { day: 'Mon', calls: 10 },
    { day: 'Tue', calls: 15 },
    { day: 'Wed', calls: 20 },
    { day: 'Thu', calls: 18 },
    { day: 'Fri', calls: 25 },
    { day: 'Sat', calls: 22 },
    { day: 'Sun', calls: 10 },
  ];

  const connectedCalls = [
    {
      customer: 'Ravi Kumar',
      datetime: '2025-04-05 10:30 AM',
      telecaller: 'Amit Sharma',
      status: 'Interested'
    },
    {
      customer: 'Sunita Verma',
      datetime: '2025-04-05 12:00 PM',
      telecaller: 'Pooja Yadav',
      status: 'Callback'
    }
  ];

  return (
    <div className="p-6 flex flex-col gap-6 w-full">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow p-4 text-center">
          <h2 className="text-xl font-semibold">Total Telecallers</h2>
          <p className="text-3xl font-bold">{metrics.totalTelecallers}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 text-center">
          <h2 className="text-xl font-semibold">Total Calls Made</h2>
          <p className="text-3xl font-bold">{metrics.totalCalls}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 text-center">
          <h2 className="text-xl font-semibold">Total Customers Contacted</h2>
          <p className="text-3xl font-bold">{metrics.totalCustomers}</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Recent Activities</h2>
        <ul className="space-y-2">
          {recentActivities.map((item, idx) => (
            <li key={idx} className="flex justify-between border-b pb-1">
              <span>{item.type} - {item.name}</span>
              <span className="text-gray-500">{item.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Call Trends Chart */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Call Trends This Week</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={callTrends}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="calls" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Connected Call Records */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Connected Call Records</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Customer</th>
              <th>Call Date & Time</th>
              <th>Telecaller</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {connectedCalls.map((call, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-2">{call.customer}</td>
                <td>{call.datetime}</td>
                <td>{call.telecaller}</td>
                <td>{call.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
