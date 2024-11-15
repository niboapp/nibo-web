import { useState, useEffect } from "react";
import Product from "../types/product";
import Store from "../types/stores";
import MapComponent, { UserLocation } from "../components/MapComponent";
import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import Button from "../components/ui/Button";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation>({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    const prod = products.find((product) => product.id === id) || null;
    setProduct(prod);
  }, [id]);

  useEffect(() => {
    if (product?.store) {
      const newStore = [product.store[0], product.store[1], product.store[2]];
      setStores(newStore);
    }
  }, [product]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [])

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="px-4 h-14 py-4 flex items-center justify-between border-b">
        <Link to="/" className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-base font-medium">Products</h1>
        <button className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </button>
      </div>

      {product && (
        <div className="flex-1 flex flex-col">
          {stores.length > 0 && (
            <div className="flex-1">
              <MapComponent userLocation={userLocation} Stores={stores} />
            </div>
          )}

         
          <div className="bg-white px-4 py-3">
            <div className="flex gap-3">
              <div className="w-[104px] h-[104px] flex-shrink-0 rounded-lg overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-base text-gray-700">{product.brand}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
            </div>

  
            <div className="mt-1 pl-32">
              <Link to={`/productdetail/${product.id}`}>
                <Button className="w-3/4 bg-bg-active text-white h-12 rounded-md hover:bg-pink-600">
                  Place order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}