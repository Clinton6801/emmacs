// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from '../content/CartContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bake & Catch - Premium Catering & Seafood',
  description: 'Order custom cakes, doughnuts, meatpies, and fresh catfish online.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* CartProvider makes cart state available everywhere */}
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}