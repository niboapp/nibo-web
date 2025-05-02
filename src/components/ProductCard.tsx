import { Heart } from "lucide-react";
import Product from "../types/product";
import Image from "./ui/Image";
import { Link } from "react-router-dom";
interface ProductCardProps {
  product: Product;
  onViewDetails?: (productId: string) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
}) => {
  return (
    <Link to={`/product/${product?.id}`}>
      <div className={`relative cursor-pointer space-y-2 ${className}`}>
        {/* Favorite Icon */}
        <button
          className={`absolute right-2 top-2 z-10 rounded-full  p-1.5 shadow-sm`}
        >
          <Heart className="h-4 w-4 text-gray-400" />
        </button>

        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product?.imageUrl}
            alt={product?.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3 className="truncate text-sm font-medium text-gray-900">
            {product?.name}
          </h3>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-gray-500">₦{product?.price}</span>
            <span className="text-xs text-gray-400">{product?.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
