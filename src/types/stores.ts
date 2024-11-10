
interface Store {
  productCount?: number;
  imageUrl?: string;
  name: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  sold: number;
  
  ratings?: number;
}

export default Store;
