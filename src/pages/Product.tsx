/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Store from "../types/stores";
import MapComponent, { UserLocation } from "../components/MapComponent";
import { Link, useParams } from "react-router-dom";
import Button from "../components/ui/Button";

const GET_LOCATIONS = gql`
  query Locations {
    locations {
      latitude
      longitude
      id
      city
    }
  }
`;

const GET_PRODUCT = gql`
  query Query($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      name
      image_url
      category
      createdAt
      batch_quantity
    }
  }
`;

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [stores, setStores] = useState<Store[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation>({
    latitude: 0,
    longitude: 0,
  });

  // Fetch locations
  const {
    data: locationsData,
    loading: locationsLoading,
    error: locationsError,
  } = useQuery(GET_LOCATIONS);

  // Fetch product
  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useQuery(GET_PRODUCT, {
    variables: {
      where: { id },
    },
    skip: !id,
  });

  // Update stores when locations data is fetched
  useEffect(() => {
    if (locationsData?.locations) {
      const storeLocations = locationsData.locations.map((location: any) => ({
        id: location.id,
        name: `Store ${location.id}`,
        latitude: location.latitude,
        longitude: location.longitude,
        city: location.city,
      }));
      setStores(storeLocations.slice(0, 3));
    }
  }, [locationsData]);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  if (locationsLoading || productLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">Loading...</div>
    );
  }

  if (locationsError) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Error loading locations: {locationsError.message}
      </div>
    );
  }

  if (productError) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Error loading product: {productError.message}
      </div>
    );
  }

  const product = productData?.product;

  if (!product) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="px-4 h-14 py-4 flex items-center justify-between border-b">
        <Link to="/" className="text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <h1 className="text-base font-medium">Products</h1>
        <button className="text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        {stores.length > 0 && (
          <div className="flex-1">
            <MapComponent userLocation={userLocation} Stores={stores} />
          </div>
        )}

        <div className="bg-white px-4 py-3">
          <div className="flex gap-3">
            <div className="w-[104px] h-[104px] flex-shrink-0 rounded-lg overflow-hidden">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-sm text-gray-500">
                Batch Quantity: {product.batch_quantity}
              </p>
              <p className="text-sm text-gray-500">
                Created: {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-1 pl-32">
            <Link to={`/productdetail/${id}`}>
              <Button className="w-3/4 bg-bg-active text-white h-12 rounded-md hover:bg-pink-600">
                Buy Online
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
