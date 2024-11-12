import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Package, Shirt, Tv } from 'lucide-react';
import  Product  from '../types/product';
import { BottomNav } from '../components/Layout';
import LeftArrow from '../components/ui/LeftArrow';
import ShoppingCart from '../components/ui/ShoppingCart';

interface CategoriesPageProps {
  products: Product[];
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'health':
      return <Package className="w-8 h-8 text-gray-600" />;
    case 'fashion':
      return <Shirt className="w-8 h-8 text-gray-600" />;
    case 'electronics':
      return <Tv className="w-8 h-8 text-gray-600" />;
    default:
      return <Package className="w-8 h-8 text-gray-600" />;
  }
};

export const Categories: React.FC<CategoriesPageProps> = ({ products }) => {
  // Extract unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(product => product.category));
    return Array.from(uniqueCategories);
  }, [products]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Link to="/" className="text-gray-600">
          <LeftArrow />
        </Link>
        <h1 className="flex-1 text-center text-lg font-medium mr-6">Categories</h1>
        <ShoppingCart />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/categories/${category.toLowerCase()}`}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm"
          >
            <div className="mb-2">{getCategoryIcon(category)}</div>
            <span className="text-sm text-gray-700">{category}</span>
          </Link>
        ))}
      </div>
      {/*Bottom Nav*/}
      <BottomNav />
    </div>
  );
};

export default Categories;
