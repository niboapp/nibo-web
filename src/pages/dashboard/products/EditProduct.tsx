import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "../../../components/dashboard/ImageUpload";
import { UPDATE_PRODUCT } from "../../../qraphql/mutations";
import { GET_PRODUCT } from "../../../qraphql/queries";
import LeftArrow from "../../../components/ui/LeftArrow";
import { useManufacturer } from "../../../context/ManufacturerContext";
import { GET_PRODUCTS } from "../../../qraphql/queries";

interface ProductFormData {
  name: string;
  imageUrl: string;
  description: string;
  retailPrice: string;
  quantity: number;
  barCode: string;
  batchNumber: number;
  manufactureDate: string;
  expiryDate: string;
  manufacturerId: string;
}

export default function EditProductPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const navigate = useNavigate();
  const { productId } = useParams();
  const { manufacturer: manufacturerId } = useManufacturer();

  const { data: productData, loading: loadingProduct } = useQuery(GET_PRODUCT, {
    variables: {
      where: { id: productId },
    },
    skip: !productId,
  });

  const [updateProduct, { loading: isLoading }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      toast.success("Product updated successfully");
      navigate("/dashboard/myproducts");
    },
    onError: (error) => {
      toast.error(
        "Failed to update product. " +
          (error instanceof Error ? error.message : "")
      );
    },
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
    refetchQueries: [
      {
        query: GET_PRODUCTS,
        variables: {
          manufacturerId: {
            equals: manufacturerId,
          },
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProductFormData>();

  useEffect(() => {
    if (productData?.product) {
      const product = productData.product;
      reset({
        name: product.name,
        imageUrl: product.imageUrl,
        description: product.description,
        retailPrice: product.retailPrice,
        quantity: product.quantity,
        barCode: product.barCode,
        batchNumber: product.batchNumber,
        manufactureDate: product.manufactureDate?.split("T")[0],
        expiryDate: product.expiryDate?.split("T")[0],
        manufacturerId: product.manufacturerId,
      });
      setImagePreview(product.imageUrl);
      setImageFile(product.imageUrl);
    }
  }, [productData, reset]);

  const handleImageUploadSuccess = (imageUrl: string) => {
    setImageFile(imageUrl);
    setImagePreview(imageUrl);
    setValue("imageUrl", imageUrl);
  };

  const formatDateToISO = (dateString: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toISOString();
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (!imageFile) {
        toast.error("Please upload an image before submitting.");
        return;
      }

      const productInput = {
        id: productId,
        name: data.name,
        imageUrl: imageFile,
        description: data.description,
        retailPrice: data.retailPrice,
        quantity: data.quantity,
        barCode: data.barCode,
        batchNumber: data.batchNumber,
        manufactureDate: formatDateToISO(data.manufactureDate),
        expiryDate: formatDateToISO(data.expiryDate),
        manufacturerId: manufacturerId,
      };

      await updateProduct({
        variables: {
          updateProductInput: productInput,
        },
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loadingProduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <p className="mt-1 text-gray-600">Update the product details below</p>
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
              Batch Number
            </label>
            <input
              type="number"
              {...register("batchNumber", {
                required: "Batch number is required",
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter batch number"
            />
            {errors.batchNumber && (
              <p className="text-red-500 text-sm">
                {errors.batchNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Manufacture Date
            </label>
            <input
              type="date"
              {...register("manufactureDate", {
                required: "Manufacture date is required",
              })}
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
              type="date"
              {...register("expiryDate", {
                required: "Expiry date is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm">
                {errors.expiryDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Barcode
          </label>
          <input
            {...register("barCode", {
              required: "Barcode is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter barcode"
          />
          {errors.barCode && (
            <p className="text-red-500 text-sm">{errors.barCode.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-white bg-pink-500 rounded-md hover:bg-pink-600 disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
