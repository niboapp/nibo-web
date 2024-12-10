import { ProductCard } from "../components/ProductCard";
import  Button  from "../components/ui/Button";
import { useSearch } from "../context/SearchContext";
import Product from "../types/product";
import Brand1 from "../assets/brand1.png";
import Brand2 from "../assets/brand2.jpg";
import Brand3 from "../assets/brand3.jpg";
import Brand4 from "../assets/brand4.png";
import Brand5 from "../assets/brand5.png";
import Brand6 from "../assets/brand6.png";
import Promo1 from "../assets/promo1.jpg";
import Promo2 from "../assets/promo2.jpg";
import Promo3 from "../assets/promo3.jpg";
import Image from "../components/ui/Image";

interface Brand {
  src: string;
  alt: string;
}


const healthBrands: Brand[] = [
  { src: Brand1, alt: "Niropharm" },
  { src: Brand2, alt: "Osworth" },
  { src: Brand3, alt: "Emzor" },
];

const foodBrands: Brand[] = [
  { src: Brand4, alt: "Honeywell" },
  { src: Brand5, alt: "Arce" },
  { src: Brand6, alt: "CWAY" },
];

interface BrandSectionProps {
  title: string;
  brands: Brand[];
}

const BrandSection: React.FC<BrandSectionProps> = ({ title, brands }) => (
  <>
    <div className="mb-2">
      <p className="text-gray-500">{title}</p>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {brands.map((brand, index) => (
        <div
          key={index}
          className="flex aspect-square items-center justify-center rounded-lg bg-gray-100 p-4"
        >
          <img
            src={brand.src}
            alt={brand.alt}
            className="h-12 w-auto object-contain"
          />
        </div>
      ))}
    </div>
  </>
);

interface HomePageProps {
  products: Product[];
}

export const HomePage: React.FC<HomePageProps> = ({ products }) => {
  const { searchTerm } = useSearch();
  const handleViewDetails = (productId: string) => {
    // Handle navigation
    console.log(`Viewing product: ${productId}`);
  };
  

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Sales and Promo Section */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Sales and Promo</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="aspect-square rounded-lg text-white  overflow-hidden ">
            <Image src={Promo1} alt={"promo1"} />
          </div>
          <div className="aspect-square rounded-lg  text-white  overflow-hidden ">
            <Image src={Promo2} alt={"promo2"} />
          </div>
          <div className="aspect-square rounded-lg text-white  overflow-hidden ">
            <Image src={Promo3} alt={"promo3"} />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Products</h2>
          <Button variant="link">See All</Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {products
            .slice(4, 7)
            .filter((product) =>
              product?.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) =>
              product ? (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                />
              ) : (
                <p>This product is not available currently.</p>
              )
            )}
        </div>
      </section>

      {/* Brands Section */}
      <section className="mb-8">
        <div className="mb-2">
          <h2 className="text-lg font-semibold">Brands</h2>
        </div>
        <BrandSection title="Health" brands={healthBrands} />
        <BrandSection title="Food" brands={foodBrands} />
      </section>
    </div>
  );
};

export default HomePage;
