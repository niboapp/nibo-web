import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, User, Plus, LogOut } from "lucide-react";
import Button from "../ui/Button";
import { authService } from "../../api/auth";

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen bg-white w-64 flex flex-col shadow-md">
        {/* Logo */}
        <div className="py-6 px-6 flex items-center justify-center">
          <h1 className="text-3xl font-bold">
            n<span className="text-pink-600">i</span>bo
            <span className="text-pink-600">.</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 w-full mt-8 px-7">
          <ul className="space-y-4 w-full">
            <li>
              <NavLink
                to="/dashboard/main"
                className={({ isActive }) =>
                  `w-full flex items-center py-3 px-4 rounded-md justify-center ${
                    isActive
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200 text-black"
                  }`
                }
              >
                <LayoutDashboard size={20} className="mr-3" />
                <span className="text-base">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/myproducts"
                className={({ isActive }) =>
                  `w-full flex items-center py-3 px-4 rounded-md justify-center ${
                    isActive
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200 text-black"
                  }`
                }
              >
                <Package size={20} className="mr-3" />
                <span className="text-base">My Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/account"
                className={({ isActive }) =>
                  `w-full flex items-center py-3 px-4 rounded-md justify-center ${
                    isActive
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200 text-black"
                  }`
                }
              >
                <User size={20} className="mr-3" />
                <span className="text-base">My Account</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/retailers"
                className={({ isActive }) =>
                  `w-full flex items-center py-3 px-4 rounded-md justify-center ${
                    isActive
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200 text-black"
                  }`
                }
              >
                <Plus size={18} className="mr-2" />
                <span className="text-base">Add Retailers</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="p-5">
          <Button
            onClick={() => {
              authService.clearToken();
              authService.logout();
              navigate("/login");
            }}
            className={
              "w-full flex items-center py-3 px-4 rounded-md justify-center bg-pink-500 text-black"
            }
          >
            <LogOut size={18} className="mr-2" />
            <span className="text-base">Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64 flex-1">
        <Outlet />
      </div>
    </div>
  );
};
