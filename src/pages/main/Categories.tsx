import { Link } from "react-router-dom";
import { BottomNav } from "../../components/Layout";
import LeftArrow from "../../components/ui/LeftArrow";
import ShoppingCart from "../../components/ui/ShoppingCart";

// const getCategoryIcon = (category: string) => {
//   switch (category.toLowerCase()) {
//     case "health":
//       return <Package className="w-8 h-8 text-gray-600" />;
//     case "fashion":
//       return <Shirt className="w-8 h-8 text-gray-600" />;
//     case "electronics":
//       return <Tv className="w-8 h-8 text-gray-600" />;
//     default:
//       return <Package className="w-8 h-8 text-gray-600" />;
//   }
// };

export const Categories: React.FC = () => {
  // Extract unique categories from products
  // const categories = useMemo(() => {
  //   const uniqueCategories = new Set(
  //     products.map((product) => product.category)
  //   );
  //   return Array.from(uniqueCategories);
  // }, [products]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Link to="/" className="text-gray-600">
          <LeftArrow />
        </Link>
        <h1 className="flex-1 text-center text-lg font-medium mr-6">
          Verify Products
        </h1>
        <ShoppingCart />
      </div>

      {/* Categories Grid */}
      <div className="flex items-center justify-center flex-col gap-7 pt-5 px-3">
        <p>
          With this feature, you can confirm the authenticity of the product you
          purchased.
        </p>
        <p className="text-left w-full flex lg:justify-center justify-start">
          Feature to be released soon...
        </p>
      </div>
      {/*Bottom Nav*/}
      <BottomNav />
    </div>
  );
};

export default Categories;
