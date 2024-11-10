import React, { useState, useEffect } from "react";
import Store from "../types/stores";

interface MapComponentProps {
  userLocation: UserLocation;
  Stores: Store[];
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

const mapContainerStyle = {
  width: "100%",
  height: "551px",
};

const defaultCenter = {
  lat: 6.5244, // Lagos
  lng: 3.3792,
};

// Custom hook for loading Google Maps script
const useGoogleMaps = (apiKey: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker`;
    script.async = true;
    script.defer = true;

    script.addEventListener("load", () => {
      setIsLoaded(true);
    });

    script.addEventListener("error", () => {
      setError("Failed to load Google Maps");
    });

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  return { isLoaded, error };
};

const MapComponent: React.FC<MapComponentProps> = ({
  userLocation,
  Stores,
}) => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const apiKey = "AIzaSyAZ2JRiOMNzXpDqUI0jMmxKGqQzVBQO9YQ";

  const { isLoaded, error: mapsError } = useGoogleMaps(apiKey);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !document.getElementById("google-map")) return;

    const mapInstance = new google.maps.Map(
      document.getElementById("google-map") as HTMLElement,
      {
        zoom: 12,
        center:
          userLocation && userLocation.latitude && userLocation.longitude
            ? { lat: userLocation.latitude, lng: userLocation.longitude }
            : defaultCenter,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }
    );

    setMap(mapInstance);

    return () => {
      setMap(null);
    };
  }, [isLoaded, userLocation]);

  // Handle markers
  useEffect(() => {
    if (!map || !Stores || !Stores.length || !window.google) return;

    // Clear existing markers
    map.overlayMapTypes.clear();

    // Add user location marker if valid coordinates exist
    if (userLocation?.latitude && userLocation?.longitude) {
      new google.maps.Marker({
        position: {
          lat: userLocation.latitude,
          lng: userLocation.longitude,
        },
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      });
    }

    // Add store markers for stores with valid locations
    Stores.forEach((store) => {
      if (!store?.location?.latitude || !store?.location?.longitude) return;

      const marker = new google.maps.Marker({
        position: {
          lat: store.location.latitude,
          lng: store.location.longitude,
        },
        map,
        title: store.name || "Unnamed Store",
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="min-w-[200px]">
            <p class="font-medium text-sm">${store.name}</p>
            <p class="text-gray-600 text-xs">${calculateDistance(
              userLocation?.latitude || defaultCenter.lat,
              userLocation?.longitude || defaultCenter.lng,
              store.location.latitude,
              store.location.longitude
            )} away</p>
          </div>
        `,
      });

      marker.addListener("click", () => {
        setSelectedStore(store);
        infoWindow.open(map, marker);
        fetchDirections(store);
      });
    });
  }, [map, Stores, userLocation]);

  const fetchDirections = async (store: Store) => {
    if (
      !userLocation?.latitude ||
      !userLocation?.longitude ||
      !store?.location?.latitude ||
      !store?.location?.longitude ||
      !map ||
      !window.google
    )
      return;

    try {
      const directionsService = new google.maps.DirectionsService();
      const result = await directionsService.route({
        origin: {
          lat: userLocation.latitude,
          lng: userLocation.longitude,
        },
        destination: {
          lat: store.location.latitude,
          lng: store.location.longitude,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      });

      if (directionsRenderer) {
        directionsRenderer.setMap(null);
      }

      const newDirectionsRenderer = new google.maps.DirectionsRenderer({
        map,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#F606BA",
          strokeWeight: 4,
          strokeOpacity: 0.8,
        },
      });

      newDirectionsRenderer.setDirections(result);
      setDirectionsRenderer(newDirectionsRenderer);
    } catch (err) {
      console.error("Error fetching directions:", err);
      setDirectionsRenderer(null);
    }
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): string => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance < 1
      ? `${Math.round(distance * 1000)}m`
      : `${distance.toFixed(1)}km`;
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-[300px] bg-gray-50 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500" />
          <p className="mt-2 text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  if (mapsError) {
    return (
      <div className="w-full h-[300px] bg-gray-50 flex flex-col justify-center items-center p-4">
        <p className="text-red-500 text-sm">{mapsError}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div id="google-map" style={mapContainerStyle} />

      {/* Selected store info */}
      {selectedStore?.location && (
        <div className="absolute bottom-4 left-4 right-4 bg-white shadow-lg p-4">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="font-medium text-sm">
                {selectedStore.name || "Unnamed Store"}
              </h3>
              {userLocation?.latitude &&
                userLocation?.longitude &&
                selectedStore.location && (
                  <p className="text-xs text-gray-600">
                    {calculateDistance(
                      userLocation.latitude,
                      userLocation.longitude,
                      selectedStore.location.latitude,
                      selectedStore.location.longitude
                    )}
                  </p>
                )}
              {directionsRenderer?.getDirections()?.routes[0]?.legs[0]
                ?.duration && (
                <p className="text-xs text-gray-600">
                  {
                    directionsRenderer.getDirections()?.routes[0].legs[0]
                      .duration?.text
                  }{" "}
                  by car
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
