import React from "react";
import { Check } from "lucide-react";

interface SuccessModalProps {
  onClose: () => void;
  onAddProduct: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  onClose,
  onAddProduct,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-xs w-full p-14 relative">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-gray-600"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Green success icon */}
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <div className="bg-green-500 rounded-full p-2">
              <Check size={24} color="white" />
            </div>
          </div>

          {/* Text content */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Congratulations!
          </h2>
          <p className="text-gray-600 mb-6">
            Your business has been added successfully.
          </p>

          {/* Buttons */}
          <button
            onClick={onAddProduct}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md mb-3"
          >
            Add Product
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-2 px-4 rounded-md"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
