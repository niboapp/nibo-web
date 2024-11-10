import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "../types/product";
import { ProductCard } from "./ProductCard";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { Heart} from "lucide-react";
import { toast, Toaster } from "sonner";

import Store from "../types/stores";


export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addItem } = useCart();
  const navigate = useNavigate();


  // Calculate distances when we have both product and user location


  useEffect(() => {
    const prod = products.find((product) => product.id === id) || null;
    setProduct(prod);

    if (prod) {
      const related = products
        .filter((p) => p.category === prod.category && p.id !== prod.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  const StoreLocation = ({
    store,
    showLabel = true,
  }: {
    store: Store;
    showLabel?: boolean;
  }) => (
    <div className="flex items-center justify-between py-1">
      <div className="flex-1">
        {showLabel && (
          <span className="text-gray-500 text-sm">{store.name} </span>
        )}
      </div>
    </div>
  );
  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <h1 className="text-lg font-medium">Product Details</h1>
        <div className="w-6" />
      </div>

      {/* Product Image and Details */}
      <div className="p-4">
        <div className="relative bg-white rounded-lg shadow-sm">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-contain p-4"
          />
          <button className="absolute top-2 right-2 p-2 rounded-full hover:bg-pink-50 transition-colors duration-200">
            <Heart className="w-5 h-5 transition-colors duration-200" />
          </button>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-medium">{product.name}</h2>
          <p className="text-xl font-medium mt-1">₦{product.price}</p>
          {product.store && product.store[0] && (
            <StoreLocation store={product.store[0]} />
          )}
        </div>
      </div>
      {/* Store Locations */}
      {product.store && product.store.length > 1 && (
        <div className="px-4 mt-2">
          <h3 className="text-sm font-medium mb-2">Other Store Locations:</h3>
          {product.store.slice(1).map((store, index) => (
            <p
              key={`${store.name}-${index}`}
              className="text-gray-500 text-sm mb-1"
            >
              {store.name}{" "}
            </p>
          ))}
        </div>
      )}

      {/* Related Products */}
      <div className="mt-2 p-4">
        <h3 className="text-base font-medium">
          Other Products From {product.store && product.store[0]?.name}
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-3">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t flex gap-3 max-w-lg mx-auto">
        <Toaster />
        <button
          onClick={() => {
            addItem(product);
            toast("Added to cart");
          }}
          className="flex-1 px-4 py-3 border-2 border-bg-active rounded-lg text-bg-active font-medium"
        >
          Add to Cart
        </button>
        <button className="flex-1 px-4 py-3 bg-bg-active rounded-lg text-white font-medium">
          Buy Now
        </button>
      </div>
    </div>
  );
};
