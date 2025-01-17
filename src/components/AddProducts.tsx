import React, { useState } from "react";
import { UploadIcon } from "lucide-react";
import { toast, Toaster } from "sonner";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

// Define the GraphQL mutation
const CREATE_PRODUCT = gql`
  mutation createProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      status
      price
      name
      id
      createdAt
      updatedAt
      description
      category
      image_url
      batch_no
      serial_no
      batch_quantity
      manufacturerId
    }
  }
`;

// Define the form schema with Zod
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z
    .string()
    .min(1, "Price is required")
    .transform((value) => parseFloat(value)),
  category: z.enum(["Antibiotics", "Painkillers", "Supplements"]),
  batch_no: z
    .string()
    .min(1, "Batch number is required")
    .transform((value) => parseInt(value)),
  batch_quantity: z
    .string()
    .min(1, "Batch quantity is required")
    .transform((value) => parseInt(value)),
  serial_no: z
    .string()
    .min(1, "Serial number is required")
    .transform((value) => parseInt(value)),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AddProductPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const navigate = useNavigate();
  console.log(imageFile);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "Antibiotics",
      batch_no: 0,
      batch_quantity: 0,
      serial_no: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      const image_url = "image.com"; // Placeholder URL
      console.log("Submitted");
      const response = await createProduct({
        variables: {
          createProductInput: {
            ...data,
            image_url,
            manufacturerId: "cm4ip58kj0000oy6grpzkj8mg",
            status: "AVAILABLE",
          },
        },
      });

      console.log(response);
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
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <UploadIcon className="h-10 w-10 text-gray-400" />
                </div>
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer rounded-md font-medium text-pink-600 hover:text-pink-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                </div>
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
              {...register("batch_no")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter batch number"
            />
            {errors.batch_no && (
              <p className="text-red-500 text-sm">{errors.batch_no.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Batch Quantity
            </label>
            <input
              type="number"
              {...register("batch_quantity")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter batch quantity"
            />
            {errors.batch_quantity && (
              <p className="text-red-500 text-sm">
                {errors.batch_quantity.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Serial Number
            </label>
            <input
              type="number"
              {...register("serial_no")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter serial number"
            />
            {errors.serial_no && (
              <p className="text-red-500 text-sm">{errors.serial_no.message}</p>
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
