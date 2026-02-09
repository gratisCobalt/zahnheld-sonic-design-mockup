import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PRODUCTS, IMAGES, Product } from '../types';

const ProductCard = ({ product, reversed }: { product: Product; reversed: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const imgSrc = IMAGES[product.image as keyof typeof IMAGES];

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* Text Panel */}
      <div
        className={`flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 relative overflow-hidden ${
          reversed ? 'lg:order-2 bg-[#f4f4f4] text-black' : 'lg:order-1 bg-surface'
        }`}
      >
        {/* Watermark number */}
        <span
          className={`absolute top-8 left-8 text-[20vw] lg:text-[10vw] font-bold leading-none select-none pointer-events-none ${
            reversed ? 'text-black/[0.04]' : 'text-white/[0.04]'
          }`}
        >
          {product.number}
        </span>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <span className="section-label text-gray-500 mb-4 block">{product.number}</span>
          <h3 className="mb-8" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', lineHeight: 0.9, letterSpacing: '-0.03em', fontWeight: 700, textTransform: 'uppercase' as const }}>
            {product.headline.split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h3>
          <p className={`text-lg leading-relaxed max-w-md mb-10 ${reversed ? 'text-gray-500' : 'text-gray-400'}`}>
            {product.description}
          </p>

          <div className="flex items-center gap-6">
            <button
              className={`px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                reversed
                  ? 'border border-black/30 text-black hover:bg-black hover:text-white'
                  : 'border border-white/30 text-white hover:bg-white hover:text-black'
              }`}
            >
              {product.cta}
            </button>
            <div>
              <span className="section-label text-gray-500 block">PRICE</span>
              <span className="text-3xl font-light">{product.price}</span>
            </div>
          </div>

          {product.variant && (
            <p className="mt-8 section-label text-gray-600">{product.variant}</p>
          )}
        </motion.div>
      </div>

      {/* Image Panel */}
      <div className={`relative overflow-hidden min-h-[60vh] lg:min-h-screen ${reversed ? 'lg:order-1' : 'lg:order-2'}`}>
        <motion.img
          src={imgSrc}
          alt={product.name}
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
    </div>
  );
};

const ProductShowcase: React.FC = () => {
  return (
    <section className="bg-off-black text-white">
      {PRODUCTS.map((product, i) => (
        <ProductCard key={product.id} product={product} reversed={i % 2 !== 0} />
      ))}
    </section>
  );
};

export default ProductShowcase;
