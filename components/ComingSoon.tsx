import React from 'react';
import { motion } from 'framer-motion';

const marqueeItems = [
  'ULTRA SERIES',
  'CLINICAL GRADE',
  'COMING 2025',
  'NEXT GENERATION',
  'ULTRA SERIES',
  'CLINICAL GRADE',
  'COMING 2025',
  'NEXT GENERATION',
];

const ComingSoon: React.FC = () => {
  return (
    <section className="bg-black text-white py-32 md:py-48 relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

      <div className="max-w-[1200px] mx-auto px-8">
        {/* Label row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="bg-white text-black px-2 py-1 mr-3 inline-block section-label">
            COMING WINTER 2025
          </span>
          <span className="section-label text-gray-500">IN DEVELOPMENT</span>
        </motion.div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          {/* LEFT: Display text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <h2>
              <span className="block text-display">ULTRA</span>
              <span className="block text-display text-outline">SERIES.</span>
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 text-lg text-gray-400 max-w-md leading-relaxed"
            >
              The next generation of sonic technology is currently in development. Clinical grade. Home comfort.
            </motion.p>
          </motion.div>

          {/* RIGHT: Email signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="section-label text-gray-500 block mb-4">REQUEST ACCESS</span>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-transparent border-b border-white/30 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors text-sm tracking-wide"
              />
              <button
                type="submit"
                className="border-b border-white/30 px-4 py-4 text-white hover:border-white transition-colors"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
          </motion.div>
        </div>

        {/* Marquee ticker */}
        <div className="mt-24 border-t border-white/5 pt-8 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex">
            {marqueeItems.map((text, i) => (
              <span key={i} className="section-label text-white/10 mx-8">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
