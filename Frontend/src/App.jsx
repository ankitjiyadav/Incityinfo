import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TelecallerPage from "./pages/TelecallerPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./pages/RegisterFrom";
import DashboardCard from "./components/DashboardCard";
import ConnectedCallList from "./components/ConnectedCallList";
import RecentActivity from "./components/RecentActivity";
import AdminDashboard from "./pages/AdminDashboard ";
import AdminLayout from "./components/AdminLayout ";
import AdminSidebar from "./pages/AdminSidebar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute role="admin"><DashboardPage /></ProtectedRoute>} />
      <Route path="/telecaller" element={<ProtectedRoute role="telecaller"><TelecallerPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/dashboardCard" element={<DashboardCard/>}/>
      <Route path="/connectedCallList" element={<ConnectedCallList/>}/>
      <Route path="/recentActivity" element={<RecentActivity/>}/>
      <Route path="/adminDashboard" element={<AdminDashboard/>} />
      <Route path="/adminLayout" element={<AdminLayout/>} />
      <Route
        path="/adminSidebar"
        element={
          <AdminSidebar>
            <AdminDashboard /> 
          </AdminSidebar>
        }
      />    </Routes>
  );
}

export default App; // ✅ Yeh line zaroori hai
