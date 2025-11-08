// components/products/StandardProductOptions.tsx

'use client'; 

import React, { useState, useMemo } from 'react';
import { StandardProduct } from '../../src/types/product';
import { useCart } from '../../content/CartContext'; 

interface StandardProductOptionsProps {
    product: StandardProduct;
}

const StandardProductOptions: React.FC<StandardProductOptionsProps> = ({ product }) => {
    
    // Default to the first variant and a quantity of 1
    const defaultVariant = product.standardOptions.variants[0];
    const [selectedVariantId, setSelectedVariantId] = useState<string>(defaultVariant.variantId);
    const [quantity, setQuantity] = useState<number>(1);
    
    // Helper to find the currently selected variant object
    const selectedVariant = useMemo(() => 
        product.standardOptions.variants.find(v => v.variantId === selectedVariantId) || defaultVariant,
        [selectedVariantId, product.standardOptions.variants, defaultVariant]
    );

    // Placeholder for actual cart addition
    // const { addToCart } = useCart(); 

    const handleAddToCart = () => {
        // Validation: Check stock before adding
        if (quantity > selectedVariant.stock) {
            alert(`Sorry, only ${selectedVariant.stock} units of ${selectedVariant.label} are currently in stock.`);
            return;
        }

        const orderItem = {
            productId: product._id,
            productName: product.name,
            variant: selectedVariant.label,
            unitPrice: selectedVariant.price,
            quantity: quantity,
            finalPrice: selectedVariant.price * quantity
        };
        
        console.log("Adding standard item to cart:", orderItem);
        // addToCart(orderItem); 
    };

    return (
        <div className="space-y-6 p-6 bg-gray-50 rounded-xl shadow-inner">
            <h2 className="text-2xl font-bold text-teal-600 border-b pb-2">Select Options & Quantity</h2>

            {/* --- 1. Variant Selection (Weight/Prep) --- */}
            <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    {product.standardOptions.optionLabel}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    {product.standardOptions.variants.map(variant => (
                        <button
                            key={variant.variantId}
                            onClick={() => setSelectedVariantId(variant.variantId)}
                            className={`p-3 border rounded-lg transition-colors duration-200 text-left
                                ${selectedVariantId === variant.variantId 
                                    ? 'bg-teal-100 border-teal-500 shadow-md ring-2 ring-teal-500' 
                                    : 'bg-white border-gray-300 hover:bg-gray-100'
                                }
                            `}
                        >
                            <span className="block font-medium">{variant.label}</span>
                            <span className="block text-sm text-gray-500">${variant.price.toFixed(2)}</span>
                            {variant.stock < 10 && variant.stock > 0 && 
                                <span className="block text-xs text-orange-500 font-semibold">Low Stock: {variant.stock} left</span>
                            }
                        </button>
                    ))}
                </div>
            </div>

            {/* --- 2. Quantity Selector --- */}
            <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold text-gray-800">Quantity:</h3>
                <input
                    type="number"
                    min="1"
                    max={selectedVariant.stock} // Limit to available stock
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 p-2 border rounded-lg text-center focus:ring-teal-500 focus:border-teal-500"
                />
                <span className="text-sm text-gray-500">Max: {selectedVariant.stock} available</span>
            </div>

            {/* --- 3. Summary and Add to Cart --- */}
            <div className="pt-4 flex justify-between items-center">
                <div className="text-left">
                    <p className="text-xl text-gray-500 font-medium">Total Price</p>
                    <p className="text-4xl font-extrabold text-teal-700">
                        ${(selectedVariant.price * quantity).toFixed(2)}
                    </p>
                </div>
                
                <button
                    onClick={handleAddToCart}
                    disabled={quantity > selectedVariant.stock || quantity === 0}
                    className={`px-10 py-4 text-xl font-bold rounded-full transition-all duration-300
                        ${quantity > 0 && quantity <= selectedVariant.stock 
                            ? 'bg-pink-500 hover:bg-pink-600 text-white shadow-lg' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                    `}
                >
                    Add {quantity} to Cart
                </button>
            </div>
        </div>
    );
};

export default StandardProductOptions;