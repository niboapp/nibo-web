import Store from "./stores";


interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    quantityAvailable: number;
    description: string;
    imageUrl: string;
    brand: string;
    store?: Store[];
    ratings: number;
    reviews: number;
    quantityBought: number;
  }

export default Product

