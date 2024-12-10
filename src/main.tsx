import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./components/ErrorBoundary";
import { ModalProvider } from "./context/ModalContext";
import { router } from "./routes";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <SearchProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </SearchProvider>
        </ModalProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
