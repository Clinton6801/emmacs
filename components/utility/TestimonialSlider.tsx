// components/utility/TestimonialSlider.tsx
'use client'
import React from 'react';

const testimonials = [
  { id: 1, quote: "The best Red Velvet cake I've ever tasted! Ordering was so easy.", author: "Aisha M." },
  { id: 2, quote: "The Catfish arrived perfectly fresh and packaged. Excellent quality!", author: "Tunde O." },
  { id: 3, quote: "The customization tool for the meat pies was fantastic and accurate.", author: "Chiamaka E." },
];

const TestimonialSlider: React.FC = () => {
  // In a real app, this would be a carousel library like Swiper or a custom component.
  // For now, we display them in a simple grid.
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {testimonials.map((t) => (
        <div key={t.id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-teal-500">
          <blockquote className="italic text-gray-700 mb-4 text-center">
            "{t.quote}"
          </blockquote>
          <p className="text-right font-semibold text-sm text-teal-600">- {t.author}</p>
        </div>
      ))}
    </div>
  );
};

export default TestimonialSlider;