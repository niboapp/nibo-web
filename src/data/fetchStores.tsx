import products from '../data/products.js';
import type Store from "../types/stores";

export const fetchStores = async (): Promise<Store[]> => {
  try {
    // Extract all stores from each product and flatten them into one array
    const allStores = products.flatMap(product => product.store ?? []);

    // Remove duplicate stores by creating unique keys based on store name and coordinates
    const uniqueStores = Array.from(
      new Map(
        allStores.map(store => [
          `${store.name}-${store.location?.latitude}-${store.location?.longitude}`,
          store,
        ])
      ).values()
    );

    return Promise.resolve(uniqueStores);
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};
