import { useState } from "react";
import Image from "../../../components/ui/Image";
import { Heart } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../../qraphql/queries";

export default function Orders() {
  const [tab, setTab] = useState("active");
  const { data: products } = useQuery(GET_PRODUCTS);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Tab Navigation */}
      <div className="flex w-full border-b mb-6">
        <button
          onClick={() => setTab("active")}
          className={`py-2 px-4 text-sm font-medium ${
            tab === "active"
              ? "border-b-2 border-pink-500 text-pink-500"
              : "text-gray-500"
          }`}
        >
          Ongoing/Delivered
        </button>
        <button
          onClick={() => setTab("cancelled")}
          className={`py-2 px-4 text-sm font-medium ${
            tab === "cancelled"
              ? "border-b-2 border-pink-500 text-pink-500"
              : "text-gray-500"
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* Order List */}
      <div className="space-y-4 w-full">
        {tab === "active" && (
          <div className="space-y-4 w-full">
            {products.map((product: any) => (
              <div
                key={product.id}
                className="flex  w-full justify-between bg-white rounded-lg p-4"
              >
                {/* Product Image */}
                <div className="relative w-20 h-20">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button className="absolute right-1 top-1 z-10">
                    <Heart className="h-4 w-4 text-pink-500" />
                  </button>
                </div>

                {/* Product Details */}
                <div className="w-28">
                  <h3 className="text-sm font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500">Order #{product.id}</p>
                  <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-pink-500 text-white rounded">
                    DELIVERED
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    On {product.quantityBought}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "cancelled" && (
          <div className="text-center text-gray-500 py-8">
            No cancelled orders
          </div>
        )}
      </div>
    </div>
  );
}
