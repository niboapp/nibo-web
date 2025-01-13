import { NavLink, Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useSearch } from "../context/SearchContext";
import { Heart } from "lucide-react";
import Promo from "../assets/promo1.jpg";
import { gql, useQuery } from "@apollo/client";
import Product from "../types/product";
const STORE_FEED = gql`
  query Products($where: ProductWhereInput) {
    products(where: $where) {
      id
      name
      image_url
      category
      price
    }
  }
`;
export const StoreDetails: React.FC = () => {
  const { storeName } = useParams<{ storeName: string }>();
  console.log(storeName);
  const { searchTerm, setSearchTerm } = useSearch();
  const { data, loading } = useQuery(STORE_FEED);
  console.log(data);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
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

        {/* Cart Icon */}
        <div className="text-2xl cursor-pointer">
          <NavLink to="/cart">
            <FaShoppingCart />
          </NavLink>
        </div>
      </nav>
      {/* Store Information */}
      <div className="flex flex-col">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-800">4K</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">146</p>
              <p className="text-sm text-gray-500">Retailers</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">821</p>
            <p className="text-sm text-gray-500">Products</p>
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">4.8</p>
            <p className="text-sm text-gray-500">Rating</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="flex bg-bg-active px-3 py-2 rounded-md text-bg-primary gap-2">
            Follow store <Heart />
          </button>
        </div>
        <div className="w-full p-3 rounded-lg">
          <img
            src={Promo}
            className="w-full rounded-lg h-28 object-cover lg:h-60"
          />
        </div>
      </div>

      {/* Tab Section */}
      <div className="flex justify-around mt-4 border-b">
        <button className="pb-2 border-b-4 border-pink-500 text-pink-500 font-semibold">
          Products
        </button>
        <button className="pb-2 text-gray-500 font-semibold">Categories</button>
        <button className="pb-2 text-gray-500 font-semibold">Reviews</button>
      </div>

      {/* Store Products */}
      <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
