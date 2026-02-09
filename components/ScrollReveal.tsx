import React, { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  baseOpacity?: number;
  enableBlur?: boolean;
  baseRotation?: number;
  blurStrength?: number;
  staggerDelay?: number;
  threshold?: number;
  duration?: number;
  springConfig?: { damping?: number; stiffness?: number; mass?: number };
  containerClassName?: string;
  textClassName?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  baseOpacity = 0.1,
  enableBlur = true,
  baseRotation = 3,
  blurStrength = 4,
  staggerDelay = 0.05,
  threshold = 0.5,
  duration = 0.8,
  springConfig = { damping: 25, stiffness: 100, mass: 1 },
  containerClassName = '',
  textClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: threshold,
  });

  const words = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/\s+/).filter(Boolean);
  }, [children]);

  const containerVariants = {
    hidden: { rotate: baseRotation },
    visible: {
      rotate: 0,
      transition: {
        duration: duration * 0.5,
        staggerChildren: staggerDelay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        ...springConfig,
        duration,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={containerClassName}
      style={{ transformOrigin: '0% 50%' }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <p
        className={textClassName}
        style={{
          fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)',
          lineHeight: 1.5,
          fontWeight: 500,
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            style={{ display: 'inline-block', willChange: 'opacity, filter' }}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </p>
    </motion.div>
  );
};

export default ScrollReveal;
