import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useLazyQuery } from "@apollo/client";
import { REGISTER_BUSINESS } from "../../qraphql/mutations";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/dashboard/business/SuccessModal";
import { useManufacturer } from "../../context/ManufacturerContext";
import { toast } from "sonner";
import { SEARCH_ADDRESS } from "../../qraphql/queries";
import ImageUpload from "../../components/dashboard/ImageUpload";

interface BusinessFormData {
  businessName: string;
  brandStoreName: string;
  fullAddress: string;
  industry: string;
  productCategory: string[];
  brandImage: string;
}

const defaultValues: BusinessFormData = {
  businessName: "",
  brandStoreName: "",
  fullAddress: "",
  industry: "",
  productCategory: [],
  brandImage: "",
};

const categoryOptions = [
  { value: "foodBeverages", label: "Food & Beverages" },
  { value: "personalCare", label: "Personal Care & Hygiene" },
  { value: "household", label: "Household" },
  { value: "cleaningCare", label: "Cleaning & Care" },
  { value: "healthWellness", label: "Health & Wellness" },
  { value: "babyChildren", label: "Baby & Children" },
  { value: "petCare", label: "Pet Care" },
  { value: "confectioneryChocolates", label: "Confectionery & Chocolates" },
  { value: "tobaccoCigarettes", label: "Tobacco & Cigarettes" },
  { value: "alcoholicBeverages", label: "Alcoholic Beverages" },
  { value: "officeSchoolSupplies", label: "Office & School Supplies" },
  { value: "homeDecor", label: "Home Decor & Furnishing" },
  { value: "automotiveProducts", label: "Automotive Products" },
  { value: "sportingGoods", label: "Sporting Goods & Fitness" },
  { value: "beautyCosmetics", label: "Beauty & Cosmetics" },
  { value: "otcPharmaceuticals", label: "OTC Pharmaceuticals" },
];

const BusinessRegistrationForm: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<BusinessFormData>({
    defaultValues,
  });
  const navigate = useNavigate();
  const [ismodalOpen, setisModalOpen] = useState(false);
  const { saveManufacturer } = useManufacturer();
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
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
      },
      onError: () => {
        setAddressSuggestions([]);
      },
    }
  );

  const selectedCategories = watch("productCategory");

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);

    setValue("productCategory", updatedCategories);
  };

  const [registerBusiness, { loading, error }] = useMutation(
    REGISTER_BUSINESS,
    {
      onCompleted: (data) => {
        toast("Your business has been created successfully ");
        saveManufacturer(data?.createManufacturer?.id);
        setisModalOpen(true);
        reset(defaultValues);
      },
      onError: (error) => {
        console.error("Error registering business:", error);
      },
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    }
  );

  const onSubmit = (data: BusinessFormData) => {
    const id = localStorage.getItem("userId");
    registerBusiness({
      variables: {
        createManufacturerInput: { ...data, ownerId: id },
      },
    });
  };

  const handleCancel = () => {
    reset(defaultValues);
  };

  const industries = [
    { value: "", label: "Select your Industry" },
    { value: "BEAUTY_AND_COSMETICS", label: "Beauty and cosmetics" },
    { value: "CONSUMER_GOODS", label: "Consumer Good" },
    { value: "OTC_PHARMACEUTICALS", label: "OTC Pharmaceuticals" },
  ];

  const handleAddressSearch = (query: string) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    if (query.length < 3) {
      setShowSuggestions(false);
      return;
    }
    const timeout = setTimeout(() => {
      searchAddresses({ variables: { address: query } });
      setShowSuggestions(true);
    }, 300);
    setSearchTimeout(timeout);
  };

  const handleAddressSelect = (address: string) => {
    setValue("fullAddress", address);
    setShowSuggestions(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center mb-4">
        <button className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-medium">Add My Business</h1>
          <p className="text-sm text-gray-500">
            Create an account to start uploading products
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          Error submitting form. Please try again.
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 p-6 rounded-md shadow-sm"
      >
        <div className="mb-4">
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Business Name
          </label>
          <input
            {...register("businessName", {
              required: "Business name is required",
            })}
            id="businessName"
            placeholder="Enter Business Name"
            className={`w-full px-3 py-2 border ${
              errors.businessName ? "border-red-500" : "border-gray-200"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-bg-active`}
          />
          {errors.businessName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.businessName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <ImageUpload
            onUploadSuccess={(url) => {
              setValue("brandImage", url);
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="brandStoreName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Brand Store Name
          </label>
          <input
            {...register("brandStoreName", {
              required: "Brand store name is required",
            })}
            id="brandStoreName"
            placeholder="Enter Brand Name"
            className={`w-full px-3 py-2 border ${
              errors.brandStoreName ? "border-red-500" : "border-gray-200"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-bg-active`}
          />
          {errors.brandStoreName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.brandStoreName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location
          </label>
          <div className="relative">
            <input
              {...register("fullAddress", { required: "Location is required" })}
              id="location"
              placeholder="Your Location"
              className={`w-full px-3 py-2 border ${
                errors.fullAddress ? "border-red-500" : "border-gray-200"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-bg-active`}
              onChange={(e) => {
                handleAddressSearch(e.target.value);
                register("fullAddress").onChange(e);
              }}
              autoComplete="off"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              {searchLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-500"></div>
              ) : null}
            </div>
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto z-50">
                {addressSuggestions.length > 0
                  ? addressSuggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        type="button"
                        className="w-full text-left px-3 py-2 hover:bg-pink-100 transition-colors duration-150 flex items-start space-x-2"
                        onClick={() => handleAddressSelect(suggestion)}
                      >
                        <span className="text-sm text-gray-700 line-clamp-2">
                          {suggestion}
                        </span>
                      </button>
                    ))
                  : !searchLoading && (
                      <div className="px-3 py-2 text-sm text-gray-500 text-center">
                        No addresses found
                      </div>
                    )}
              </div>
            )}
          </div>
          {errors.fullAddress && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullAddress.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="industry"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Industry
          </label>
          <Controller
            name="industry"
            control={control}
            rules={{ required: "Please select an industry" }}
            render={({ field }) => (
              <select
                {...field}
                id="industry"
                className={`w-full px-3 py-2 border ${
                  errors.industry ? "border-red-500" : "border-gray-200"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-bg-active`}
              >
                {industries.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.industry && (
            <p className="text-red-500 text-xs mt-1">
              {errors.industry.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Category
          </label>
          <p className="text-xs text-gray-500 mb-2">(Select all that apply)</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2">
            {categoryOptions.map((category) => (
              <div key={category.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={category.value}
                  checked={selectedCategories.includes(category.value)}
                  onChange={(e) =>
                    handleCategoryChange(category.value, e.target.checked)
                  }
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor={category.value} className="text-sm">
                  {category.label}
                </label>
              </div>
            ))}
          </div>
          {errors.productCategory && (
            <p className="text-red-500 text-xs mt-1">
              {errors.productCategory.message}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-bg-active rounded-md"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Business"}
          </button>
        </div>
      </form>

      {/* Successful Business Registration Modal */}
      {ismodalOpen && (
        <SuccessModal
          onClose={() => navigate("/dashboard/myproducts")}
          onAddProduct={() => navigate("/dashboard/add-product")}
        />
      )}
    </div>
  );
};

export default BusinessRegistrationForm;
