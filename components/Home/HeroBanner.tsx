// components/home/HeroBanner.tsx
const HeroBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white p-16 rounded-xl shadow-lg text-center">
      <h1 className="text-5xl font-extrabold mb-4">Your Ultimate Source for Custom Baking & Premium Catfish</h1>
      <p className="text-xl mb-6">Order fresh, customized treats and quality seafood delivered to your door.</p>
      <button className="bg-yellow-400 hover:bg-yellow-500 text-teal-900 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
        Start Custom Order →
      </button>
    </div>
  );
};
export default HeroBanner;