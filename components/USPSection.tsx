import React from 'react';
import { motion } from 'framer-motion';
import { GlowingCards, GlowingCard } from './GlowingCards';

const usps = [
  {
    icon: 'precision_manufacturing',
    value: '43.000',
    unit: 'Schwingungen/Min',
    title: 'Ultraschall-Motor',
    desc: 'Magnetisch gelagerter Antrieb für bis zu 5,4x bessere Plaque-Entfernung im Zahnzwischenraum.',
  },
  {
    icon: 'battery_charging_full',
    value: '10',
    unit: 'Wochen Akku',
    title: 'USB-C Magnetic',
    desc: 'Nur 6 Ladungen pro Jahr. Magnetisches USB-C-Kabel — auflegen, fertig.',
  },
  {
    icon: 'tune',
    value: '5',
    unit: 'Modi',
    title: 'Drucksensor-KI',
    desc: 'Integrierter Sensor reduziert die Leistung bei zu viel Druck. Sanft geführt, perfekt getaktet.',
  },
  {
    icon: 'water_drop',
    value: 'IPX7',
    unit: 'Wasserdicht',
    title: 'Recycled Body',
    desc: 'Gehäuse aus 100% recyceltem Kunststoff. Hermetisch versiegelt — Dusche, Badewanne, überall.',
  },
];

const USPSection: React.FC = () => {
  return (
    <section className="bg-[#050505] py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="section-label text-white/30 mb-4 block">PERFORMANCE MEETS DESIGN</span>
          <h2 className="text-display text-white">Was uns antreibt.</h2>
        </motion.div>

        {/* Glowing Cards Grid */}
        <GlowingCards glowRadius={4} glowOpacity={1} gap="1.25rem">
          {usps.map((usp, i) => (
            <motion.div
              key={usp.icon}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="flex-1 min-w-[280px]"
            >
              <GlowingCard
                className="p-8 md:p-10 h-full"
                glowColor="#0071E3"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#0071E3] text-2xl">
                      {usp.icon}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        {usp.value}
                      </span>
                      <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">
                        {usp.unit}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">
                      {usp.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {usp.desc}
                    </p>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </GlowingCards>
      </div>
    </section>
  );
};

export default USPSection;
