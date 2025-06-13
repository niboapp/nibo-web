import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCTS } from "../../../qraphql/queries";
import { REMOVE_PRODUCT } from "../../../qraphql/mutations";
import Product from "../../../types/product";
import LeftArrow from "../../../components/ui/LeftArrow";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useManufacturer } from "../../../context/ManufacturerContext";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

const MyProductsTable = () => {
  const { manufacturer } = useManufacturer();
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    data: myProducts,
    loading,
    refetch,
  } = useQuery(GET_PRODUCTS, {
    variables: {
      manufacturerId: {
        equals: manufacturer,
      },
    },
    skip: !manufacturer,
  });

  const [removeProduct] = useMutation(REMOVE_PRODUCT, {
    onCompleted: () => {
      toast.success("Product deleted successfully");
      refetch();
      setActiveDropdown(null);
    },
    onError: (error) => {
      toast.error("Failed to delete product: " + error.message);
    },
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [activeDropdown]);

  const handleDropdownClick = (productId: string) => {
    setActiveDropdown(activeDropdown === productId ? null : productId);
  };

  const handleViewDetails = (productId: string) => {
    navigate(`/dashboard/edit-product/${productId}`);
    setActiveDropdown(null);
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await removeProduct({
          variables: {
            where: { id: productId },
          },
        });
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white p-6 md:p-10">
      <div className="flex gap-4 justify-between w-full">
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

        <div>
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
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600 text-sm font-medium">
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Retail Price</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Batch Number</th>
              <th className="px-4 py-3 w-20">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {myProducts?.products?.length > 0 ? (
              myProducts.products.map((product: Product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-sm max-w-xs truncate">
                    {product.description}
                  </td>
                  <td className="px-6 py-4">₦ {product.retailPrice}</td>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td className="px-6 py-4">{product.batchNumber || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div
                      className="relative"
                      ref={activeDropdown === product.id ? dropdownRef : null}
                    >
                      <button
                        onClick={() => handleDropdownClick(product.id)}
                        className="text-gray-400 hover:text-gray-900 p-2 rounded-md"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      {activeDropdown === product.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                          <button
                            onClick={() => handleViewDetails(product.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            View/Edit Details
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
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
