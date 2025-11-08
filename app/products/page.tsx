// app/products/page.tsx

import React from 'react';
import Link from 'next/link';

// This is the page component that resolves the /products URL.
const ProductsIndexPage: React.FC = () => {
  
  // Define mock data for your main product categories/featured items
  const categories = [
    { name: 'Custom Cakes & Pies', slug: 'signature-chocolate-delight', description: 'Design your perfect dessert.' },
    { name: 'Fresh Catfish', slug: 'fresh-catfish', description: 'Locally sourced, ready for your kitchen.' },
    { name: 'Savory Meat Pies', slug: 'savory-meat-pies', description: 'Perfect snacks and appetizers.' },
  ];

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-teal-700 mb-8 text-center">Our Menu & Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((item) => (
            // Note: We link directly to the product detail pages using their slugs
            <Link key={item.slug} href={`/products/${item.slug}`} passHref>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-pink-500 cursor-pointer">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
                <span className="mt-4 inline-block text-pink-600 font-semibold hover:underline">
                  View Details &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsIndexPage;