// components/layout/Header.tsx

'use client'; 

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../content/CartContext'; 
// Import a simple shopping cart icon component (e.g., from Lucide or Heroicons)
// For simplicity, we'll use a placeholder icon.

const ShoppingCartIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
        <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 1 0 2 2H18"/>
        <path d="M16 16l3.5-7h-12"/>
    </svg>
);

const Header: React.FC = () => {
    const { totalItems } = useCart();
    
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* --- Logo/Brand --- */}
                    <div className="flex items-center">
                        <Link href="/" passHref>
                            <span className="text-2xl font-extrabold text-teal-700 cursor-pointer">
                                Bake & Catch 🎂🐟
                            </span>
                        </Link>
                    </div>

                    {/* --- Navigation Links --- */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" passHref>
                            <span className="text-gray-600 hover:text-pink-600 font-medium transition-colors">Home</span>
                        </Link>
                        <Link href="/products" passHref>
                            <span className="text-gray-600 hover:text-pink-600 font-medium transition-colors">Shop All</span>
                        </Link>
                        <Link href="/products" passHref>
                            <span className="text-gray-600 hover:text-pink-600 font-medium transition-colors">Cakes</span>
                        </Link>
                        <Link href="/products" passHref>
                            <span className="text-gray-600 hover:text-pink-600 font-medium transition-colors">Catfish</span>
                        </Link>
                    </nav>

                    {/* --- Cart Icon --- */}
                    <div className="flex items-center">
                        <Link href="/cart" passHref>
                            <div className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <ShoppingCartIcon />
                                {totalItems > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-pink-600 rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;