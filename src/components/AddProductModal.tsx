import { PlusIcon, UploadIcon, XIcon } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast, Toaster } from "sonner";
import axios from "axios";

interface ProductFormData {
  name: string;
  image: File | null;
  locations: string;
  description: string;
}

interface AddProductModalProps {
  onClose: () => void;
}

export function AddProductModal({ onClose }: AddProductModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    image: null,
    locations: "",
    description: "",
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, image, locations, description } = formData;
    if (!name || !locations || !description || !image) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("locations", locations);
    formDataToSend.append("description", description);
    formDataToSend.append("image", "image.com");
    formDataToSend.append("manufacturer_id", "cm4ip58kj0000oy6grpzkj8mg");
    formDataToSend.append("price", "50");

    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Product added successfully!");
      console.log("Response:", response.data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-3/4 max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <XIcon size={20} />
        </button>
        <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter product name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-40 mx-auto"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, image: null }));
                    }}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Remove image
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <UploadIcon className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-pink-600 hover:text-pink-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Store Locations
            </label>
            <input
              type="text"
              name="locations"
              value={formData.locations}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter store locations"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[100px]"
              placeholder="Describe your product"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <Toaster />
            <button
              type="submit"
              className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-500"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Account() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome to your account
        </h1>
        <p className="mt-1 text-gray-600">
          Manage your products and store details
        </p>
      </div>

      <div className="bg-bg-active rounded-lg p-6">
        <button
          className="w-full flex items-center justify-center space-x-2 py-4 px-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
          onClick={() => setShowModal(true)}
        >
          <PlusIcon size={20} />
          <span className="font-medium">Add Product</span>
        </button>
      </div>

      {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
