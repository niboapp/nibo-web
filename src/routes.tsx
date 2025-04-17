import { createBrowserRouter } from "react-router-dom";
import "./index.css";
// import HomePage from "./pages/HomePage";
import Categories from "./pages/Categories";
import Help from "./pages/Help";
import products from "./data/products";
import { StoreDetails } from "./pages/StorePage";
import StoresPage from "./pages/StoresPage";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import { ProductDetails } from "./components/ProductDetails";
import ErrorPage from "./pages/ErrorPage";
import ProductList from "./pages/ProductList";
import LoginForm from "./pages/auth/LoginPage";
import Dashboard from "./pages/dashboard/Dashboard";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import MyProductsTable from "./pages/dashboard/products/MyProducts";
import AccountPage from "./pages/Account";
import Orders from "./pages/Orders";
import AddProductPage from "./pages/dashboard/products/AddProducts";
import AuthPage from "./pages/auth/Welcome";
import CreateAccount from "./pages/auth/SignUpPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerificationCode from "./pages/auth/VerificationCode";
import ResetPassword from "./pages/auth/ResetPassword";
import AddRetailers from "./pages/dashboard/retailers/AddRetailers";
import MyAccount from "./pages/dashboard/MyAccount";
import AddRetailerForm from "./pages/dashboard/retailers/AddRetailersForm";
import BusinessRegistrationForm from "./pages/dashboard/MyBusiness";
import AddRetailerCSV from "./pages/dashboard/retailers/AddRetailerCSV";

export const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Layout />,
  //
  // },
  { path: "/", element: <StoresPage />, errorElement: <ErrorPage /> },
  { path: "help", element: <Help /> },
  {
    path: "orders",
    element: <Orders />,
  },
  {
    path: "account",
    element: <AccountPage />,
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
  { path: "login", element: <AuthPage /> },
  { path: "signup", element: <CreateAccount /> },
  { path: "forgotpassword", element: <ForgotPassword /> },
  { path: "verify-otp", element: <VerificationCode /> },
  { path: "reset", element: <ResetPassword /> },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "main", element: <Dashboard /> },
      {
        path: "myproducts",
        element: <MyProductsTable />,
      },
      {
        path: "account",
        element: <MyAccount />,
      },
      {
        path: "retailers",
        element: <AddRetailers />,
      },
      {
        path: "add-retailer",
        element: <AddRetailerForm />,
      },
      {
        path: "addproducts",
        element: <AddProductPage />,
      },
      {
        path: "add-business",
        element: <BusinessRegistrationForm />,
      },
      {
        path: "add-retailer-csv",
        element: <AddRetailerCSV />,
      },
    ],
  },
  {
    path: "/categories/:category",
    element: <ProductList products={products} />,
  },
]);
