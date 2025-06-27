import React, { useState, useEffect, useRef, useCallback } from "react";
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

const MAP_OPTIONS: google.maps.MapOptions = {
  zoom: 12,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  gestureHandling: "greedy",
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

// Custom store icon using modern approach
const createStoreIcon = (): google.maps.Icon => ({
  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#F606BA"/>
      <path d="M8 12V20C8 21.1 8.9 22 10 22H22C23.1 22 24 21.1 24 20V12L16 8L8 12Z" fill="white"/>
      <path d="M12 16H20V18H12V16Z" fill="#F606BA"/>
      <path d="M12 19H18V21H12V19Z" fill="#F606BA"/>
    </svg>
  `)}`,
  scaledSize: new google.maps.Size(32, 32),
  anchor: new google.maps.Point(16, 16),
});

// User location icon
const createUserLocationIcon = (): google.maps.Symbol => ({
  path: google.maps.SymbolPath.CIRCLE,
  scale: 8,
  fillColor: "#4285F4",
  fillOpacity: 1,
  strokeColor: "#ffffff",
  strokeWeight: 3,
});

// Custom hook for loading Google Maps script
const useGoogleMaps = (apiKey: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com"]'
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => setIsLoaded(true));
      existingScript.addEventListener("error", () =>
        setError("Failed to load Google Maps")
      );
      return;
    }

    // Create and load the script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    const handleLoad = () => {
      setIsLoaded(true);
    };

    const handleError = () => {
      setError("Failed to load Google Maps");
    };

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);
      // Note: We don't remove the script as it might be used by other components
    };
  }, [apiKey]);

  return { isLoaded, error };
};

const MapComponent: React.FC<MapComponentProps> = ({
  userLocation,
  Stores,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowsRef = useRef<google.maps.InfoWindow[]>([]);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
    null
  );
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(
    null
  );

  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const { isLoaded, error: mapsError } = useGoogleMaps(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
  );

  // Calculate distance between two points
  const calculateDistance = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number): string => {
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
    },
    []
  );

  // Clear all markers and info windows
  const clearMapElements = useCallback(() => {
    // Clear markers
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current = [];

    // Clear info windows
    infoWindowsRef.current.forEach((infoWindow) => {
      infoWindow.close();
    });
    infoWindowsRef.current = [];

    // Clear directions
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }
  }, []);

  // Fetch and display directions
  const fetchDirections = useCallback(
    async (store: Store) => {
      if (
        !userLocation?.latitude ||
        !userLocation?.longitude ||
        !store?.location?.latitude ||
        !store?.location?.longitude ||
        !mapInstanceRef.current
      )
        return;

      try {
        // Initialize DirectionsService if not already done
        if (!directionsServiceRef.current) {
          directionsServiceRef.current = new google.maps.DirectionsService();
        }

        const request: google.maps.DirectionsRequest = {
          origin: {
            lat: userLocation.latitude,
            lng: userLocation.longitude,
          },
          destination: {
            lat: store.location.latitude,
            lng: store.location.longitude,
          },
          travelMode: google.maps.TravelMode.DRIVING,
          avoidHighways: false,
          avoidTolls: false,
        };

        directionsServiceRef.current.route(request, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            // Clear any existing directions
            if (directionsRendererRef.current) {
              directionsRendererRef.current.setMap(null);
            }

            // Create new directions renderer
            directionsRendererRef.current = new google.maps.DirectionsRenderer({
              map: mapInstanceRef.current,
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "#F606BA",
                strokeWeight: 4,
                strokeOpacity: 0.8,
              },
            });

            directionsRendererRef.current.setDirections(result);
          } else {
            console.error("Directions request failed:", status);
          }
        });
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    },
    [userLocation]
  );

  // Handle store marker click
  const handleStoreClick = useCallback(
    (
      store: Store,
      marker: google.maps.Marker,
      infoWindow: google.maps.InfoWindow
    ) => {
      // Close all other info windows
      infoWindowsRef.current.forEach((window) => window.close());

      // Clear previous directions
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
        directionsRendererRef.current = null;
      }

      setSelectedStore(store);
      infoWindow.open(mapInstanceRef.current, marker);
      fetchDirections(store);
    },
    [fetchDirections]
  );

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    const center =
      userLocation?.latitude && userLocation?.longitude
        ? { lat: userLocation.latitude, lng: userLocation.longitude }
        : defaultCenter;

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      ...MAP_OPTIONS,
      center,
    });

    setIsMapReady(true);

    return () => {
      clearMapElements();
      mapInstanceRef.current = null;
      setIsMapReady(false);
    };
  }, [isLoaded, clearMapElements]);

  // Handle markers and store data
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !Stores?.length) return;

    clearMapElements();

    // Add user location marker
    if (userLocation?.latitude && userLocation?.longitude) {
      const userMarker = new google.maps.Marker({
        position: {
          lat: userLocation.latitude,
          lng: userLocation.longitude,
        },
        map: mapInstanceRef.current,
        icon: createUserLocationIcon(),
        title: "Your Location",
        zIndex: 1000, // Ensure user marker is on top
      });
      markersRef.current.push(userMarker);
    }

    // Add store markers
    Stores.forEach((store) => {
      if (!store?.location?.latitude || !store?.location?.longitude) return;

      const marker = new google.maps.Marker({
        position: {
          lat: store.location.latitude,
          lng: store.location.longitude,
        },
        map: mapInstanceRef.current,
        icon: createStoreIcon(),
        title: `Store ${store.name}`,
        animation: google.maps.Animation.DROP,
      });

      const infoWindowContent = `
        <div style="min-width: 250px; padding: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <div style="width: 24px; height: 24px; background-color: #F606BA; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4.5V7.5C2 7.78 2.22 8 2.5 8H9.5C9.78 8 10 7.78 10 7.5V4.5L6 3L2 4.5Z" fill="white"/>
              </svg>
            </div>
            <h3 style="font-weight: 600; font-size: 14px; color: #1f2937; margin: 0;">Store ${
              store.name
            }</h3>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin: 4px 0;">
            <strong>Distance:</strong> ${calculateDistance(
              userLocation?.latitude || defaultCenter.lat,
              userLocation?.longitude || defaultCenter.lng,
              store.location.latitude,
              store.location.longitude
            )}
          </p>
          <p style="color: #6b7280; font-size: 12px; margin: 4px 0;">
            <strong>Location:</strong> ${store.location.fullAddress}
          </p>
        </div>
      `;

      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
      });

      // Add click listener
      marker.addListener("click", () => {
        handleStoreClick(store, marker, infoWindow);
      });

      markersRef.current.push(marker);
      infoWindowsRef.current.push(infoWindow);
    });

    // Fit bounds to show all markers
    if (markersRef.current.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      markersRef.current.forEach((marker) => {
        const position = marker.getPosition();
        if (position) bounds.extend(position);
      });
      mapInstanceRef.current.fitBounds(bounds);

      // Set maximum zoom to avoid over-zooming
      const listener = google.maps.event.addListener(
        mapInstanceRef.current,
        "idle",
        () => {
          const zoom = mapInstanceRef.current?.getZoom();
          if (zoom && zoom > 15) {
            mapInstanceRef.current?.setZoom(15);
          }
          google.maps.event.removeListener(listener);
        }
      );
    }

    return clearMapElements;
  }, [
    isMapReady,
    Stores,
    userLocation,
    calculateDistance,
    handleStoreClick,
    clearMapElements,
  ]);

  // Handle selected store cleanup
  const handleCloseSelectedStore = useCallback(() => {
    setSelectedStore(null);
    infoWindowsRef.current.forEach((window) => window.close());
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }
  }, []);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="w-full h-[551px] bg-gray-50 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500" />
          <p className="mt-2 text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (mapsError) {
    return (
      <div className="w-full h-[551px] bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <p className="mt-2 text-sm text-red-600">{mapsError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 text-sm transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div ref={mapRef} style={mapContainerStyle} />

      {/* Selected store info panel */}
      {selectedStore && (
        <div className="absolute bottom-4 left-4 right-4 bg-white shadow-lg rounded-lg p-4 border border-gray-200 max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 7.5V12.5C5 13.33 5.67 14 6.5 14H13.5C14.33 14 15 13.33 15 12.5V7.5L10 5L5 7.5Z"
                  fill="white"
                />
                <path d="M7.5 10H12.5V11.25H7.5V10Z" fill="#F606BA" />
                <path d="M7.5 11.875H11.25V13.125H7.5V11.875Z" fill="#F606BA" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-gray-800 truncate">
                Store {selectedStore.name}
              </h3>
              {userLocation?.latitude && userLocation?.longitude && (
                <p className="text-xs text-gray-600">
                  {calculateDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    selectedStore.location.latitude,
                    selectedStore.location.longitude
                  )}{" "}
                  away
                </p>
              )}
              {directionsRendererRef.current?.getDirections()?.routes[0]
                ?.legs[0]?.duration && (
                <p className="text-xs text-gray-600">
                  {
                    directionsRendererRef.current.getDirections()?.routes[0]
                      .legs[0].duration?.text
                  }{" "}
                  by car
                </p>
              )}
            </div>
            <button
              onClick={handleCloseSelectedStore}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
