import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VIDEOS } from '../types';

const AnimatedLine = ({ text, delay }: { text: string; delay: number }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: '110%' }}
      animate={{ y: '0%' }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="block text-display">{text}</span>
    </motion.div>
  </div>
);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0%', '30%']);

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] bg-black z-40">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Video Background */}
        <motion.div style={{ scale: videoScale }} className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale opacity-80 contrast-110"
          >
            <source src={VIDEOS.hero} type="video/mp4" />
          </video>
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/60 to-black/30" />

        {/* Content */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 h-full flex flex-col justify-end pb-20 px-8 md:px-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="section-label text-white/60 mb-6"
          >
            GERMAN PRECISION
          </motion.span>

          <AnimatedLine text="SILENT" delay={0.3} />
          <AnimatedLine text="POWER." delay={0.5} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 mt-12"
          >
            <button className="bg-white text-black px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors duration-300">
              EXPLORE SERIES
            </button>
            <button className="border border-white/40 text-white px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-colors duration-300">
              VIEW FILM
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-8 text-sm text-white/50 max-w-md leading-relaxed"
          >
            Redefining oral care through high-contrast aesthetics and sonic precision.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 right-8 z-10 flex items-center gap-3"
        >
          <span className="font-mono text-[10px] text-white/50 tracking-widest">[ SCROLL ]</span>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-sm text-white/50 animate-bounce">arrow_downward</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
