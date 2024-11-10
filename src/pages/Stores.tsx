/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link } from 'react-router-dom';
interface Store {
  id: string;
  name: string;
  logo: string; // URL to the store's logo image
  category: string; // e.g., Health, Fashion, Electronics
}

const storesData: Store[] = [
    { id: '1', name: '4K', logo: 'path-to-logo.png', category: 'Health' },
    { id: '2', name: 'AS', logo: 'path-to-logo.png', category: 'Health' },
    { id: '3', name: 'L’Oreal', logo: 'path-to-logo.png', category: 'Fashion' },
    { id: '4', name: 'O’Neill', logo: 'path-to-logo.png', category: 'Fashion' },
    { id: '5', name: 'Redis', logo: 'path-to-logo.png', category: 'Electronics' },
    // Add more stores as needed
  ];
  

export const StoresPage: React.FC = () => {
  // Group stores by category
  const storesByCategory = storesData.reduce<{ [key: string]: Store[] }>((acc: { [x: string]: any[]; }, store: { category: string | number; }) => {
    if (!acc[store.category]) acc[store.category] = [];
    acc[store.category].push(store);
    return acc;
  }, {});

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

      {/* Stores by Category */}
      <div className="p-4 space-y-6">
        {Object.keys(storesByCategory).map((category) => (
          <div key={category}>
            {/* Category title */}
            <h2 className="text-gray-800 font-semibold mb-2">{category}</h2>
            
            {/* Store Cards */}
            <div className="grid grid-cols-2 gap-4">
              {storesByCategory[category].map((store) => (
                <div
                  key={store.id}
                  className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm space-y-2"
                >
                  {/* Store Logo */}
                  <img src={store.logo} alt={store.name} className="h-12 w-12 object-contain" />
                  {/* Store Name */}
                  <span className="text-sm text-center font-medium text-gray-700">{store.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoresPage;
