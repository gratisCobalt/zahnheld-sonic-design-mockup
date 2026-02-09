import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IMAGES } from '../types';

const cards = [
  { title: 'The Material', desc: 'Aerospace-grade aluminum. Cold to the touch. Perfectly balanced. Built to last a lifetime.', img: IMAGES.flatlay, num: '01' },
  { title: 'The Ritual', desc: 'Transform a daily chore into a moment of mindfulness. Two minutes of silence. Twice a day.', img: IMAGES.bathroom, num: '02' },
  { title: 'The Impact', desc: 'Designed for a lifetime. Refillable heads. Zero plastic waste. Carbon neutral shipping.', img: IMAGES.lifestyle, num: '03' },
];

const HorizontalScroll: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66%']);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black text-white">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Title */}
        <div className="absolute top-12 left-12 z-20">
          <span className="section-label text-white/60 mb-3 block">THE PHILOSOPHY</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase">Scroll Right</h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="w-16 h-[1px] bg-white/30 mt-4 origin-left"
          />
        </div>

        <motion.div style={{ x }} className="flex gap-0 w-[300vw] h-full">
          {cards.map((card, index) => (
            <div key={index} className="w-screen h-full flex flex-col md:flex-row relative">
              {/* Image */}
              <div className="w-full md:w-2/3 h-1/2 md:h-full relative overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <span className="absolute bottom-8 right-8 text-[25vh] leading-none font-bold text-white/10 select-none pointer-events-none">
                  {card.num}
                </span>
              </div>

              {/* Text */}
              <div className="w-full md:w-1/3 h-1/2 md:h-full flex flex-col justify-center px-12 md:px-16 bg-surface">
                <span className="section-label text-white/40 mb-4">{card.num}</span>
                <div className="w-12 h-[1px] bg-white/20 mb-8"></div>
                <h3 className="text-4xl md:text-5xl font-bold uppercase mb-6 leading-tight tracking-tight">{card.title}</h3>
                <p className="text-lg text-gray-500 leading-relaxed font-light">{card.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
