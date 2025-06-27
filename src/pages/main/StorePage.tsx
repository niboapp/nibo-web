import { NavLink, Link, useParams } from "react-router-dom";
import { ProductCard } from "../../components/ProductCard";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useSearch } from "../../context/SearchContext";
import { ShoppingBag, Search, ArrowLeft, Store } from "lucide-react";
import { useQuery } from "@apollo/client";
import Product from "../../types/product";
import { GET_STORE_PRODUCTS } from "../../qraphql/queries";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "sonner";

// EmptyStoreUI component for the "no products" scenario
const EmptyStoreUI: React.FC<{ storeName: string | undefined }> = ({
  storeName,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-4 py-8 text-gray-900">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="mb-4 flex justify-center">
          <div className="p-4 bg-gray-100 rounded-full">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            No Products Available
          </h2>
          <p className="text-gray-600">
            {storeName ? (
              <>
                <span className="font-medium">{storeName}</span> hasn't added
                any products yet
              </>
            ) : (
              "This store hasn't added any products yet"
            )}
          </p>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-3">What you can do:</h3>
          <ul className="space-y-3 text-left">
            <li className="flex items-center gap-2">
              <ArrowLeft size={16} className="text-gray-500 flex-shrink-0" />
              <span>
                Return to the{" "}
                <Link to="/" className="text-bg-active font-medium">
                  homepage
                </Link>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Search size={16} className="text-gray-500 flex-shrink-0" />
              <span>Search for other products</span>
            </li>
            <li className="flex items-center gap-2">
              <Store size={16} className="text-gray-500 flex-shrink-0" />
              <span>Explore other popular stores</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-bg-active text-bg-active font-medium rounded-md bg-white hover:bg-gray-50"
          >
            Back to Home
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 bg-bg-active text-white font-medium rounded-md hover:bg-pink-600"
          >
            Browse Popular Stores
          </Link>
        </div>
      </div>
    </div>
  );
};

export const StoreDetails: React.FC = () => {
  const { storeName } = useParams<{ storeName: string }>();
  const { searchTerm, setSearchTerm } = useSearch();
  const { data, loading, error } = useQuery(GET_STORE_PRODUCTS, {
    variables: {
      slug: {
        equals: storeName,
      },
    },
    skip: !storeName,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load store products");
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Store
          </h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!data?.products?.length) {
    return (
      <>
        <nav className="flex items-center justify-between p-4 bg-bg-primary text-gray-900">
          <div className="text-2xl font-bold">
            <Link to={"/"}>
              n<span className="text-bg-active">i</span>bo
              <span className="text-bg-active">.</span>
            </Link>
          </div>
          <div className="relative flex-grow mx-4 md:mx-10 lg:mx-20">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="w-full p-2 pl-4 rounded-md outline-none text-black"
            />
            <FaSearch className="absolute right-3 top-2 text-gray-900" />
          </div>
          <div className="text-2xl cursor-pointer">
            <NavLink to="/cart">
              <FaShoppingCart />
            </NavLink>
          </div>
        </nav>
        <EmptyStoreUI storeName={storeName} />
      </>
    );
  }

  const products = data.products;
  const storeNameDisplay = storeName || "Store";

  // ✅ Filter products based on searchTerm
  const filteredProducts = products.filter((product: Product) =>
    product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Top nav */}
      <nav className="flex items-center justify-between p-4 bg-bg-primary">
        <div className="text-2xl font-bold">
          <Link to="/">
            n<span className="text-bg-active">i</span>bo
            <span className="text-bg-active">.</span>
          </Link>
        </div>
        <div className="text-2xl cursor-pointer">
          <NavLink to="/cart">
            <FaShoppingCart />
          </NavLink>
        </div>
      </nav>

      {/* Store Info */}
      <div className="p-6 flex items-center justify-between border-b">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
            <img
              src={data?.products[0]?.product?.brandImage}
              alt={storeNameDisplay}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">{storeNameDisplay}</p>
            <p className="text-sm text-gray-500">Store</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">{products.length}</p>
          <p className="text-sm text-gray-500">Products</p>
        </div>
      </div>

      {/* Tab Section */}
      <div className="flex justify-start space-x-6 mt-4 px-6 border-b">
        <button className="pb-2 border-b-2 border-pink-500 text-pink-500 font-semibold">
          Products
        </button>
        <button className="pb-2 text-gray-500 font-semibold">Categories</button>
        <button className="pb-2 text-gray-500 font-semibold">Reviews</button>
      </div>

      {/* Search and Filtered Products */}
      <div className="px-4 mt-4">
        <div className="relative w-full mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="w-full p-2 pl-4 rounded-md border outline-none text-black"
          />
          <FaSearch className="absolute right-3 top-2.5 text-gray-600" />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
