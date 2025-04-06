import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TelecallerDashboard = () => {
  const [user, setUser] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
    else navigate("/"); // If user is not found, redirect to login
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 text-2xl font-bold border-b border-blue-700">
            📞 Telecaller CRM
          </div>
          <nav className="p-4 space-y-4">
            {user?.role === 'telecaller' && (
              <>
                <Link
                  to="/dashboardpage"
                  className="block hover:bg-blue-800 px-4 py-2 rounded"
                >
                  🏠 Dashboard
                </Link>
                <Link
                  to="/telecaller"
                  className="block hover:bg-blue-800 px-4 py-2 rounded"
                >
                  ➕ Add Lead
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 w-full py-2 rounded hover:bg-red-700"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-800">Telecaller Panel</h1>
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full"
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium text-sm">{user?.name || 'Telecaller'}</span>
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded p-4 z-50">
                <p className="font-semibold text-gray-700">{user?.name || 'Telecaller'}</p>
                <p className="text-sm text-gray-500">{user?.email || 'email@example.com'}</p>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TelecallerDashboard;
