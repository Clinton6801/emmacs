// app/products/[slug]/page.tsx
import React from 'react';
import { getProductBySlug, mockScheduleConfig } from '../../../src/lib/data'; // Import mock data function
import Image from 'next/image';
import CustomCakeForm from '../../../components/products/CustomCakeForm'; // Needs to be created
import StandardProductOptions from '../../../components/products/StandardProductOptions'; // Needs to be created
import { BaseProduct, CustomizableProduct, StandardProduct } from '../../../src/types/product';

interface ProductDetailPageProps {
    params: {
        slug: string; // The URL slug
    };
}

// This is a Server Component, excellent for fast data fetching (SSG/SSR)
const ProductDetailPage: React.FC<ProductDetailPageProps> = async ({ params }) => {
    // 1. Extract the slug early (Next.js is happy with this synchronous destructuring)
    const slug = params.slug; 

    // 2. Use the extracted 'slug' for data fetching
    const product = await getProductBySlug(slug); // Data fetching uses the extracted variable

    if (!product) {
        // 3. Use the extracted 'slug' in the JSX
        return (
            <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-red-600">404 - Product Not Found</h1>
                {/* FIX: Use the extracted 'slug' variable instead of params.slug */}
                <p className="text-gray-600 mt-3">The product "{slug}" does not exist.</p> 
            </div>
        );
    }
        

    const { name, description, imageUrls } = product as BaseProduct;
    
    // Determine the product type and cast to the correct interface
    const isCustomizable = product.isCustomizable;
    
    return (
        <div className="py-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{name}</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Product Image Gallery */}
                <div className="lg:sticky top-24"> 
                    <div className="relative h-96 w-full rounded-lg shadow-xl overflow-hidden">
                        <Image
                            src={imageUrls[0]}
                            alt={name}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </div>
                </div>

                {/* Product Description and Form */}
                <div>
                    <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>
                    
                    {/* Conditional Form Rendering */}
                    {isCustomizable ? (
                        <CustomCakeForm 
                            product={product as CustomizableProduct} 
                            scheduleConfig={mockScheduleConfig} // Pass scheduling rules
                        />
                    ) : (
                        <StandardProductOptions 
                            product={product as StandardProduct} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;