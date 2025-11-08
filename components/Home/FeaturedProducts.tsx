// components/home/FeaturedProducts.tsx
import ProductCard from '@/components/products/ProductCard';

// Mock data for the featured section
const mockProducts = [
  { slug: 'signature-red-velvet', name: 'Signature Red Velvet Cake', imageUrl: '/images/red-velvet.jpg', price: 50.00, isCustomizable: true },
  { slug: 'assorted-dozen-doughnuts', name: 'Assorted Dozen Doughnuts', imageUrl: '/images/doughnuts.jpg', price: 15.00, isCustomizable: false },
  { slug: 'smoked-catfish-fillet', name: 'Smoked Catfish Fillet (1kg)', imageUrl: '/images/catfish.jpg', price: 25.00, isCustomizable: false },
  { slug: 'chicken-meat-pie', name: 'Large Chicken Meat Pie', imageUrl: '/images/meat-pie.jpg', price: 4.50, isCustomizable: false },
];

const FeaturedProducts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Assuming you have images in your public folder for this mock */}
      {mockProducts.map((product) => (
        <ProductCard key={product.slug} {...product} />
      ))}
    </div>
  );
};
export default FeaturedProducts;