import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const words: { text: string; isAccent: boolean }[] = [
  { text: 'WE', isAccent: false },
  { text: 'BELIEVE', isAccent: false },
  { text: 'IN', isAccent: false },
  { text: 'THE', isAccent: false },
  { text: 'ESSENTIAL.', isAccent: true },
  { text: 'STRIPPING', isAccent: false },
  { text: 'AWAY', isAccent: false },
  { text: 'NOISE', isAccent: false },
  { text: 'TO', isAccent: false },
  { text: 'REVEAL', isAccent: false },
  { text: 'QUALITY.', isAccent: true },
];

const WordReveal = ({ word, start, end, scrollYProgress }: {
  word: { text: string; isAccent: boolean };
  start: number;
  end: number;
  scrollYProgress: any;
}) => {
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={word.isAccent ? 'accent-word' : ''}>
      {word.text}{' '}
    </motion.span>
  );
};

const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.4'],
  });

  return (
    <section className="bg-[#f4f4f4] text-black py-32 md:py-48">
      <div ref={containerRef} className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Manifesto Headline */}
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight uppercase">
              {words.map((word, i) => (
                <WordReveal
                  key={i}
                  word={word}
                  start={i / words.length}
                  end={(i + 1) / words.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </h2>
          </div>

          {/* Right: Description */}
          <div className="lg:pt-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-lg text-gray-500 leading-relaxed"
            >
              High-end daily routines demand tools that are as beautiful
              as they are functional. No gimmicks. Just pure performance
              wrapped in silence.
            </motion.p>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="section-label text-gray-400 mt-6 block"
            >
              PHILOSOPHY
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
