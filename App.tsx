import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeDivider from './components/MarqueeDivider';
import Manifesto from './components/Manifesto';
import BrandStatement from './components/BrandStatement';
import HorizontalScroll from './components/HorizontalScroll';
import Features from './components/Features';
import USPSection from './components/USPSection';
import BentoGrid from './components/BentoGrid';
import ProductShowcase from './components/ProductShowcase';
import Engineering from './components/Engineering';
import Essentials from './components/Essentials';
import Reviews from './components/Reviews';
import ComingSoon from './components/ComingSoon';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <main className="bg-[#050505] min-h-screen selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <MarqueeDivider />
      <Manifesto />
      <BrandStatement />
      <HorizontalScroll />
      <Features />
      <USPSection />
      <BentoGrid />
      <ProductShowcase />
      <Engineering />
      <Essentials />
      <Reviews />
      <ComingSoon />
      <Footer />
    </main>
  );
};

export default App;
