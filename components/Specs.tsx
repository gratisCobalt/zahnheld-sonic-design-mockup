import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { IMAGES } from '../types';

const SpecItem: React.FC<{ title: string; value: string; suffix?: string; desc: string; delay: number }> = ({ 
  title, value, suffix, desc, delay 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="group py-8 border-t border-white/20 hover:border-white transition-colors duration-500 cursor-default"
    >
      <div className="flex items-baseline justify-between mb-3">
        <h4 className="text-xl md:text-2xl font-bold uppercase tracking-wide group-hover:text-white transition-colors text-gray-400">{title}</h4>
        <span className="text-3xl md:text-4xl font-light font-mono">{value}<span className="text-xs text-gray-500 ml-2 uppercase tracking-widest">{suffix}</span></span>
      </div>
      <p className="text-gray-500 max-w-md leading-relaxed text-sm md:text-base font-light group-hover:text-gray-300 transition-colors">{desc}</p>
    </motion.div>
  );
};

const Specs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section id="specs" ref={containerRef} className="py-32 bg-[#050505] text-white relative border-t border-white/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Sticky Image Section */}
          <div className="lg:sticky lg:top-32 h-[60vh] lg:h-[80vh] flex items-center justify-center">
            <motion.div 
              style={{ scale: imgScale }}
              className="relative w-full h-full overflow-hidden bg-[#111] border border-white/10"
            >
              <img 
                src={IMAGES.productMain} 
                alt="Toothbrush Spec" 
                className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              
              {/* Overlay Tech Data */}
              <div className="absolute top-8 right-8 text-right font-mono text-[10px] text-gray-400 space-y-1">
                 <p>MODEL: ZH-01</p>
                 <p>REV: 2.4.0</p>
                 <p>MAT: AL-6061</p>
              </div>

              <div className="absolute bottom-8 left-8">
                <h3 className="text-4xl font-bold uppercase mb-1 tracking-tighter">Core Specs</h3>
                <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">Performance Data</p>
              </div>
            </motion.div>
          </div>

          {/* Scrolling Specs */}
          <div className="flex flex-col justify-center py-10 lg:py-20">
             <div className="mb-20">
                <span className="font-mono text-xs text-primary mb-4 block tracking-widest">/// TECHNICAL DATA</span>
                <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
                >
                PRECISION<br/><span className="text-gray-700">TOOLS</span>
                </motion.h2>
            </div>
            
            <div className="flex flex-col">
              <SpecItem 
                title="Vibrations" 
                value="60,000" 
                suffix="VPM" 
                desc="Ultrasonic motor creates micro-bubbles for interdental cleaning." 
                delay={0}
              />
              <SpecItem 
                title="Endurance" 
                value="30" 
                suffix="DAYS" 
                desc="High-density Lithium-Ion cell. Travel without chargers." 
                delay={0.1}
              />
              <SpecItem 
                title="Modes" 
                value="03" 
                suffix="LEVELS" 
                desc="Clean, Sensitive, and Polish. Tactile switch control." 
                delay={0.2}
              />
              <SpecItem 
                title="Protection" 
                value="IPX7" 
                suffix="WATERPROOF" 
                desc="Hermetically sealed aluminum unibody." 
                delay={0.3}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specs;