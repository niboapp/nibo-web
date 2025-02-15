/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./dashboard/ImageUpload";
import { CREATE_PRODUCT } from "../qraphql/mutations";

// Define the form schema with Zod
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
  category: z.enum(["Antibiotics", "Painkillers", "Supplements"]),
  batchNumber: z
    .string()
    .min(1, "Batch number is required")
    .transform((value) => parseInt(value)),
  batchQuantity: z
    .string()
    .min(1, "Batch quantity is required")
    .transform((value) => parseInt(value)),
  serialNumber: z
    .string()
    .min(1, "Serial number is required")
    .transform((value) => parseInt(value)),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AddProductPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "Antibiotics",
      batchNumber: 0,
      batchQuantity: 0,
      serialNumber: undefined,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (!imageFile) {
        toast.error("Please upload an image before submitting.");
        return;
      }

      // Ensure imageFile is a valid Cloudinary URL
      const imageUrl = imageFile.startsWith("https://res.cloudinary.com/")
        ? imageFile
        : toast.error("Invalid image URL");

      const response = await createProduct({
        variables: {
          createProductInput: {
            ...data,
            imageUrl,
            status: "AVAILABLE",
            manufacturerId: import.meta.env.VITE_MANUFACTURER_ID,
          },
        },
      });

      toast.success("Product added successfully!");
      navigate("/dashboard/myproducts");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="mt-1 text-gray-600">Fill in the product details below</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white rounded-lg p-6 shadow-sm"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            {...register("name")}
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
                  }}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <div className="space-y-2 flex items-center justify-center">
                <ImageUpload onUploadSuccess={setImageFile} />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              {...register("price")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              {...register("category")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="Antibiotics">Antibiotics</option>
              <option value="Painkillers">Painkillers</option>
              <option value="Supplements">Supplements</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Batch Number
            </label>
            <input
              type="number"
              {...register("batchNumber")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter batch number"
            />
            {errors.batchNumber && (
              <p className="text-red-500 text-sm">
                {errors.batchNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Batch Quantity
            </label>
            <input
              type="number"
              {...register("batchQuantity")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter batch quantity"
            />
            {errors.batchQuantity && (
              <p className="text-red-500 text-sm">
                {errors.batchQuantity.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Serial Number
            </label>
            <input
              type="number"
              {...register("serialNumber")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter serial number"
            />
            {errors.serialNumber && (
              <p className="text-red-500 text-sm">
                {errors.serialNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Description
          </label>
          <textarea
            {...register("description")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[100px]"
            placeholder="Describe your product"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <Toaster />
          <button
            type="submit"
            className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
