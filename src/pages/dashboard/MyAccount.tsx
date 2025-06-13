import { useQuery } from "@apollo/client";
import { GET_MANUFACTURER, GET_RETAILERS } from "../../qraphql/queries";
import { useManufacturer } from "../../context/ManufacturerContext";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MyAccount() {
  const { manufacturer: manufacturerId } = useManufacturer();
  const { data, loading, error } = useQuery(GET_MANUFACTURER, {
    variables: { id: manufacturerId },
    skip: !manufacturerId,
  });
  const [copied, setCopied] = useState(false);

  // Fetch retailers for the manufacturer
  const {
    data: retailersData,
    loading: retailersLoading,
    error: retailersError,
  } = useQuery(GET_RETAILERS, {
    variables: { id: manufacturerId },
    skip: !manufacturerId,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading business info.
      </div>
    );
  }

  const business = data?.manufacturer;
  if (!business) {
    return <div className="text-center py-8">No business info found.</div>;
  }

  const businessUrl = `${window.location.origin}/${business.slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(businessUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Retailers logic
  const retailers = retailersData?.manufacturer?.stores || [];
  const showRetailers = retailers.slice(0, 3);
  const hasMoreRetailers = retailers.length > 3;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-bg-active">
          {/* Placeholder for business image */}
          {business.brandStoreName?.[0] || "B"}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {business.businessName}
          </h2>
          <p className="text-gray-500 text-sm">{business.brandStoreName}</p>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs text-gray-500 mb-1">Location</label>
        <div className="text-gray-800 font-medium">
          {business.location?.fullAddress || "-"}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs text-gray-500 mb-1">Industry</label>
        <div className="text-gray-800 font-medium">
          {business.industry || "-"}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs text-gray-500 mb-1">
          Product Category
        </label>
        <div className="flex flex-wrap gap-2">
          {(business.productCategory || []).map((cat: string) => (
            <span
              key={cat}
              className="px-3 py-1 rounded bg-pink-100 text-pink-600 text-xs font-semibold"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-xs text-gray-500 mb-1">Profile URL</label>
        <div className="flex gap-2 items-center">
          <input
            className="border border-gray-200 rounded px-3 py-2 flex-1 text-gray-700 bg-gray-50"
            value={businessUrl}
            readOnly
          />
          <button
            onClick={handleCopy}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded font-semibold text-sm"
          >
            {copied ? "Copied!" : "Copy Profile URL"}
          </button>
        </div>
      </div>

      {/* Retailers Section */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Retailers</h3>
        {retailersLoading ? (
          <div className="text-gray-500">Loading retailers...</div>
        ) : retailersError ? (
          <div className="text-red-500">Error loading retailers.</div>
        ) : showRetailers.length === 0 ? (
          <div className="text-gray-500">No retailers found.</div>
        ) : (
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Shop Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {showRetailers.map((store: any, idx: number) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-gray-900 font-medium">
                      {store.name}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {store.location?.fullAddress || "-"}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {store.contact || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {hasMoreRetailers && (
              <div className="text-right p-2">
                <Link
                  to="/dashboard/retailers"
                  className="text-pink-600 text-sm font-semibold hover:underline"
                >
                  Show more...
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
