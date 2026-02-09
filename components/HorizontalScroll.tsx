import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IMAGES } from '../types';

const HorizontalScroll: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  const cards = [
    {
      id: 1,
      title: "The Material",
      desc: "Aerospace-grade aluminum. Cold to the touch. Perfectly balanced.",
      img: IMAGES.flatlay,
    },
    {
      id: 2,
      title: "The Ritual",
      desc: "Transform a daily chore into a moment of mindfulness and silence.",
      img: IMAGES.bathroom,
    },
    {
      id: 3,
      title: "The Impact",
      desc: "Designed for a lifetime. Refillable heads. Zero plastic waste.",
      img: IMAGES.lifestyle,
    },
  ];

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-white text-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Title pinned */}
        <div className="absolute top-12 left-12 z-20">
          <h2 className="text-5xl font-bold tracking-tighter uppercase mb-2">The Philosophy</h2>
          <p className="text-gray-500 font-mono text-sm">[ SCROLL RIGHT ]</p>
        </div>

        <motion.div style={{ x }} className="flex gap-0 w-[300vw] h-full">
          {cards.map((card, index) => (
            <div key={card.id} className="w-screen h-full flex flex-col md:flex-row relative">
              
              {/* Image Side */}
              <div className="w-full md:w-2/3 h-1/2 md:h-full relative overflow-hidden border-r border-black/10">
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                
                {/* Large Number */}
                <span className="absolute bottom-4 right-4 text-[20vh] leading-none font-bold text-white/20 select-none">
                  0{index + 1}
                </span>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/3 h-1/2 md:h-full flex flex-col justify-center px-12 md:px-20 bg-[#f4f4f4]">
                 <div className="w-12 h-1 bg-black mb-8"></div>
                 <h3 className="text-4xl md:text-5xl font-bold uppercase mb-6 leading-tight">{card.title}</h3>
                 <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">{card.desc}</p>
              </div>

            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScroll;