import { useState, useMemo } from "react";
import { ProductCard } from "../components/ProductCard";
import Product from "../types/product";
import Button from "../components/ui/Button";
import { useSearch } from "../context/SearchContext";

interface CategoriesPageProps {
    products: Product[];
  }
  
  export const Categories: React.FC<CategoriesPageProps> = ({ products }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
    const {searchTerm} = useSearch()
    // Extract unique categories from products
    const categories = useMemo(() => {
      const uniqueCategories = new Set(products.map(product => product.category));
      return Array.from(uniqueCategories);
    }, [products]);
  
    // Filter products based on category and search query
    const filteredProducts = useMemo(() => {
      return products.filter((product) => {
        const matchesCategory = 
          selectedCategory === 'all' || 
          product.category === selectedCategory;
        
        const matchesSearch = 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());
  
        return matchesCategory && matchesSearch;
      });
    }, [products, selectedCategory, searchTerm]);
  
    const handleViewDetails = (productId: string) => {
      // Handle navigation or modal open
      console.log(`Viewing product: ${productId}`);
    };
  
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Category Filter and Search */}
        <div className="mb-8 space-y-4 md:flex md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-wrap gap-2">
            <Button
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                selectedCategory === 'all'
                  && 'bg-bg-primary text-pink-500'
                  
              }`}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                className={`rounded-md px-4 py-2 text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-bg-primary text-pink-500'
                    : ' hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
  
        {/* Products Grid */}
        <div className=" grid grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
  
        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <div className="mt-8 text-center text-gray-500">
            No products found matching your criteria.
          </div>
        )}
      </div>
    );
  };

  export default Categories