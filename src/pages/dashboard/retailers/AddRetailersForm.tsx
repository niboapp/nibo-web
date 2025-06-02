import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Minus, Search, MapPin } from "lucide-react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_RETAILER_MUTATION } from "../../../qraphql/mutations";
import { toast } from "sonner";
import { useManufacturer } from "../../../context/ManufacturerContext";
import { GET_RETAILERS, SEARCH_ADDRESS } from "../../../qraphql/queries";

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

  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<{
    [key: number]: boolean;
  }>({});
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const suggestionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const [searchAddresses, { loading: searchLoading }] = useLazyQuery(
    SEARCH_ADDRESS,
    {
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
      onCompleted: (data) => {
        setAddressSuggestions(data?.searchAddress || []);
        console.log("Address suggestions:", addressSuggestions);
      },
      onError: (error) => {
        console.error(error);
        toast.error("There was an error searching for the address.");
        setAddressSuggestions([]);
      },
    }
  );

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
    refetchQueries: [
      {
        query: GET_RETAILERS,
        variables: {
          id: manufacturerId,
        },
      },
    ],
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = Object.keys(suggestionRefs.current).every(
        (key) => {
          const ref = suggestionRefs.current[parseInt(key)];
          return !ref || !ref.contains(event.target as Node);
        }
      );

      if (clickedOutside) {
        setShowSuggestions({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (
    index: number,
    field: keyof Retailer,
    value: string
  ) => {
    const updatedRetailers = [...retailers];
    updatedRetailers[index][field] = value;
    setRetailers(updatedRetailers);

    if (field === "fullAddress") {
      handleAddressSearch(value, index);
    }
  };

  const handleAddressSearch = (query: string, index: number) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (query.length < 3) {
      setShowSuggestions((prev) => ({ ...prev, [index]: false }));
      return;
    }

    const timeout = setTimeout(() => {
      searchAddresses({
        variables: {
          address: query,
        },
      });
      setShowSuggestions((prev) => ({ ...prev, [index]: true }));
    }, 300);

    setSearchTimeout(timeout);
  };

  const handleAddressSelect = (address: string, index: number) => {
    const updatedRetailers = [...retailers];
    updatedRetailers[index].fullAddress = address;
    setRetailers(updatedRetailers);
    setShowSuggestions((prev) => ({ ...prev, [index]: false }));
  };

  const addRetailerRow = () => {
    setRetailers([...retailers, { name: "", fullAddress: "", contact: "" }]);
  };

  const removeRetailerRow = (index: number) => {
    if (retailers.length === 1) return;
    const updatedRetailers = retailers.filter((_, i) => i !== index);
    setRetailers(updatedRetailers);

    setShowSuggestions((prev) => {
      const newState = { ...prev };
      delete newState[index];
      return newState;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!manufacturerId) {
        console.error("Manufacturer ID not found");
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
        <div className="bg-gray-50 rounded-lg">
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
                  <td className="py-3 px-6 relative">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full p-2 pr-8 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pink-500"
                        placeholder="Start typing to search address..."
                        value={retailer.fullAddress}
                        onChange={(e) =>
                          handleChange(index, "fullAddress", e.target.value)
                        }
                        onFocus={() => {
                          if (
                            retailer.fullAddress.length >= 3 &&
                            addressSuggestions.length > 0
                          ) {
                            setShowSuggestions((prev) => ({
                              ...prev,
                              [index]: true,
                            }));
                          }
                        }}
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        {searchLoading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-500"></div>
                        ) : (
                          <Search size={16} className="text-gray-400" />
                        )}
                      </div>

                      {showSuggestions[index] &&
                        addressSuggestions.length > 0 && (
                          <div
                            ref={(el) => (suggestionRefs.current[index] = el)}
                            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto z-50"
                          >
                            {addressSuggestions.map((suggestion, i) => (
                              <button
                                key={i}
                                type="button"
                                className="w-full text-left px-3 py-2 hover:bg-pink-100 transition-colors duration-150 flex items-start space-x-2"
                                onClick={() =>
                                  handleAddressSelect(suggestion, index)
                                }
                              >
                                <MapPin
                                  size={16}
                                  className="text-gray-400 mt-0.5 flex-shrink-0"
                                />
                                <span className="text-sm text-gray-700 line-clamp-2">
                                  {suggestion}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}

                      {showSuggestions[index] &&
                        addressSuggestions.length === 0 &&
                        !searchLoading &&
                        retailer.fullAddress.length >= 3 && (
                          <div
                            ref={(el) => (suggestionRefs.current[index] = el)}
                            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50"
                          >
                            <div className="px-3 py-2 text-sm text-gray-500 text-center">
                              No addresses found
                            </div>
                          </div>
                        )}
                    </div>
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

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 flex items-center"
          >
            {loading ? "Saving..." : "Save Retailers"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRetailerForm;
