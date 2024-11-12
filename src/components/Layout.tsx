import { FaShoppingCart, FaSearch, FaHome, FaList, FaStore, FaUser, FaQuestionCircle } from 'react-icons/fa';
import { Outlet, NavLink } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

export default function Layout() {
  const {searchTerm, setSearchTerm} = useSearch()
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between p-4 bg-bg-primary text-gray-900">
        {/* Logo with active color for the "i" */}
        <div className="text-2xl font-bold">
          n<span className="text-bg-active">i</span>bo.
        </div>

        {/* Search Bar */}
        <div className="relative flex-grow mx-20">
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
          <NavLink to="/cart"><FaShoppingCart /></NavLink> 
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>

      {/* Bottom Navbar */}
      <BottomNav />
    </div>
  );
}


export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around bg-bg-primary text-gray-900 py-2">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "flex flex-col items-center text-bg-active" : "flex flex-col items-center hover:text-bg-active"}
        >
          <FaHome className="text-lg" />
          <span className="text-xs">Home</span>
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) => isActive ? "flex flex-col items-center text-bg-active" : "flex flex-col items-center hover:text-bg-active"}
        >
          <FaList className="text-lg" />
          <span className="text-xs">Categories</span>
        </NavLink>

        <NavLink
          to="/stores"
          className={({ isActive }) => isActive ? "flex flex-col items-center text-bg-active" : "flex flex-col items-center hover:text-bg-active"}
        >
          <FaStore className="text-lg" />
          <span className="text-xs">Stores</span>
        </NavLink>

        <NavLink
          to="/account"
          className={({ isActive }) => isActive ? "flex flex-col items-center text-bg-active" : "flex flex-col items-center hover:text-bg-active"}
        >
          <FaUser className="text-lg" />
          <span className="text-xs">Account</span>
        </NavLink>

        <NavLink
          to="/help"
          className={({ isActive }) => isActive ? "flex flex-col items-center text-bg-active" : "flex flex-col items-center hover:text-bg-active"}
        >
          <FaQuestionCircle className="text-lg" />
          <span className="text-xs">Help</span>
        </NavLink>
      </nav>
  )
}