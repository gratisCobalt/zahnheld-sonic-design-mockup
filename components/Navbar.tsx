import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/5 h-16' 
            : 'bg-transparent h-24 border-b border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
          
          {/* Left: Desktop Menu */}
          <div className="flex items-center gap-8">
            <button 
              className="lg:hidden text-white hover:text-gray-400 transition-colors" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="hidden lg:flex items-center gap-8">
              {['Engineering', 'Philosophy', 'Specs'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-xs font-bold tracking-[0.2em] text-white/70 hover:text-white transition-colors uppercase relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <a href="#" className="text-xl md:text-2xl font-bold tracking-tighter text-white uppercase select-none border border-white/20 px-3 py-1">
              Zahnheld
            </a>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-6">
            <button className="text-white hover:text-gray-400 transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="relative text-white hover:text-gray-400 transition-colors flex items-center gap-2">
              <span className="hidden md:inline text-xs font-bold tracking-widest uppercase">Cart (0)</span>
              <span className="material-symbols-outlined">shopping_bag</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#050505] flex flex-col p-8 lg:hidden border-r border-white/10"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-bold tracking-tighter uppercase border border-white/20 px-2">Zahnheld</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-8 text-3xl font-light">
              {['Engineering', 'Philosophy', 'Specs', 'Account'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="block border-b border-white/10 pb-4 hover:pl-4 transition-all duration-300" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-xs font-mono text-gray-500 block mb-1">0{['Engineering', 'Philosophy', 'Specs', 'Account'].indexOf(item) + 1}</span>
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;