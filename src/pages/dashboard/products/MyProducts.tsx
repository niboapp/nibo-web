import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../../qraphql/queries";
import Product from "../../../types/product";
import LeftArrow from "../../../components/ui/LeftArrow";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useManufacturer } from "../../../context/ManufacturerContext";

const MyProductsTable = () => {
  const { manufacturer } = useManufacturer();
  console.log(manufacturer, "manufacturer");
  const navigate = useNavigate();
  const { data: myProducts, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      manufacturerId: {
        equals: manufacturer,
      },
    },
    skip: !manufacturer,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white p-6 md:p-10">
      <div className="flex  gap-4 justify-between w-full">
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <LeftArrow />
          </button>
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-800">My Products</h2>
            <p className="text-md text-gray-500 mb-4">
              Manage and edit existing product details
            </p>
          </div>
        </div>

        <div className="">
          <button
            onClick={() => navigate("/dashboard/add-product")}
            className="bg-gray-100 flex items-center px-4 py-2 text-gray-700 rounded-md hover:opacity-85 transition-all"
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-t-lg">
          {/* Table Header */}
          <thead className="bg-gray-50 ">
            <tr className="text-left text-gray-600 text-sm font-medium">
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Retail Price</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Batch Number</th>
              <th className="px-4 py-3">Show details</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {myProducts?.products?.length > 0 ? (
              myProducts.products.map((product: Product) => (
                <tr key={product.id} className="">
                  <td className="px-4 py-3 ">{product.name}</td>
                  <td className="px-4 py-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-sm max-w-xs truncate">
                    {product.description}
                  </td>
                  <td className="px-4 py-3">₦ {product.retailPrice}</td>
                  <td className="px-4 py-3">{product.quantity}</td>
                  <td className="px-4 py-3">{product.batchNumber || 0}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => console.log("Editing product")}
                      className="p-2 rounded-md hover:bg-gray-200"
                    >
                      <MoreVertical className="w-5 h-5 text-white-500" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  You have no products currently.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProductsTable;
