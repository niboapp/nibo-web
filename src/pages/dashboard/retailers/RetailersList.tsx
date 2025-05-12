import React from "react";
import { useQuery } from "@apollo/client";
import { GET_RETAILERS } from "../../../qraphql/queries";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { MoreVertical, Plus } from "lucide-react";
import { toast } from "sonner";
import { useManufacturer } from "../../../context/ManufacturerContext";
// interface store {
//   id: string;
//   fullAddress: string;
//   store: {
//     id: string;
//     name: string;
//     contact: string;
//   };
// }

const RetailersList: React.FC = () => {
  const { manufacturer } = useManufacturer();
  const { data, loading, error } = useQuery(GET_RETAILERS, {
    variables: {
      id: manufacturer,
    },
    skip: !manufacturer,
  });
  console.log(data, "data");
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load retailers");
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          Error loading retailers. Please try again later.
        </p>
      </div>
    );
  }

  const stores = data?.manufacturer?.stores || [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            List of Retailers
          </h1>
          <p className="text-gray-600 mt-1">Manage your existing retailers</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/dashboard/add-retailer"
            className="inline-flex items-center px-4 py-2 bg-bg-active text-white rounded-md hover:bg-pink-600"
          >
            <Plus size={20} className="mr-2" />
            Add Retailer
          </Link>
          <Link
            to="/dashboard/add-retailer-csv"
            className="inline-flex items-center px-4 py-2 border border-bg-active text-bg-active rounded-md hover:bg-gray-50"
          >
            Import CSV
          </Link>
        </div>
      </div>

      {stores.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            No retailers found. Add your first retailer to get started.
          </p>
          <Link
            to="/dashboard/add-retailer"
            className="inline-flex items-center px-4 py-2 mt-4 bg-bg-active text-white rounded-md hover:bg-pink-600"
          >
            <Plus size={20} className="mr-2" />
            Add Retailer
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stores.map((store: any) => (
                <tr key={store?.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {store?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {store?.location?.fullAddress}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {store?.contact}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-gray-400 hover:text-gray-900"
                      onClick={() => {
                        // Add action menu logic here
                      }}
                    >
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RetailersList;
