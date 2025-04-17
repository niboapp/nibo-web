import Store from "./stores";

interface Product {
  retailPrice: string;
  id: string;
  name: string;
  price: number;
  category: string;
  batchQuantity: number;
  description: string;
  imageUrl: string;
  brand: string;
  store?: Store[];
  quantity: number;
  quantityBought: number;
  barcode: string;
  batchNumber: number;
}

export default Product;
