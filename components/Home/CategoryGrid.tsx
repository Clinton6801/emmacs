// components/home/CategoryGrid.tsx
import Link from 'next/link';

const categories = [
  { name: 'Custom Cakes', link: '/products/cakes', emoji: '🎂' },
  { name: 'Gourmet Doughnuts', link: '/products/doughnuts', emoji: '🍩' },
  { name: 'Savory Meat Pies', link: '/products/meatpies', emoji: '🥧' },
  { name: 'Fresh Catfish', link: '/products/catfish', emoji: '🐟' },
];

const CategoryGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <Link 
          key={cat.name} 
          href={cat.link}
          className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
        >
          <span className="text-4xl block mb-2">{cat.emoji}</span>
          <h3 className="text-lg font-semibold text-gray-700">{cat.name}</h3>
        </Link>
      ))}
    </div>
  );
};
export default CategoryGrid;