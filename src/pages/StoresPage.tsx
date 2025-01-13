import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Store from "../types/stores";
import LeftArrow from "../components/ui/LeftArrow";
import ShoppingCart from "../components/ui/ShoppingCart";
import { BottomNav } from "../components/Layout";

const MANUFACTURER_QUERY = gql`
  query Manufacturers {
    manufacturers {
      name
    }
  }
`;

interface StoreCardProps {
  store: Store;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <Link
      to={`/${encodeURIComponent(store.name.replace(" ", "-"))}`}
      className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm space-y-2 hover:bg-gray-100 transition-transform transform hover:scale-105"
    >
      <img
        src={store.name || "/placeholder-image.png"}
        alt={store.name}
        className="h-16 w-16 object-cover rounded-full"
      />
      <span className="text-sm font-medium text-gray-700">{store.name}</span>
    </Link>
  );
};

const StoresPage: React.FC = () => {
  const { data, loading, error } = useQuery(MANUFACTURER_QUERY);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-red-600 mb-2">
          Failed to load stores
        </h3>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  const manufacturers = data?.manufacturers || [];

  return (
    <div className="max-w-md mx-auto sm:max-w-2xl md:max-w-full min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 flex items-center px-4 py-3 bg-white border-b z-50">
        <Link to="/" className="text-gray-600">
          <LeftArrow />
        </Link>
        <h1 className="flex-1 text-center text-lg font-medium mr-6">Stores</h1>
        <ShoppingCart />
      </div>

      {/* Stores List */}
      <div className="py-6 px-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {manufacturers.length > 0 ? (
          manufacturers.map((manufacturer: Store) => (
            <StoreCard key={manufacturer.name} store={manufacturer} />
          ))
        ) : (
          <div className="text-center col-span-full py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No stores found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default StoresPage;
