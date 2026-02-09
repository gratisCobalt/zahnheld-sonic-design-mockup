import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import HorizontalScroll from './components/HorizontalScroll';
import Features from './components/Features';
import ProductShowcase from './components/ProductShowcase';
import Engineering from './components/Engineering';
import Essentials from './components/Essentials';
import ComingSoon from './components/ComingSoon';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <main className="bg-[#050505] min-h-screen selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <Manifesto />
      <HorizontalScroll />
      <Features />
      <ProductShowcase />
      <Engineering />
      <Essentials />
      <ComingSoon />
      <Footer />
    </main>
  );
};

export default App;
