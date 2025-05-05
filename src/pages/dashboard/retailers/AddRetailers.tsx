import { useNavigate } from "react-router-dom";
import { ChevronLeft, Store, Plus } from "lucide-react";

const AddRetailer = () => {
  const navigate = useNavigate();

  const handleAddRetailer = () => {
    navigate("/dashboard/add-retailer");
  };

  const handleUploadCSV = () => {
    navigate("/dashboard/add-retailer-csv");
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-medium">Add Retailer</h1>
          <p className="text-sm text-gray-500">
            Upload your list of verified retailers
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-12 mt-6">
        <div className="w-24 h-24 mb-8 text-gray-200">
          <Store size={96} />
        </div>

        <p className="text-gray-500 mb-8">You are yet to add a retailer</p>

        <div className="flex gap-4">
          <button
            onClick={handleAddRetailer}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-6 rounded-md"
          >
            Add Retailer
          </button>

          <button
            onClick={handleUploadCSV}
            className="bg-white border border-pink-500 text-pink-500 hover:bg-pink-50 py-2 px-6 rounded-md flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Upload Retailers CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRetailer;
