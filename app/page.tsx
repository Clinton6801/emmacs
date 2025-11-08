// app/page.tsx
import HeroBanner from '../components/Home/HeroBanner';
import CategoryGrid from '../components/Home/CategoryGrid';
import FeaturedProducts from '../components/Home/FeaturedProducts'; // We will create a mock for now
import TestimonialSlider from '../components/utility/TestimonialSlider'; // Placeholder

export default function HomePage() {
  return (
    <>
      {/* 1. Main visual and CTA */}
      <HeroBanner />

      {/* Separator */}
      <hr className="my-12 border-gray-200" /> 
      
      {/* 2. Quick links to main product groups */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Explore Our Offerings</h2>
        <CategoryGrid />
      </section>
      
      {/* Separator */}
      <hr className="my-12 border-gray-200" /> 

      {/* 3. Highlighting best sellers */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-teal-600">Our Bestsellers & Specials</h2>
        <FeaturedProducts /> 
      </section>

      {/* 4. Building trust */}
      <section className="mb-12 bg-gray-50 py-10 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">What Our Customers Say</h2>
        <TestimonialSlider /> 
      </section>
    </>
  );
}