/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import Product from "../types/product";
import { getItem } from "../utils/localStorage";

interface CartContextProps {
  addItem: (item: Product) => void;
  cartItems: Product[];
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  subtotal: number;
  setCartItems: Dispatch<SetStateAction<Product[]>>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>(() => {
  const cart = getItem("cart");
  return (cart as Product[]) || []; 
});

  const addItem = (newItem: Product) => {
    setCartItems((items) => {
      
      const existingItem = items.find((item) => item.id === newItem.id);
      if (existingItem) {
        return items.map((item) =>
          item.id === newItem.id
            ? { ...item, quantityBought: item.quantityBought + 1 }
            : item
        );
      } else {
        return [...items, { ...newItem, quantityBought: 1 }];
      }
    });
  };

  const increaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantityBought: item.quantityBought + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantityBought: Math.max(1, item.quantityBought - 1) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantityBought,
    0
  );

  return (
    <CartContext.Provider
      value={{
        addItem,
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        subtotal,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
