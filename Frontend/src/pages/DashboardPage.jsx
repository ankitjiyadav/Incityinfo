import { useEffect, useState } from "react";
import axios from "axios";
import DashboardCard from "../components/DashboardCard";
import RecentActivity from "../components/RecentActivity";
import ConnectedCallList from "../components/ConnectedCallList";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const DashboardPage = () => {
  const [metrics, setMetrics] = useState({});
  const [recent, setRecent] = useState([]);
  const [connectedCalls, setConnectedCalls] = useState([]);
  const [callTrends, setCallTrends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://incityinfo.onrender.com/admin/dashboard");
      setMetrics(res.data.metrics);
      setRecent(res.data.recentActivities);
      setConnectedCalls(res.data.connectedCalls);
      setCallTrends(res.data.callTrends);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DashboardCard title="Total Telecallers" value={metrics.telecallers || 0} icon="👥" />
        <DashboardCard title="Total Calls Made" value={metrics.totalCalls || 0} icon="📞" />
        <DashboardCard title="Customers Contacted" value={metrics.customersContacted || 0} icon="📋" />
      </div>

      {/* Trends Chart */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold mb-4">Call Trends (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={callTrends}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity & Connected Calls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecentActivity activities={recent} />
        <ConnectedCallList records={connectedCalls} />
      </div>
    </div>
  );
};

export default DashboardPage;
