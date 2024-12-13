import { useEffect, useState } from "react";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useModal } from "../../context/ModalContext";
import { AddProductModal } from "../../components/AddProductModal";
import axios from "axios";
import { toast } from "sonner";
import Product from "../../types/product";
const MyProductsTable = () => {
  const [myProducts, setProducts] = useState<Product[]>([]);
  const { showModal, setShowModal } = useModal();
  //   const handleEditProduct = (productId) => {
  //     // Placeholder for edit functionality
  //     console.log(`Editing product ${productId}`);
  //   };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products.");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full  mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-bg-active">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Retail Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Batch Qty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Retailers Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {myProducts &&
              myProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.quantityAvailable}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() =>
                        console.log("This nigga is trying to edit")
                      }
                      className="inline-flex items-center justify-center p-2 border border-transparent rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setShowModal(!showModal)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bg-active hover:bg-bg-active/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Product
        </button>
        {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
};

export default MyProductsTable;
