import { Link, Outlet } from "react-router-dom";

export const DashboardLayout: React.FC = () => {
    return (
      <div className="flex">
        <div className="fixed left-0 top-0 h-screen bg-white text-pink w-64 flex flex-col">
          {/* Logo */}
          <div className="p-6 text-center">
            <h1 className="text-2xl font-bold text-black">
              n<span className="text-pink-600">i</span>bo.
            </h1>
          </div>
  
          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-4">
              <Link
                to="/dashboard"
                className="border-b-2 block py-2 px-6 text-pink-500 hover:bg-pink-500 hover:text-white rounded-lg transition"
              >
                Dashboard
              </Link>
              <Link
                to="/"
                className="border-b-2 block py-2 px-6 text-pink-500 hover:bg-pink-500 hover:text-white rounded-lg transition"
              >
                My Account
              </Link>
              <Link
                to="/dashboard/myproducts"
                className="border-b-2 block py-2 px-6 text-pink-500 hover:bg-pink-500 hover:text-white rounded-lg transition"
              >
                My Products
              </Link>
            </ul>
          </nav>
  
          {/* Footer */}
          <div className="p-6">
            <p className="text-gray-400 text-sm">
              © 2024 nibo. All rights reserved.
            </p>
          </div>
        </div>
        <div className="ml-64 flex-1">
          <Outlet />
        </div>
      </div>
    );
  };
