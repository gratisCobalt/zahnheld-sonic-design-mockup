import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  baseOpacity?: number;
  enableBlur?: boolean;
  baseRotation?: number;
  blurStrength?: number;
}

const Word: React.FC<{
  word: string;
  index: number;
  total: number;
  scrollYProgress: any;
  baseOpacity: number;
  enableBlur: boolean;
  blurStrength: number;
}> = ({ word, index, total, scrollYProgress, baseOpacity, enableBlur, blurStrength }) => {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(scrollYProgress, [start, end], [baseOpacity, 1]);
  const blur = useTransform(scrollYProgress, [start, end], [blurStrength, 0]);
  const filter = useTransform(blur, (v) => (enableBlur ? `blur(${v}px)` : 'none'));

  return (
    <motion.span
      style={{ opacity, filter, display: 'inline-block', willChange: 'opacity, filter' }}
    >
      {word}&nbsp;
    </motion.span>
  );
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  baseOpacity = 0.1,
  enableBlur = true,
  baseRotation = 3,
  blurStrength = 4,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'start 0.35'],
  });

  const rotation = useTransform(scrollYProgress, [0, 1], [baseRotation, 0]);

  const words = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/\s+/).filter(Boolean);
  }, [children]);

  return (
    <motion.div
      ref={containerRef}
      style={{ rotate: rotation, transformOrigin: '0% 50%' }}
    >
      <p
        style={{
          fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)',
          lineHeight: 1.5,
          fontWeight: 500,
        }}
      >
        {words.map((word, i) => (
          <Word
            key={i}
            word={word}
            index={i}
            total={words.length}
            scrollYProgress={scrollYProgress}
            baseOpacity={baseOpacity}
            enableBlur={enableBlur}
            blurStrength={blurStrength}
          />
        ))}
      </p>
    </motion.div>
  );
};

export default ScrollReveal;
