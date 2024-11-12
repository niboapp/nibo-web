import React from "react";
import { Link } from "react-router-dom";
import products from "../data/products";
import Store from "../types/stores";
import LeftArrow from "../components/ui/LeftArrow";
import ShoppingCart from "../components/ui/ShoppingCart";

interface StoreCardProps {
  store: Store;
}

const getUniqueStores = () => {
  const storesMap = new Map<string, Store>();

  products.forEach((product) => {
    product.store?.forEach((storeInfo) => {
      if (!storesMap.has(storeInfo.name)) {
        const productsCount = products.filter((p) =>
          p.store?.some((s) => s.name === storeInfo.name)
        ).length;

        storesMap.set(storeInfo.name, {
          name: storeInfo.name,
          imageUrl: storeInfo.imageUrl ?? "/default-store-image.png",
          sold: storeInfo.sold,
          ratings: storeInfo.ratings,
          productCount: productsCount,
        });
      }
    });
  });

  return Array.from(storesMap.values());
};

// StoreCard Component
const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <Link
      to={`/store/${encodeURIComponent(store.name)}`}
      className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm space-y-2"
    >
      {/* Store Logo */}
      <img
        src={store.imageUrl}
        alt={store.name}
        className="h-12 w-12 object-contain"
      />
      {/* Store Name */}
      <span className="text-sm text-center font-medium text-gray-700">
        {store.name}
      </span>
    </Link>
  );
};

// Main Stores Page Component
const StoresPage: React.FC = () => {
  const stores = getUniqueStores();

  return (
    <div className="max-w-md mx-auto sm:max-w-2xl md:max-w-3xl min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 flex items-center px-4 py-3 bg-white border-b z-50">
        <Link to="/" className="text-gray-600">
          <LeftArrow />
        </Link>
        <h1 className="flex-1 text-center text-lg font-medium mr-6">Stores</h1>
         <ShoppingCart />
      </div>

      {/* Stores Grid */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {stores.length > 0 ? (
          stores.map((store) => (
            <StoreCard key={store.name} store={store} />
          ))
        ) : (
          <div className="text-center py-12 col-span-2 sm:col-span-3 md:col-span-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No stores found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoresPage;