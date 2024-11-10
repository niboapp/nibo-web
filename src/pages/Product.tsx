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
    if (product && product.store) {
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
  }, []); // Added dependency array to prevent continuous updates

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
    {/* Header */}
    <div className="p-4 pb-8 flex items-center justify-between border-b">
      <Link to="/" className="text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>
      <h1 className="text-lg font-medium">Products</h1>
      <button className="text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </button>
    </div>
      {product && (
        <div className="space-y-6">
          {stores.length > 0 && (
            <div className="space-y-2">
              <MapComponent userLocation={userLocation} Stores={stores} />
            </div>
          )}
          <div className="flex gap-3">
          <div className="aspect-square w-[104px] relative overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="object-cover size-[104px]"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-lg font-semibold">{product.name}</h1>
            <p>{product.brand}</p>
            <p className="text-gray-600">{product.category}</p>
          </div>
          </div>

          <div className="relative w-full left-72 bottom-8">
            <Button className="w-40"><Link to={`/productdetail/${product.id}`}>Place order</Link></Button>
          </div>
        </div>
      )}
    </div>
  );
}