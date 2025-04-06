// pages/AdminLayout.jsx
import AdminSidebar from "../pages/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
    <AdminSidebar />
    <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <Outlet />
    </main>
  </div>

  );
};

export default AdminLayout;
