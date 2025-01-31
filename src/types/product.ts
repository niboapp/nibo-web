import Store from "./stores";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  batch_quantity: number;
  description: string;
  image_url: string;
  brand: string;
  store?: Store[];
  ratings: number;
  reviews: number;
  quantityBought: number;
}

export default Product;
