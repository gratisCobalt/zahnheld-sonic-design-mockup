import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PartLabel: React.FC<{
  title: string;
  specs: string;
  side: 'left' | 'right';
  yOffset: any;
  opacity: any;
}> = ({ title, specs, side, yOffset, opacity }) => {
  return (
    <motion.div
      style={{ top: yOffset, opacity }}
      className={`absolute ${side === 'left' ? 'right-[55%] pr-16 text-right' : 'left-[55%] pl-16 text-left'} top-1/2 -translate-y-1/2 w-64 hidden md:block pointer-events-none`}
    >
      <div className={`flex flex-col ${side === 'left' ? 'items-end' : 'items-start'}`}>
        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1">{title}</h4>
        <p className="text-gray-400 font-mono text-[10px] border-t border-white/20 pt-1 mt-1 inline-block uppercase">{specs}</p>
      </div>
      <div className={`absolute top-1/2 ${side === 'left' ? 'right-0' : 'left-0'} w-12 h-[1px] bg-gradient-to-r from-white/50 to-transparent ${side === 'left' ? 'origin-right' : 'origin-left'}`} />
      <div className={`absolute top-1/2 ${side === 'left' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]`} />
    </motion.div>
  );
};

const Engineering: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // SIDEWAYS EXPLOSION LOGIC
  // Explosion range: 15% to 55% — housing fades, parts spread sideways (reduced distances)
  const range: [number, number] = [0.15, 0.55];

  // Inner parts START hidden, BECOME visible as explosion begins
  const partsOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  // 1. Brush Head — moves LEFT (reduced from -200% to -80%)
  const headX = useTransform(scrollYProgress, range, ["0%", "-80%"]);
  const headY = useTransform(scrollYProgress, range, ["0%", "-15%"]);

  // 2. Shaft/Neck — moves LEFT (reduced from -140% to -50%)
  const shaftX = useTransform(scrollYProgress, range, ["0%", "-50%"]);
  const shaftY = useTransform(scrollYProgress, range, ["0%", "-10%"]);

  // 3. Housing — starts VISIBLE, fades OUT as parts explode
  const housingOpacity = useTransform(scrollYProgress, [0.12, 0.3], [1, 0]);
  const housingScale = useTransform(scrollYProgress, range, [1, 1.02]);

  // 4. Motor — moves RIGHT (reduced from 160% to 70%)
  const motorX = useTransform(scrollYProgress, range, ["0%", "70%"]);
  const motorY = useTransform(scrollYProgress, range, ["0%", "-20%"]);

  // 5. Battery — moves RIGHT (reduced from 200% to 85%)
  const batteryX = useTransform(scrollYProgress, range, ["0%", "85%"]);
  const batteryY = useTransform(scrollYProgress, range, ["0%", "15%"]);

  // 6. PCB — moves RIGHT (reduced from 250% to 100%)
  const pcbX = useTransform(scrollYProgress, range, ["0%", "100%"]);
  const pcbY = useTransform(scrollYProgress, range, ["0%", "30%"]);

  // 7. Charging Coil — moves LEFT (reduced from -180% to -70%)
  const coilX = useTransform(scrollYProgress, range, ["0%", "-70%"]);
  const coilY = useTransform(scrollYProgress, range, ["0%", "25%"]);

  // Labels + title text appear with scroll
  const labelOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#050505] z-30">

      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

        {/* Background Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none"
             style={{
               backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
               backgroundSize: '100px 100px'
             }}>
        </div>

        {/* Title — fades in with scroll */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute top-24 left-0 w-full text-center z-20 mix-blend-difference pointer-events-none"
        >
          <span className="section-label text-gray-500 mb-3 block">EXPLODED VIEW</span>
          <h2 className="text-white font-bold uppercase tracking-tighter text-3xl md:text-5xl mb-2">Engineering</h2>
          <div className="w-16 h-[1px] bg-white/30 mx-auto mt-4 animate-line-draw"></div>
        </motion.div>

        {/* --- MAIN ASSEMBLY CONTAINER --- */}
        <div className="relative w-[280px] md:w-[320px] h-[600px] flex items-center justify-center z-10 perspective-1000 translate-y-16 md:translate-y-24">

          {/* A. BRUSH HEAD — starts hidden */}
          <motion.div style={{ x: headX, y: headY, opacity: partsOpacity }} className="absolute top-[10%] z-50 flex flex-col items-center w-full">
             <PartLabel title="Hybrid Bristles" specs="Activated Charcoal / PBT" side="left" yOffset="20px" opacity={labelOpacity} />
             <div className="w-5 h-10 bg-gradient-to-b from-gray-200 to-gray-400 rounded-sm mb-[2px] relative overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="w-full h-[1px] bg-black/10 mt-2"></div>
                <div className="w-full h-[1px] bg-black/10 mt-2"></div>
                <div className="w-full h-[1px] bg-black/10 mt-2"></div>
             </div>
             <div className="w-6 h-14 bg-gray-100 rounded-t-full shadow-lg border-b border-gray-300 relative">
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-300 rounded-full opacity-50"></div>
             </div>
          </motion.div>

          {/* B. SHAFT / METAL NECK — starts hidden */}
          <motion.div style={{ x: shaftX, y: shaftY, opacity: partsOpacity }} className="absolute top-[22%] z-40 flex flex-col items-center w-full">
            <PartLabel title="Vibration Shaft" specs="Stainless Steel 316L" side="left" yOffset="20px" opacity={labelOpacity} />
            <div className="w-2 h-20 bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 shadow-inner"></div>
            <div className="w-10 h-3 bg-gray-300 rounded-full mt-[-2px] border-t border-white/50"></div>
          </motion.div>

          {/* C. OUTER HOUSING — starts VISIBLE, fades out */}
          <motion.div
            style={{ opacity: housingOpacity, scale: housingScale }}
            className="absolute top-[30%] w-[90px] h-[400px] bg-gradient-to-r from-[#111] via-[#222] to-[#050505] rounded-[45px] border border-white/10 shadow-2xl z-30 flex flex-col items-center py-10"
          >
             <div className="w-10 h-10 rounded-full border border-white/10 mt-8 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="w-4 h-4 bg-white/10 rounded-full"></div>
             </div>
             <div className="mt-auto mb-8 flex flex-col items-center gap-2 opacity-50">
                 <div className="w-1 h-1 bg-white rounded-full"></div>
                 <div className="w-1 h-1 bg-white rounded-full"></div>
                 <div className="w-1 h-1 bg-white rounded-full"></div>
             </div>
          </motion.div>

          {/* D. MOTOR — starts hidden */}
          <motion.div style={{ x: motorX, y: motorY, opacity: partsOpacity }} className="absolute top-[32%] z-20 flex flex-col items-center w-full">
             <PartLabel title="Maglev Engine" specs="60,000 Movements/Min" side="right" yOffset="40px" opacity={labelOpacity} />
             <div className="w-[44px] h-[90px] bg-gradient-to-r from-gray-500 via-gray-300 to-gray-600 rounded-lg border border-gray-400 shadow-xl relative overflow-hidden group">
                <div className="absolute top-2 left-[2px] right-[2px] h-14 bg-[repeating-linear-gradient(45deg,#b87333,#b87333_2px,#804a1f_2px,#804a1f_4px)] rounded opacity-90 border border-[#b87333]"></div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-glow shadow-[0_0_10px_#3b82f6]"></div>
                </div>
             </div>
          </motion.div>

          {/* E. BATTERY & CHASSIS — starts hidden */}
          <motion.div style={{ x: batteryX, y: batteryY, opacity: partsOpacity }} className="absolute top-[48%] z-10 flex flex-col items-center w-full">
             <PartLabel title="Energy Core" specs="Li-Ion 14500 / 800mAh" side="right" yOffset="80px" opacity={labelOpacity} />
             <div className="w-[50px] h-[160px] bg-gradient-to-r from-blue-950 via-blue-900 to-black rounded-lg border border-blue-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(30,58,138,0.2)] relative">
                <div className="absolute top-4 left-2 w-full h-[1px] bg-blue-500/20"></div>
                <div className="absolute bottom-4 left-2 w-full h-[1px] bg-blue-500/20"></div>
                <span className="text-blue-200/20 font-mono font-bold -rotate-90 text-[10px] tracking-[0.3em] whitespace-nowrap">HIGH DENSITY CELL</span>
             </div>
          </motion.div>

          {/* F. MAIN PCB — starts hidden */}
          <motion.div style={{ x: pcbX, y: pcbY, opacity: partsOpacity }} className="absolute top-[48%] z-15 w-[36px] h-[140px] bg-[#0d2e16] border border-[#26a648]/30 rounded shadow-xl flex flex-col items-center py-2 backdrop-blur-md">
             <PartLabel title="Smart Logic" specs="Pressure Sensor AI" side="right" yOffset="70px" opacity={labelOpacity} />
             <div className="w-6 h-6 bg-black border border-gray-700 rounded-sm mb-2 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 border border-gray-500 rounded-full"></div>
                </div>
             </div>
             <div className="w-5 h-10 bg-black border border-gray-700 rounded-sm mb-2"></div>
             <div className="w-full h-full absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10 pointer-events-none"></div>
             <div className="w-2 h-2 bg-red-500 rounded-full mt-auto shadow-[0_0_8px_#ef4444] animate-pulse-glow"></div>
          </motion.div>

          {/* G. CHARGING COIL — starts hidden */}
          <motion.div style={{ x: coilX, y: coilY, opacity: partsOpacity }} className="absolute bottom-[12%] z-20 flex flex-col items-center w-full">
             <PartLabel title="Inductive Base" specs="Qi Standard Comp." side="left" yOffset="15px" opacity={labelOpacity} />
             <div className="w-[54px] h-[25px] rounded-full border-[3px] border-[#d97706] bg-black/50 shadow-[0_0_15px_rgba(217,119,6,0.3)] relative animate-pulse-glow">
                <div className="absolute inset-0 rounded-full border border-orange-900/50"></div>
             </div>
             <div className="w-[60px] h-[15px] bg-[#111] rounded-b-2xl border-t border-gray-800 mt-[-12px]"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Engineering;
