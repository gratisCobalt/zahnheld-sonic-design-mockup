import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FEATURES } from '../types';
import { useCountUp } from './useCountUp';

const NumericCard = ({ feat, index }: { feat: typeof FEATURES[0]; index: number }) => {
  const numericValue = parseInt(feat.value.replace(/,/g, ''), 10);
  const [count, ref] = useCountUp(numericValue, 2000);
  const formatted = numericValue >= 1000 ? count.toLocaleString() : count.toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="border-t border-white/10 pt-8 group"
    >
      <span className="material-symbols-outlined text-xl text-gray-500 mb-4 block group-hover:text-white transition-colors duration-500">
        {feat.icon}
      </span>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-5xl md:text-6xl font-light font-mono tracking-tight">{formatted}</span>
        {feat.suffix && <span className="section-label text-gray-500">{feat.suffix}</span>}
      </div>
      <h4 className="section-label text-white/80 mb-2">{feat.label}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{feat.desc}</p>
    </motion.div>
  );
};

const StaticCard = ({ feat, index }: { feat: typeof FEATURES[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="border-t border-white/10 pt-8 group"
    >
      <span className="material-symbols-outlined text-xl text-gray-500 mb-4 block group-hover:text-white transition-colors duration-500">
        {feat.icon}
      </span>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-5xl md:text-6xl font-light font-mono tracking-tight">{feat.value}</span>
        {feat.suffix && <span className="section-label text-gray-500">{feat.suffix}</span>}
      </div>
      <h4 className="section-label text-white/80 mb-2">{feat.label}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{feat.desc}</p>
    </motion.div>
  );
};

const Features: React.FC = () => {
  return (
    <section className="bg-black text-white py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />
      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <span className="section-label text-gray-500 mb-4 block">PERFORMANCE DATA</span>
          <h2 className="text-display">
            BY THE<br />NUMBERS.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-20">
          {FEATURES.map((feat, i) => {
            const isNumeric = /^[\d,]+$/.test(feat.value);
            return isNumeric
              ? <NumericCard key={i} feat={feat} index={i} />
              : <StaticCard key={i} feat={feat} index={i} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
