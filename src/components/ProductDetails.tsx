import { useParams, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Product from "../types/product";
import { ProductCard } from "./ProductCard";
import { useCart } from "../context/CartContext";
import { Heart } from "lucide-react";
import { toast, Toaster } from "sonner";
import LoadingSpinner from "./LoadingSpinner";

// GraphQL query for product details
const GET_PRODUCT = gql`
  query Query($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      name
      imageUrl
      createdAt
      quantity
    }
  }
`;

// Query for related products
const GET_RELATED_PRODUCTS = gql`
  query GetRelatedProducts($category: String!) {
    products(where: { category: $category }) {
      id
      name
      imageUrl
      quantity
    }
  }
`;

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  // Fetch main product
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      where: { id },
    },
    skip: !id,
  });

  // Fetch related products when we have the main product's category
  const { data: relatedData, loading: relatedLoading } = useQuery(
    GET_RELATED_PRODUCTS,
    {
      variables: {
        category: data?.product?.category || "",
      },
      skip: !data?.product?.category,
    }
  );

  // Filter out the current product from related products
  const relatedProducts =
    relatedData?.products?.filter((p: Product) => p.id !== id)?.slice(0, 4) ||
    [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  if (error) return <div>Error loading product: {error.message}</div>;
  if (!data?.product) return <div>Product not found</div>;

  const product = data.product;

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
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="text-sm text-gray-500">
            Batch Quantity: {product.batchQuantity}
          </p>
          <p className="text-sm text-gray-500">
            Created: {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-2 p-4">
        <h3 className="text-base font-medium">
          Other {product.category} Products
        </h3>
        {relatedLoading ? (
          <div>Loading related products...</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-3">
            {relatedProducts.map((relatedProduct: Product) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        )}
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
