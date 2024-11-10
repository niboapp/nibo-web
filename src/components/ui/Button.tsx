import React from 'react';

interface ButtonProps {
  variant?: "link",
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function Button({variant, onClick, children, className = '', disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 font-semibold ${variant === "link" ? "bg-white text-bg-active" : "text-white bg-bg-active"} rounded-md  hover:bg-pink-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
