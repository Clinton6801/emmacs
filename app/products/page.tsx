// app/products/page.tsx

'use client'; 

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProductBySlug, mockScheduleConfig } from '../../src/lib/data'; // Adjust path as needed
import CustomCakeForm from '@/components/products/CustomCakeForm'; 
import StandardProductOptions from '@/components/products/StandardProductOptions'; 
import { BaseProduct, CustomizableProduct, StandardProduct, Product } from '../../src/types/product'; 

// Define the available slugs to easily switch between products
const MOCK_SLUGS = {
    CAKE: 'signature-chocolate-delight',
    CATFISH: 'fresh-catfish',
};

const ProductsPage: React.FC = () => {
    // State to manage which product is currently displayed
    const [selectedSlug, setSelectedSlug] = useState<string>(MOCK_SLUGS.CAKE);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // --- Data Fetching Effect ---
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            // Simulate fetching data using the selected slug
            const fetchedProduct = await getProductBySlug(selectedSlug);
            setProduct(fetchedProduct);
            setLoading(false);
        };

        fetchProduct();
    }, [selectedSlug]); // Re-run whenever the selectedSlug changes

    // --- Loading/Not Found States ---
    if (loading) {
        return <div className="text-center py-20 text-xl font-semibold">Loading product details...</div>;
    }
    
    if (!product) {
        return (
            <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-red-600">Product Not Found</h1>
                <p className="text-gray-600 mt-3">The product "{selectedSlug}" does not exist in our data.</p>
            </div>
        );
    }
    
    // --- Product Display Logic ---
    const { name, description, imageUrls } = product as BaseProduct;
    const isCustomizable = product.isCustomizable;

    return (
        <div className="py-10">
            {/* --- Product Selector (Simulates Navigation) --- */}
            <div className="flex space-x-4 mb-8 border-b pb-4">
                <button
                    onClick={() => setSelectedSlug(MOCK_SLUGS.CAKE)}
                    className={`px-4 py-2 rounded-full font-semibold transition-colors ${selectedSlug === MOCK_SLUGS.CAKE ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Custom Cakes
                </button>
                <button
                    onClick={() => setSelectedSlug(MOCK_SLUGS.CATFISH)}
                    className={`px-4 py-2 rounded-full font-semibold transition-colors ${selectedSlug === MOCK_SLUGS.CATFISH ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Fresh Catfish
                </button>
            </div>

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
                            scheduleConfig={mockScheduleConfig}
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

export default ProductsPage;