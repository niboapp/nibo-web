import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
// Import your main layout and route components
import Layout from "./components/Layout"; // The layout with the Outlet
import HomePage from "./pages/HomePage";
import Categories from "./pages/Categories";
import Account from "./pages/Account";
import Help from "./pages/Help";
import products from "./data/products";
import { SearchProvider } from "./context/SearchContext";
import { StoreDetails } from "./pages/StorePage";
import StoresPage from "./pages/StoresPage";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Product from "./pages/Product";
import { ProductDetails } from "./components/ProductDetails";
import ErrorPage from "./pages/ErrorPage";

// Define routes using createBrowserRouter

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout with Outlet for nested routes
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage products={products} /> },
      { path: "categories", element: <Categories products={products} /> },
      { path: "account", element: <Account /> },
      { path: "help", element: <Help /> },
    ],
  },
  { path: "cart", element: <Cart /> },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/productdetail/:id",
    element: <ProductDetails />,
  },
  {
    path: "/store/:storeName",
    element: <StoreDetails />,
  },
  {
    path: "stores",
    element: <StoresPage />,
  },
]);

// Render the RouterProvider
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
     <SearchProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </SearchProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
