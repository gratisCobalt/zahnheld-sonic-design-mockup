import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroVideo = `${import.meta.env.BASE_URL}hero-video.mp4`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-linked transforms
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '8%']);

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] bg-black z-40">
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* ── VIDEO BACKGROUND ── */}
        <motion.div style={{ scale: videoScale }} className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
            style={{ filter: 'grayscale(0.8) contrast(1.1)' }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </motion.div>

        {/* ── GRADIENT OVERLAYS ── */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/70 to-black/20" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/40 to-transparent" />

        {/* ── MASSIVE TYPOGRAPHY ── */}
        <motion.div
          style={{ opacity: contentOpacity, y: textY }}
          className="absolute inset-0 z-[2] flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-32 md:pb-28"
        >
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="section-label text-white/50 mb-4 md:mb-6"
          >
            GERMAN PRECISION
          </motion.span>

          {/* Line 1 */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-white leading-[0.85] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(3.5rem, 15vw, 18rem)' }}
            >
              Silent
            </motion.h1>
          </div>

          {/* Line 2 */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-white leading-[0.85] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(3.5rem, 15vw, 18rem)' }}
            >
              Power<span className="text-white/30">.</span>
            </motion.h1>
          </div>
        </motion.div>

        {/* ── BOTTOM BAR: subtitle + CTAs ── */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute z-[4] bottom-0 left-0 right-0 px-6 md:px-12 lg:px-16 pb-8 md:pb-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            {/* Left: metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[13px] md:text-sm text-white/40 max-w-xs leading-relaxed">
                Redefining oral care through sonic precision and minimalist design.
              </p>
              <span className="text-[10px] text-white/25 tracking-[0.3em] uppercase mt-2 block">
                EST. 2024
              </span>
            </motion.div>

            {/* Right: Blue CTAs (Apple/Oura style) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 md:gap-4"
            >
              <a
                href="#"
                className="bg-[#0071E3] hover:bg-[#0077ED] text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full text-xs md:text-[13px] font-medium tracking-wide transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,113,227,0.4)]"
              >
                Explore Series
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* ── SCROLL INDICATOR ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="absolute z-[4] bottom-10 left-1/2 -translate-x-1/2"
        >
          <span className="w-[1px] h-8 bg-white/15 block overflow-hidden rounded-full">
            <motion.span
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="block w-full h-full bg-white/50"
            />
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
