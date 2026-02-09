import React from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '../types';

const Gallery: React.FC = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, letterSpacing: "-0.05em" }}
          whileInView={{ opacity: 1, letterSpacing: "0em" }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-white mb-16 uppercase tracking-tight text-center"
        >
          In The Wild
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
          {/* Large Item */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2 h-[400px] md:h-full relative group overflow-hidden rounded-lg cursor-pointer"
          >
            <img 
              src={IMAGES.bathroom} 
              alt="Luxury bathroom" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
            <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <span className="bg-white text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">Interior</span>
            </div>
          </motion.div>

          {/* Stacked Items */}
          <div className="flex flex-col gap-4 h-full">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-[300px] md:h-1/2 relative group overflow-hidden rounded-lg cursor-pointer"
            >
              <img 
                src={IMAGES.lifestyle} 
                alt="Lifestyle" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
              />
               <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="bg-white text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">Daily</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="h-[300px] md:h-1/2 relative group overflow-hidden rounded-lg cursor-pointer"
            >
              <img 
                src={IMAGES.flatlay} 
                alt="Flatlay" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
              />
               <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="bg-white text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">Travel</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;