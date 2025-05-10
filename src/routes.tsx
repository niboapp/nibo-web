import { createBrowserRouter } from "react-router-dom";
import "./index.css";
// import HomePage from "./pages/HomePage";
import Categories from "./pages/main/Categories";
import Help from "./pages/main/Help";
import { StoreDetails } from "./pages/main/StorePage";
import StoresPage from "./pages/main/StoresPage";
import Cart from "./pages/main/Cart";
import Product from "./pages/main/Product";
import { ProductDetails } from "./components/ProductDetails";
import ErrorPage from "./pages/ErrorPage";
import ProductList from "./pages/main/ProductList";
import LoginForm from "./pages/auth/LoginPage";
import Dashboard from "./pages/dashboard/Dashboard";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import MyProductsTable from "./pages/dashboard/products/MyProducts";
import AccountPage from "./pages/main/account/Account";
import Orders from "./pages/main/account/Orders";
import AddProductPage from "./pages/dashboard/products/AddProducts";
import AuthPage from "./pages/auth/Welcome";
import CreateAccount from "./pages/auth/SignUpPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerificationCode from "./pages/auth/VerificationCode";
import ResetPassword from "./pages/auth/ResetPassword";
import MyAccount from "./pages/dashboard/MyAccount";
import AddRetailerForm from "./pages/dashboard/retailers/AddRetailersForm";
import BusinessRegistrationForm from "./pages/dashboard/MyBusiness";
import AddRetailerCSV from "./pages/dashboard/retailers/AddRetailerCSV";
import ProtectedRoute from "./components/ProtectedRoute";
import RetailersList from "./pages/dashboard/retailers/RetailersList";

export const router = createBrowserRouter([
  // Public routes
  { path: "/", element: <StoresPage />, errorElement: <ErrorPage /> },
  { path: "help", element: <Help /> },
  { path: "cart", element: <Cart /> },
  { path: "categories", element: <Categories /> },
  { path: "stores", element: <StoresPage /> },
  { path: "/categories/:category", element: <ProductList /> },
  { path: "/product/:id", element: <Product /> },
  { path: "/productdetail/:id", element: <ProductDetails /> },
  { path: "/:storeName", element: <StoreDetails /> },

  // Auth routes
  { path: "auth", element: <AuthPage /> },
  { path: "login", element: <LoginForm /> },
  { path: "signup", element: <CreateAccount /> },
  { path: "forgotpassword", element: <ForgotPassword /> },
  { path: "verify-otp", element: <VerificationCode /> },
  { path: "reset", element: <ResetPassword /> },

  // Protected routes
  {
    path: "dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "main", element: <Dashboard /> },
          { path: "myproducts", element: <MyProductsTable /> },
          { path: "account", element: <MyAccount /> },
          { path: "retailers", element: <RetailersList /> },
          { path: "add-retailer", element: <AddRetailerForm /> },
          { path: "add-product", element: <AddProductPage /> },
          { path: "add-business", element: <BusinessRegistrationForm /> },
          { path: "add-retailer-csv", element: <AddRetailerCSV /> },
        ],
      },
    ],
  },

  // Protected account routes
  {
    path: "account",
    element: <ProtectedRoute />,
    children: [
      { path: "", element: <AccountPage /> },
      { path: "orders", element: <Orders /> },
    ],
  },
]);
