// components/products/ProductCard.tsx

'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Define the shape of the data the card expects
interface ProductCardProps {
  slug: string; // Used for linking to the detail page
  name: string;
  imageUrl: string;
  price: number; // Base price or fixed price
  isCustomizable: boolean; // Determines the button text and price format
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  slug, 
  name, 
  imageUrl, 
  price, 
  isCustomizable 
}) => {
  
  // Placeholder data for the button text
  const buttonText = isCustomizable ? 'Customize & Order' : 'Add to Cart';
  const priceDisplay = isCustomizable ? `Starts From: $${price.toFixed(2)}` : `$${price.toFixed(2)}`;

  return (
    <div className="border rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] bg-white">
      <Link href={`/products/${slug}`} passHref>
        {/* Next.js Image component for performance */}
        <div className="relative h-60 w-full">
          <Image
            src={imageUrl}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 50vw, 25vw"
            className="transition-transform duration-500 hover:scale-105"
            priority={false} // Only set to true for above-the-fold images
          />
        </div>
        
        <div className="p-4 flex flex-col justify-between h-auto">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{name}</h3>
          
          <div className="mt-2 mb-4">
            <p className="text-lg font-extrabold text-teal-600">
              {priceDisplay}
            </p>
          </div>

          <button
            className={`w-full py-3 rounded-lg font-semibold text-white transition-colors duration-200 
              ${isCustomizable ? 'bg-pink-500 hover:bg-pink-600' : 'bg-teal-500 hover:bg-teal-600'}
            `}
            // Note: The click behavior for 'Add to Cart' would typically be handled here, 
            // but we use Link to go to the detail page for customization.
            onClick={(e) => {
              // Prevent navigation if it's a simple 'Add to Cart' (Catfish)
              if (!isCustomizable) {
                e.preventDefault(); 
                // Add actual 'Add to Cart' logic here later
                console.log(`Added ${name} to cart!`);
              }
            }}
          >
            {buttonText}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;