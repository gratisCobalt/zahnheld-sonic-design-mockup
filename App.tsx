import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Engineering from './components/Engineering';
import HorizontalScroll from './components/HorizontalScroll';
import Specs from './components/Specs';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

const CTA: React.FC = () => (
  <section className="py-32 bg-white text-black flex flex-col items-center justify-center text-center px-6 overflow-hidden relative">
    {/* Background Grid Pattern */}
    <div className="absolute inset-0 opacity-5 pointer-events-none" 
         style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
    </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col items-center relative z-10"
    >
      <span className="text-xs font-bold tracking-[0.3em] uppercase mb-6 text-gray-500">The Upgrade</span>
      <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 uppercase leading-none">
        Elevate
      </h2>
      <p className="text-xl md:text-2xl font-light max-w-2xl mb-12 text-gray-600">
        Design that respects your space. Technology that respects your health.
      </p>
      
      <div className="flex flex-col md:flex-row gap-6">
        <button className="bg-black text-white px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl">
          Purchase Set — $129
        </button>
         <button className="border border-black text-black px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
          View Accessories
        </button>
      </div>

      <p className="mt-12 text-xs font-mono text-gray-400">
        FREE SHIPPING WORLDWIDE / 2 YEAR WARRANTY
      </p>
    </motion.div>
  </section>
);

const App: React.FC = () => {
  return (
    <main className="bg-[#050505] min-h-screen selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <Engineering />
      <HorizontalScroll />
      <Specs />
      <Gallery />
      <CTA />
      <Footer />
    </main>
  );
};

export default App;