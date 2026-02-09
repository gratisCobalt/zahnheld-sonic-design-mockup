import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { VIDEOS } from '../types';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  // Animation Variants for Editorial Reveal
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        ease: [0.22, 1, 0.36, 1] // Custom ease for elegance
      }
    }
  };

  const letterVars: Variants = {
    hidden: { y: "100%" },
    visible: { 
      y: "0%", 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const SplitText = ({ text, align = "left" }: { text: string, align?: "left" | "right" }) => (
    <motion.div 
      className={`overflow-hidden flex ${align === "right" ? "justify-end" : "justify-start"}`}
      variants={containerVars}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, i) => (
        <motion.span 
          key={i} 
          variants={letterVars}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div ref={containerRef} className="relative w-full h-[150vh] bg-[#050505] z-40">
      
      {/* Sticky Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/30 z-10" /> {/* Increased contrast */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover grayscale opacity-90 contrast-125"
          >
            <source src={VIDEOS.hero} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Editorial Content Layout */}
        <motion.div 
          style={{ y: textY, opacity }}
          className="relative z-20 w-full h-full flex flex-col justify-between p-6 pt-28 md:p-12 md:pt-28"
        >
            {/* TOP SECTION */}
            <div className="w-full flex justify-between items-start mix-blend-difference">
                <div className="hidden md:block">
                   <p className="font-mono text-xs tracking-widest text-white/70 mb-2">EST. 2024</p>
                   <p className="font-mono text-xs tracking-widest text-white/70">GERMAN ENGINEERING</p>
                </div>
                
                {/* HUGE TOP TEXT - Staggered Animation */}
                <div className="font-serif text-[18vw] md:text-[14vw] leading-[0.8] text-white tracking-tighter mix-blend-overlay opacity-90 text-right md:text-left">
                  <SplitText text="Sonic" align="right" />
                </div>
            </div>

            {/* MIDDLE/DECORATIVE ELEMENTS */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6 flex justify-between items-center pointer-events-none mix-blend-difference">
               <motion.div 
                 initial={{ scaleX: 0 }}
                 animate={{ scaleX: 1 }}
                 transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
                 className="h-[1px] w-1/3 bg-white/50 hidden md:block"
               />
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.8, duration: 1 }}
                 className="text-center"
               >
                 <span className="font-mono text-xs md:text-sm tracking-[0.5em] text-white uppercase block">
                    The New Standard
                 </span>
               </motion.div>
               <motion.div 
                 initial={{ scaleX: 0 }}
                 animate={{ scaleX: 1 }}
                 transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
                 className="h-[1px] w-1/3 bg-white/50 hidden md:block"
               />
            </div>

            {/* BOTTOM SECTION */}
            <div className="w-full flex flex-col md:flex-row items-end justify-between mix-blend-difference">
                {/* HUGE BOTTOM TEXT - Staggered Animation */}
                 <div className="font-serif text-[18vw] md:text-[14vw] leading-[0.8] text-white tracking-tighter mix-blend-overlay opacity-90">
                  <SplitText text="Precision" />
                </div>

                <div className="flex flex-col items-end md:mb-6 mt-4 md:mt-0">
                    <motion.div 
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 1.5 }}
                       className="flex items-center gap-4"
                    >
                        <span className="font-mono text-xs text-white/80">[ SCROLL TO INITIALIZE ]</span>
                        <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center animate-spin-slow">
                             <span className="material-symbols-outlined text-sm">arrow_downward</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;