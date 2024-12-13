import React from "react";
import {
  FaEnvelope,
  FaShoppingBag,
  FaStar,
  FaCommentDots,
  FaWallet,
  FaMapMarkerAlt,
  FaLock,
} from "react-icons/fa";
import { BottomNav } from "../components/Layout";
import { Link } from "react-router-dom";
import ShoppingCart from "../components/ui/ShoppingCart";

const AccountPage = () => {
  const menuItems = [
    { icon: <FaEnvelope />, label: "Messages", link: "/messages" },
    { icon: <FaShoppingBag />, label: "Orders", link: "/orders" },
    { icon: <FaStar />, label: "Reviews", link: "/reviews" },
    {
      icon: <FaCommentDots />,
      label: "Surveys & Feedback",
      link: "/surveys-feedback",
    },
    { icon: <FaWallet />, label: "Credit Balance", link: "/credit-balance" },
    { icon: <FaMapMarkerAlt />, label: "Addresses", link: "/addresses" },
    { icon: <FaLock />, label: "Change Password", link: "/change-password" },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b-2">
        <Link to="/" className="text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <h1 className="text-lg font-semibold text-gray-800">My Account</h1>
        <button className="text-gray-600 text-xl">
          <span>Log Out</span>
        </button>
        <ShoppingCart />
      </header>

      {/* Menu Items */}
      <div className="mt-2">
        {menuItems.map((item, index) => (
          <a
            href={item.link}
            key={index}
            className="flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 border-b border-gray-200"
          >
            <div className="flex items-center space-x-4 py-6">
              <div className="text-gray-600 text-xl">{item.icon}</div>
              <span className="text-gray-800">{item.label}</span>
            </div>
            <div className="text-gray-400">{">"}</div>
          </a>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default AccountPage;
