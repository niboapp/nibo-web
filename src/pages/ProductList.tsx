import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import  Product  from '../types/product';
import { useSearch } from '../context/SearchContext';
import { ProductCard } from '../components/ProductCard';
import LeftArrow from '../components/ui/LeftArrow';
import ShoppingCart from '../components/ui/ShoppingCart';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { category } = useParams<{ category: string }>();
  const { searchTerm } = useSearch();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category ? 
        product.category.toLowerCase() === category.toLowerCase() : true;
      const matchesSearch = searchTerm ? 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) 
        : true;

      return matchesCategory && matchesSearch;
    });
  }, [products, category, searchTerm]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="sticky top-0 flex items-center px-4 py-3 bg-white border-b z-50">
        <Link to="/categories" className="text-gray-600">
          <LeftArrow  />
        </Link>
        <h1 className="flex-1 text-center text-lg font-medium mr-6">
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Products'}
        </h1>
        <ShoppingCart />
      </header>

      {/* Product Grid */}
      <main className="flex-1 p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredProducts.map((product) => (
            <ProductCard product={product}/>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
            <p className="text-center">No products found in this category.</p>
          </div>
        )}
      </main>

    </div>
  );
};


export default ProductList;