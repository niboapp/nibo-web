import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  batchQuantity: z
    .string()
    .min(1, "Batch quantity is required")
    .regex(/^\d+$/, "Must be a number"),
  retailerName: z.string().min(1, "Retailer name is required"),
  retailerLocations: z.array(z.string().min(1, "Location is required")).min(1),
  image: z.string().includes(".com", {
    message: "An Image link for the product is required",
  }),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AddProduct() {
  const navigate = useNavigate();
  const [locations, setLocations] = React.useState([""]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      retailerLocations: [""],
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      await axios.post("http://localhost:3000/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added successfully");
      navigate("/dashboard/myproducts");
    } catch (error) {
      toast.error("Failed to add product");
      console.log(error);
    }
  };

  const addLocation = () => {
    setLocations([...locations, ""]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-1">Add Product</h1>
      <p className="text-sm text-gray-500 mb-6">
        Upload a product and the certified retailers where to find the product
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm mb-2">Product Name</label>
          <input
            {...register("name")}
            className="w-full p-2 border rounded-md"
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-2">Product Image</label>
          <div className="border-2 border-dashed rounded-md p-4"></div>
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">
              There was an error adding this image.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-2">Product Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded-md"
            placeholder="Enter product description"
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-2">Retail Price</label>
          <input
            {...register("price")}
            className="w-full p-2 border rounded-md"
            placeholder="Enter Price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-2">Batch Quantity</label>
          <input
            {...register("batchQuantity")}
            className="w-full p-2 border rounded-md"
            placeholder="Enter Quantity"
          />
          {errors.batchQuantity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.batchQuantity.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-2">Enter Retailer Name</label>
          <input
            {...register("retailerName")}
            className="w-full p-2 border rounded-md"
            placeholder="Enter Name"
          />
          {errors.retailerName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.retailerName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-2">Enter Retailer Location</label>
          {locations.map((_, index) => (
            <div key={index} className="mb-2">
              <input
                {...register(`retailerLocations.${index}`)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Address"
              />
              {errors.retailerLocations?.[index] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.retailerLocations[index]?.message}
                </p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addLocation}
            className="flex items-center text-pink-600 mt-2"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Add Another Retailer
          </button>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-pink-600 text-white rounded-md"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
