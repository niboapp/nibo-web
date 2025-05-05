import { useCart } from "../../context/CartContext";
import { ArrowLeft, ShoppingBag, Trash2, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { ProductCard } from "../../components/ProductCard";
import { setItem } from "../../utils/localStorage";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../qraphql/queries";
const CartPage = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    subtotal,
    removeItem,
  } = useCart();
  const navigate = useNavigate();
  const { data: products } = useQuery(GET_PRODUCTS);
  useEffect(() => {
    const item = cartItems;
    setItem("cart", item);
  }, [cartItems]);

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }
    navigate("/checkout");
  }, [cartItems.length, navigate]);

  if (!cartItems.length) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen p-4 flex flex-col items-center justify-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-4">Add items to start shopping</p>
        <button
          onClick={() => navigate("/")}
          className="bg-pink-500 text-white py-2 px-4 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button className="p-2" onClick={handleBackClick}>
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-medium">Shopping Cart</h1>
        <button className="p-2">
          <ShoppingBag className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4">
        <h2 className="text-lg mb-4">Cart</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item?.id} className="flex gap-4">
              <img
                src={item?.imageUrl}
                alt={item?.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <span className="text-sm text-gray-500">{item?.category}</span>
                <h3 className="font-medium">{item?.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.store && item.store[0]?.name}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-100 text-pink-500"
                  >
                    -
                  </button>
                  <span>{item.quantityBought}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-100 text-pink-500"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <div className="flex flex-col items-end">
                  <span className="font-medium">₦{item.price}</span>
                </div>
                <button
                  className="text-red-500"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6">
          <div className="flex justify-between mb-4">
            <span>Summary Subtotal</span>
            <span className="font-medium">₦{subtotal}</span>
          </div>
          <div className="flex gap-2">
            <button className="p-3 rounded-lg border">
              <MessageCircle className="w-5 h-5" />
            </button>
            <button
              className="flex-1 bg-pink-500 text-white py-3 px-4 rounded-lg font-medium"
              onClick={handleCheckout}
            >
              Checkout ₦{subtotal}
            </button>
          </div>
        </div>
      </div>

      {/* Retailed Products */}
      <div className="p-4 mt-4">
        <h2 className="text-lg mb-4">Retailed Products</h2>
        <div className="grid grid-cols-3 gap-4">
          {products
            .slice(0, 7)
            .filter((product: any) =>
              cartItems.some((item) => item.category === product.category)
            )
            .map((product: any) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
