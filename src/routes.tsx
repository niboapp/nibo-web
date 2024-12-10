import { createBrowserRouter } from "react-router-dom";
import "./index.css";
// Import your main layout and route components
import Layout from "./components/Layout"; // The layout with the Outlet
import HomePage from "./pages/HomePage";
import Categories from "./pages/Categories";
import Account from "./pages/Account";
import Help from "./pages/Help";
import products from "./data/products";
import { StoreDetails } from "./pages/StorePage";
import StoresPage from "./pages/StoresPage";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import { ProductDetails } from "./components/ProductDetails";
import ErrorPage from "./pages/ErrorPage";
import ProductList from "./pages/ProductList";
import LoginForm from "./pages/LoginPage";
import Dashboard from "./pages/dashboard/Dashboard";
import { DashboardLayout } from "./components/DashboardLayout";
import MyProductsTable from "./pages/dashboard/MyProducts";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Layout with Outlet for nested routes
      errorElement: <ErrorPage />,
      children: [
        { path: "", element: <HomePage products={products} /> },
        { path: "account", element: <Account /> },
        { path: "help", element: <Help /> },
      ],
    },
    { path: "cart", element: <Cart /> },
    {
      path: "/product/:id",
      element: <Product />,
    },
    { path: "categories", element: <Categories /> },
    {
      path: "/productdetail/:id",
      element: <ProductDetails />,
    },
    {
      path: "/:storeName",
      element: <StoreDetails />,
    },
    { path: "stores", element: <StoresPage /> },
    { path: "login", element: <LoginForm /> },
    { path: "dashboard", element: <DashboardLayout />, children:[
      {path: "", element: <Dashboard />},
      {path: "myproducts", element: <MyProductsTable />},
    ] },
    {
      path: "/categories/:category",
      element: <ProductList products={products} />,
    },
  ]);