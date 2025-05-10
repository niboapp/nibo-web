import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">
          Track your business performance, market, and customer insights
        </p>
        {/* Toggle Buttons */}
        <div className="mt-4 flex justify-center gap-4">
          <button className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
            Weekly
          </button>
          <button className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
            Monthly
          </button>
          <button className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
            Quarterly
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600">Total Revenue</h3>
          <p className="text-xl font-bold">₦0.00</p>
          <p className="text-sm text-gray-500">Across all products</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600">Total Orders</h3>
          <p className="text-xl font-bold">0</p>
          <p className="text-sm text-gray-500">
            5% MoM increase in completed orders
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600">Returning Users</h3>
          <p className="text-xl font-bold">0</p>
          <p className="text-sm text-gray-500">
            12% of first-time buyers return
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600">Total Reach</h3>
          <p className="text-xl font-bold">0</p>
          <p className="text-sm text-gray-500">Across all locations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow flex items-center justify-center">
          <p className="text-gray-500">Map Component Placeholder</p>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-600">Total Unique Product Search</h3>
            <p className="text-xl font-bold">5,893</p>
            <p className="text-sm text-gray-500">
              Searches from the Nibo marketplace
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-600">Landing Page View</h3>
            <p className="text-xl font-bold">37,880</p>
            <p className="text-sm text-gray-500">
              Increased conversion rate by 10%
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/add-product")}
            className="w-full py-3 bg-pink-500 text-white font-bold rounded-md hover:bg-pink-600"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
