// components/AdminSidebar.jsx
import { LayoutDashboard, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const admin = {
    name: 'Ankit Yadav',
    role: 'Admin',
    avatar: '' // Add image URL if available
  };
  return (
    <div className="flex h-screen w-full">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col justify-between shadow-lg">
        {/* Navigation Links */}
        <div className="p-4 flex-1">
          <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
          <nav className="flex flex-col gap-3">
            <Link
              to="#"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-700 transition"
            >
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            {/* Add more nav links here */}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 p-2 rounded transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Right Section with Top Navbar and Page Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Top Navbar */}
        <div className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-md">
          <div className="text-xl font-semibold text-gray-800">CRM Dashboard</div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <h3 className="text-sm font-semibold">{admin.name}</h3>
              <p className="text-xs text-gray-500">{admin.role}</p>
            </div>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold">
              {admin.avatar ? (
                <img
                  src={admin.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                admin.name.charAt(0)
              )}
            </div>
          </div>
        </div>

        {/* Page Content Below Navbar */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
