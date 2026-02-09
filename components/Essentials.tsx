import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IMAGES } from '../types';

interface EssentialItem {
  image: string;
  number: string;
  title: string;
  subtitle: string;
  offsetClass: string;
}

const items: EssentialItem[] = [
  { image: IMAGES.productMain, number: '01', title: 'SONIC SERIES', subtitle: 'The core of your ritual.', offsetClass: '' },
  { image: IMAGES.bathroom, number: '02', title: 'HYDRO CARE', subtitle: 'Precision interdental cleaning.', offsetClass: 'md:mt-16' },
  { image: IMAGES.lifestyle, number: '03', title: 'TRAVEL & MORE', subtitle: 'Enhance your journey.', offsetClass: 'md:mt-32' },
];

const EssentialCard = ({ item, index }: { item: EssentialItem; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-50px' }}
      className={item.offsetClass}
    >
      <div ref={cardRef} className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-200 cursor-pointer group">
        <motion.img
          src={item.image}
          alt={item.title}
          style={{ scale: imgScale }}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
      </div>
      <span className="section-label text-gray-400 mb-1 block">{item.number}</span>
      <h3 className="text-xl font-bold uppercase tracking-tight mb-1">{item.title}</h3>
      <p className="text-sm text-gray-500">{item.subtitle}</p>
    </motion.div>
  );
};

const Essentials: React.FC = () => {
  return (
    <section className="bg-[#f4f4f4] text-black py-32 md:py-48">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="section-label text-gray-400 block mb-2">THE ESSENTIALS</span>
          </div>
          <a href="#" className="section-label text-black hover:text-gray-500 transition-colors cursor-pointer">
            VIEW ALL
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => (
            <EssentialCard key={item.number} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Essentials;
