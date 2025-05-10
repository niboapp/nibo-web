import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Minus } from "lucide-react";
import { useMutation } from "@apollo/client";
import { CREATE_RETAILER_MUTATION } from "../../../qraphql/mutations";
import { toast } from "sonner";
import { useManufacturer } from "../../../context/ManufacturerContext";
interface Retailer {
  name: string;
  fullAddress: string;
  contact: string;
}

interface CreateRetailerResponse {
  createStores: {
    id: string;
    name: string;
    fullAddress: string;
    contact: string;
  }[];
}

const AddRetailerForm = () => {
  const navigate = useNavigate();
  const { manufacturer: manufacturerId } = useManufacturer();
  const [retailers, setRetailers] = useState<Retailer[]>([
    { name: "", fullAddress: "", contact: "" },
  ]);

  const [addRetailers, { loading }] = useMutation<
    CreateRetailerResponse,
    { createStoreInputs: (Retailer & { manufacturerId: string })[] }
  >(CREATE_RETAILER_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
    onError: (error) => {
      console.error(error);
      toast.error("There was an error creating the retailers.");
    },
  });

  const handleChange = (
    index: number,
    field: keyof Retailer,
    value: string
  ) => {
    const updatedRetailers = [...retailers];
    updatedRetailers[index][field] = value;
    setRetailers(updatedRetailers);
  };

  const addRetailerRow = () => {
    setRetailers([...retailers, { name: "", fullAddress: "", contact: "" }]);
  };

  const removeRetailerRow = (index: number) => {
    if (retailers.length === 1) return;
    const updatedRetailers = retailers.filter((_, i) => i !== index);
    setRetailers(updatedRetailers);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!manufacturerId) {
        console.error("Manufacturer ID not found in localStorage");
        toast.error("User ID not found. Please log in again.");
        return;
      }

      const createStoreInputs = retailers.map((retailer) => ({
        name: retailer.name,
        fullAddress: retailer.fullAddress,
        contact: retailer.contact,
        manufacturerId,
      }));

      const { data } = await addRetailers({
        variables: {
          createStoreInputs,
        },
      });

      console.log("Retailers added successfully:", data);
      toast.success("Retailers added successfully!");
      navigate("/dashboard/retailers");
    } catch (error) {
      console.error("Error adding retailers:", error);
      toast.error("There was an error adding retailers. Try again");
    }
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center mb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mr-4"
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-medium">Add Retailers</h1>
          <p className="text-sm text-gray-500">
            Enter details for one or more retailers
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-white">
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-6 font-medium text-gray-600">
                  Name
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">
                  Location
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">
                  Contact
                </th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {retailers.map((retailer, index) => (
                <tr key={index} className="bg-white border-b border-gray-50">
                  <td className="py-3 px-6">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pink-500"
                      placeholder="Retailer name"
                      value={retailer.name}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pink-500"
                      placeholder="Full address"
                      value={retailer.fullAddress}
                      onChange={(e) =>
                        handleChange(index, "fullAddress", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pink-500"
                      placeholder="Phone number"
                      value={retailer.contact}
                      onChange={(e) =>
                        handleChange(index, "contact", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td className="py-3 px-6">
                    {index === retailers.length - 1 ? (
                      <button
                        type="button"
                        onClick={addRetailerRow}
                        className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-500 text-white hover:bg-pink-600"
                        aria-label="Add retailer"
                      >
                        <Plus size={16} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeRetailerRow(index)}
                        className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600 hover:bg-gray-400"
                        disabled={retailers.length === 1}
                        aria-label="Remove retailer"
                      >
                        <Minus size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bottom-8 right-8 fixed">
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-md"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Retailers"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRetailerForm;
