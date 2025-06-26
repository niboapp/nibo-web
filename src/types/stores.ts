interface Store {
  name: string | undefined;
  id: string;
  location: {
    latitude: number;
    longitude: number;
    fullAddress: string;
  };
}
export default Store;
