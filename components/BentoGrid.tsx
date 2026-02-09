import React from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from './useCountUp';

const BentoGrid: React.FC = () => {
  const [vibCount, vibRef] = useCountUp(43000, 2500);

  return (
    <section className="bg-[#050505] py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="section-label text-white/30 mb-4 block">BY THE NUMBERS</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Präzision in Zahlen.</h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[220px]">

          {/* Card 1: Large — 43.000 Schwingungen (spans 2 rows on left) */}
          <motion.div
            ref={vibRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="md:row-span-2 bg-gradient-to-br from-[#0a1628] to-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Blue glow background */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#0071E3]/10 rounded-full blur-[80px] pointer-events-none" />

            <div>
              <span className="material-symbols-outlined text-[#0071E3] text-3xl mb-4 block">
                precision_manufacturing
              </span>
              <span className="section-label text-white/30 block">PRO MINUTE</span>
            </div>
            <div>
              <span className="text-5xl md:text-7xl font-bold text-white tracking-tighter block leading-none">
                {vibCount.toLocaleString('de-DE')}
              </span>
              <span className="text-sm text-white/40 mt-2 block">Schwingungen für maximale Plaque-Entfernung</span>
            </div>
          </motion.div>

          {/* Card 2: Top right — 10 Wochen Akku */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="bg-[#111] border border-white/10 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
          >
            <span className="material-symbols-outlined text-[#0071E3] text-2xl">
              battery_charging_full
            </span>
            <div>
              <span className="text-4xl font-bold text-white tracking-tight block leading-none">10 Wochen</span>
              <span className="text-xs text-white/40 mt-1 block">Akku — nur 6x laden pro Jahr</span>
            </div>
          </motion.div>

          {/* Card 3: Mid right — 5 Putzmodi */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="bg-[#111] border border-white/10 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
          >
            <span className="material-symbols-outlined text-[#0071E3] text-2xl">
              tune
            </span>
            <div>
              <div className="flex gap-2 mb-2">
                {['Clean', 'White', 'Polish', 'Soft', 'Deep'].map((mode, i) => (
                  <div
                    key={mode}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: i === 0 ? '#0071E3' : 'rgba(255,255,255,0.15)',
                      boxShadow: i === 0 ? '0 0 8px rgba(0,113,227,0.5)' : 'none',
                    }}
                  />
                ))}
              </div>
              <span className="text-4xl font-bold text-white tracking-tight block leading-none">5 Modi</span>
              <span className="text-xs text-white/40 mt-1 block">Drucksensor passt Intensität an</span>
            </div>
          </motion.div>

          {/* Card 4: Bottom wide — USB-C Magnetic + IPX7 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-8 flex items-center gap-8 relative overflow-hidden"
          >
            {/* Left content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-[#0071E3] text-2xl">
                  cable
                </span>
                <span className="section-label text-white/30">MAGNETIC CHARGING</span>
              </div>
              <span className="text-2xl md:text-3xl font-bold text-white tracking-tight block">USB-C Magnetic</span>
              <span className="text-sm text-white/40 mt-1 block">Auflegen. Fertig. Kein Fummel, kein Ärger.</span>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[1px] h-16 bg-white/10" />

            {/* Right content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-[#0071E3] text-2xl">
                  recycling
                </span>
                <span className="section-label text-white/30">SUSTAINABILITY</span>
              </div>
              <span className="text-2xl md:text-3xl font-bold text-white tracking-tight block">100% Recycled</span>
              <span className="text-sm text-white/40 mt-1 block">Gehäuse aus recyceltem Kunststoff.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
