import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = ['Shop', 'Technology', 'About'];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'h-14 bg-black/80 backdrop-blur-xl border-b border-white/5'
            : 'h-20 bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between">
          <a href="#" className="text-white font-bold text-lg tracking-tight uppercase">
            ZAHNHELD
          </a>

          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/70 hover:text-white transition-colors duration-300 text-[11px] font-medium tracking-[0.15em] uppercase"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-white/70 hover:text-white transition-colors duration-300 text-[11px] font-medium tracking-[0.15em] uppercase hidden sm:block">
              Cart (0)
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-white w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            >
              <span className="w-6 h-[1.5px] bg-white"></span>
              <span className="w-4 h-[1.5px] bg-white"></span>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col"
          >
            <div className="flex items-center justify-between px-8 h-20">
              <span className="text-white font-bold text-lg tracking-tight uppercase">ZAHNHELD</span>
              <button onClick={() => setMenuOpen(false)} className="text-white">
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-8">
              {[...navLinks, 'Account'].map((link, i) => (
                <motion.a
                  key={link}
                  href="#"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl font-bold uppercase tracking-tight text-white hover:text-white/60 transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
