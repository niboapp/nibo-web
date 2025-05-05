import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../../components/dashboard/ImageUpload";
import { CREATE_PRODUCT } from "../../../qraphql/mutations";
import LeftArrow from "../../../components/ui/LeftArrow";

export default function AddProductPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [createProduct, { loading: isLoading }] = useMutation(CREATE_PRODUCT, {
    onCompleted: () => {
      toast.success("Your product has been added successfully");
      navigate("/dashboard/myproducts");
    },
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      imageUrl: "",
      description: "",
      retailPrice: "",
      quantity: 0,
      barCode: "",
      batchNumber: 0,
      manufactureDate: "",
      expiryDate: "",
      manufacturerId: "",
    },
  });

  const handleImageUploadSuccess = (imageUrl: string) => {
    setImageFile(imageUrl);
    setImagePreview(imageUrl);
    setValue("imageUrl", imageUrl);
  };

  const onSubmit = async (data: any) => {
    const id = localStorage.getItem("userId");
    try {
      if (!imageFile) {
        toast.error("Please upload an image before submitting.");
        return;
      }

      const productInput = {
        name: data.name,
        imageUrl: imageFile,
        description: data.description,
        retailPrice: data.retailPrice,
        quantity: data.quantity,
        barCode: data.barCode,
        batchNumber: data.batchNumber,
        manufactureDate: data.manufactureDate,
        expiryDate: data.expiryDate,
        manufacturerId: id,
      };

      await createProduct({
        variables: {
          createProductInput: productInput,
        },
      });
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(
        "Failed to add product. " +
          (error instanceof Error ? error.message : "")
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 flex items-center gap-6">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          <LeftArrow />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="mt-1 text-gray-600">
            Fill in the product details below
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-gray-50 rounded-lg p-6 shadow-md max-w-7xl"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            {...register("name", { required: "Product name is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
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
                    setImageFile(null);
                    setValue("imageUrl", "");
                  }}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <div className="space-y-2 flex items-center justify-center">
                <ImageUpload onUploadSuccess={handleImageUploadSuccess} />
              </div>
            )}
          </div>
          {errors.imageUrl && (
            <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter product description"
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Retail Price
          </label>
          <input
            {...register("retailPrice", {
              required: "Retail price is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter retail price"
          />
          {errors.retailPrice && (
            <p className="text-red-500 text-sm">{errors.retailPrice.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                min: {
                  value: 1,
                  message: "Quantity must be at least 1",
                },
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter quantity"
              min="1"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Barcode
            </label>
            <input
              {...register("barCode")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter barcode"
            />
            {errors.barCode && (
              <p className="text-red-500 text-sm">{errors.barCode.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Batch Number
          </label>
          <input
            type="number"
            {...register("batchNumber", {
              required: "Batch number is required",
              min: {
                value: 1,
                message: "Batch number must be at least 1",
              },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter batch number"
          />
          {errors.batchNumber && (
            <p className="text-red-500 text-sm">{errors.batchNumber.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Manufacture Date
            </label>
            <input
              type="datetime-local"
              {...register("manufactureDate")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.manufactureDate && (
              <p className="text-red-500 text-sm">
                {errors.manufactureDate.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="datetime-local"
              {...register("expiryDate")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm">
                {errors.expiryDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/myproducts")}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-500"
          >
            {isLoading ? "Loading..." : "Add Product"}
          </button>
        </div>
      </form>
      <Toaster position="top-right" />
    </div>
  );
}
