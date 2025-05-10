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
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import ManufacturerProvider from "./context/ManufacturerContext";
import { Toaster } from "sonner";

const httpLink = createHttpLink({
  uri:
    import.meta.env.VITE_BASE_API_URL ||
    "https://handsome-perception-production.up.railway.app/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <SearchProvider>
              <CartProvider>
                <ManufacturerProvider>
                  <Toaster position="top-right" />
                  <RouterProvider router={router} />
                </ManufacturerProvider>
              </CartProvider>
            </SearchProvider>
          </ModalProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </ApolloProvider>
  </React.StrictMode>
);
