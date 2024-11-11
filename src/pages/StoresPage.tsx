import React from "react";
import { Link } from "react-router-dom";
import products from "../data/products";
import Store from "../types/stores";

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
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b">
        <Link to="/" className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-lg font-medium">Stores</h1>
        <button className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </button>
      </div>

      {/* Stores Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {stores.length > 0 ? (
          stores.map((store) => (
            <StoreCard key={store.name} store={store} />
          ))
        ) : (
          <div className="text-center py-12 col-span-2">
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