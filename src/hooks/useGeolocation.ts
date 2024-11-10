import { useQuery } from '@tanstack/react-query';

export const getLocation = async (): Promise<GeolocationPosition | null> => {
  const isBrowser: boolean = ((): boolean => typeof window !== "undefined")();

  if (!isBrowser)
    return null;

  return new Promise((resolve, reject) => {
    if (!isBrowser) {
      reject(new Error("Browser not supported"));
    }

    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
    }

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const useGeolocation = () => {
  const geolocation = useQuery({
    queryKey: ["geolocation"],
    queryFn: getLocation});

  return geolocation;
}
