import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Product from '../types/product';
import { ProductCard } from '../components/ProductCard';
import products from '../data/products';
import Store from '../types/stores';

export const StoreDetails: React.FC = () => {
  const { storeName } = useParams<{ storeName: string }>();
  const [storeProducts, setStoreProducts] = useState<Product[]>([]);
  const [storeData, setStoreData] = useState<Store | null>(null);

  useEffect(() => {
    const productsInStore = products.filter((product) => 
      product.store?.some((store) => store.name === storeName)
    );

    if (productsInStore.length > 0) {
      const storeInfo = productsInStore[0].store?.find((store) => store.name === storeName);
      
      if (storeInfo) {
        const { name, sold, ratings, imageUrl } = storeInfo;
        setStoreData({
          name,
          sold,
          productCount: productsInStore.length,
          ratings,
          imageUrl: imageUrl ?? '/default-store-image.png',
        });
      }
    }
    
    setStoreProducts(productsInStore);
  }, [storeName]);

  if (!storeData) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b">
        <Link to="/stores" className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-lg font-medium text-gray-800">{storeData.name}</h1>
        <button className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </button>
      </div>

      {/* Store Information */}
      <div className="p-6 text-center">
        <img 
          src={storeData.imageUrl} 
          alt={storeData.name} 
          className="w-20 h-20 mx-auto rounded-full object-cover" 
        />
        <p className="mt-4 text-xl font-semibold text-gray-800">{storeData.name}</p>
        <p className="mt-1 text-sm text-gray-500">
          {storeData.sold} Sold • {storeData.productCount} Products • {storeData.ratings} Rating
        </p>
        <button className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1 align-text-top" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          Follow Store
        </button>
      </div>

      {/* Tab Section */}
      <div className="flex justify-around mt-4 border-b">
        <button className="pb-2 border-b-4 border-pink-500 text-pink-500 font-semibold">Products</button>
        <button className="pb-2 text-gray-500 font-semibold">Categories</button>
        <button className="pb-2 text-gray-500 font-semibold">Reviews</button>
      </div>

      {/* Store Products */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {storeProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
