// app/cart/page.tsx

'use client'; 

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useCart } from '../../content/CartContext'; 

// Mock type for a complex cart item
interface CartItem {
    id: string;
    productName: string;
    productSlug: string;
    quantity: number;
    unitPrice: number;
    finalPrice: number; // Price per unit after all customizations
    isCustom: boolean;
    selections?: Record<string, string | string[]>; // Details for custom cakes
    schedule?: Date; // Delivery/Pickup date/time
}

const CartPage: React.FC = () => {
    // Note: We'll assume the useCart() hook provides the necessary mock data and handlers
    const { cartItems, totalItems, updateQuantity, removeItem } = useCart(); 

    // --- Mock Handlers (These would be passed by useCart in a real app) ---
    // Note: In the actual CartContext.tsx, you would implement the full logic
    const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            console.log(`Mock: Removing item ${itemId}`);
        } else {
            console.log(`Mock: Updating item ${itemId} to quantity ${newQuantity}`);
            // Call the actual updateQuantity(itemId, newQuantity) from useCart
        }
    };

    const handleRemoveItem = (itemId: string) => {
        console.log(`Mock: Removing item ${itemId}`);
        // Call the actual removeItem(itemId) from useCart
    };
    // ----------------------------------------------------------------------


    // --- Total Calculation ---
    const finalTotal = useMemo(() => 
        cartItems.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0),
        [cartItems]
    );

    const firstScheduledItem = cartItems.find(item => item.schedule);
    const scheduledDate = firstScheduledItem?.schedule;

    // --- Empty Cart View ---
    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20 bg-white shadow-lg m-10 rounded-xl">
                <h1 className="text-4xl font-bold text-pink-600">Your Cart is Empty</h1>
                <p className="text-gray-500 mt-3 mb-6">Time to fill it with some delicious catering!</p>
                <Link href="/products" className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600 transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* --- Column 1 & 2: Item List --- */}
                <div className="lg:col-span-2 space-y-6">
                    <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">Your Order ({totalItems} Items)</h1>
                    
                    {cartItems.map((item: CartItem) => (
                        <div key={item.id} className="bg-white p-6 rounded-xl shadow flex space-x-4">
                            
                            {/* Product Info */}
                            <div className="flex-grow">
                                <Link href={`/products/${item.productSlug}`}>
                                    <h2 className="text-xl font-bold text-teal-700 hover:text-pink-600">{item.productName}</h2>
                                </Link>
                                
                                {/* Customization Summary */}
                                {item.isCustom && item.selections && (
                                    <ul className="text-sm text-gray-600 mt-1 list-disc pl-5">
                                        {Object.entries(item.selections).map(([key, value]) => (
                                            <li key={key}>
                                                <span className="capitalize font-medium">{key}:</span> {Array.isArray(value) ? value.join(', ') : value}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Price per Unit */}
                                <p className="text-sm mt-2 text-gray-500">
                                    Price per unit: ${item.finalPrice.toFixed(2)}
                                </p>
                            </div>

                            {/* Quantity & Actions */}
                            <div className="flex flex-col items-end justify-between">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                                        className="w-16 p-2 border rounded-lg text-center"
                                    />
                                    <button 
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <p className="text-lg font-bold text-pink-600 mt-2">
                                    ${(item.finalPrice * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Column 3: Summary and Checkout --- */}
                <div className="lg:col-span-1 space-y-6 sticky top-24 h-fit">
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-teal-500">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>

                        {/* Schedule Confirmation */}
                        {scheduledDate && (
                            <div className="mb-4 p-3 bg-teal-50 rounded-lg border border-teal-200">
                                <p className="font-semibold text-teal-800">Scheduled Date & Time:</p>
                                <p className="text-lg font-mono">
                                    {scheduledDate.toLocaleDateString()} at {scheduledDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        )}
                        
                        {/* Price Breakdown */}
                        <div className="space-y-2 border-t pt-4">
                            <div className="flex justify-between text-lg">
                                <span>Subtotal:</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-extrabold text-teal-700 pt-2 border-t">
                                <span>Total:</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <Link href="/checkout" passHref>
                            <button className="w-full mt-6 py-3 text-xl font-bold rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors shadow-xl">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;