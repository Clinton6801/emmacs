// context/CartContext.tsx

'use client'; 

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// --- 1. Define the Cart Item Type ---
// We use a simplified structure here. This should align with what is passed from Product pages.
export interface CartItem {
    id: string; // Unique ID for the item instance in the cart
    productName: string;
    productSlug: string;
    quantity: number;
    unitPrice: number;
    finalPrice: number; // Price per unit after all customizations
    isCustom: boolean;
    selections?: Record<string, string | string[]>; // Customization details
    schedule?: Date; // Delivery/Pickup date/time
}

// --- 2. Define the Context Type Interface (Fixes the Errors) ---
export interface CartContextType { 
    cartItems: CartItem[]; 
    totalItems: number; 
    finalTotal: number; // New: Total monetary value
    
    // Handlers that were causing the error:
    addToCart: (item: CartItem) => void; 
    updateQuantity: (itemId: string, newQuantity: number) => void;
    removeItem: (itemId: string) => void;
    clearCart: () => void;
} 

// Create the context
export const CartContext = createContext<CartContextType | undefined>(undefined); 

// --- 3. Implement the Provider with Handlers ---
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { 
    const [cartItems, setCartItems] = useState<CartItem[]>([]); 

    // Calculate total items (sum of quantities)
    const totalItems = useMemo(() => 
        cartItems.reduce((sum, item) => sum + item.quantity, 0), 
        [cartItems]
    );

    // Calculate final monetary total
    const finalTotal = useMemo(() => 
        cartItems.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0),
        [cartItems]
    );

    const addToCart = useCallback((item: CartItem) => {
        // Simple logic: just add the item for now. Real logic would check for existing matches.
        const newItemWithId = { ...item, id: Date.now().toString() }; // Assign a unique ID
        setCartItems(prev => [...prev, newItemWithId]); 
        console.log(`Item ${item.productName} added to cart!`);
    }, []);

    const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeItem(itemId); // Remove if quantity drops to zero
            return;
        }

        setCartItems(prev => 
            prev.map(item => 
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
        console.log(`Quantity updated for item ${itemId} to ${newQuantity}`);
    }, []);

    const removeItem = useCallback((itemId: string) => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
        console.log(`Item ${itemId} removed from cart.`);
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
        console.log('Cart cleared.');
    }, []);

    // The value object providing all items and handlers
    const value = useMemo(() => ({
        cartItems,
        totalItems,
        finalTotal,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
    }), [cartItems, totalItems, finalTotal, addToCart, updateQuantity, removeItem, clearCart]);


    return ( 
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider> 
    ); 
}; 

// --- 4. Custom Hook ---
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};