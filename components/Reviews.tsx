import React, { useRef, useMemo, useContext } from 'react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import type { MotionValue } from 'framer-motion';

/* --- Velocity Context for shared scroll velocity --- */
const VelocityContext = React.createContext<MotionValue<number> | null>(null);

function VelocityProvider({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    return sign * Math.min(5, (Math.abs(v) / 1000) * 5);
  });

  return (
    <VelocityContext.Provider value={velocityFactor}>
      <div className="relative w-full">{children}</div>
    </VelocityContext.Provider>
  );
}

/* --- Marquee Row --- */
interface MarqueeRowProps {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
  className?: string;
}

function MarqueeRow({ children, baseVelocity = 5, direction = 1, className = '' }: MarqueeRowProps) {
  const velocityFactor = useContext(VelocityContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const prevTimeRef = useRef<number | null>(null);
  const unitWidthRef = useRef(0);
  const baseXRef = useRef(0);
  const isInView = useInView(containerRef, { margin: '20%' });

  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  // Measure first block
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const block = container.querySelector('.marquee-block') as HTMLElement;
    if (block) unitWidthRef.current = block.scrollWidth;
  }, [childrenArray]);

  useAnimationFrame((time) => {
    if (!isInView) return;
    if (prevTimeRef.current == null) prevTimeRef.current = time;
    const dt = Math.max(0, (time - prevTimeRef.current) / 1000);
    prevTimeRef.current = time;

    const unitWidth = unitWidthRef.current;
    if (unitWidth <= 0) return;

    const velocity = velocityFactor ? velocityFactor.get() : 0;
    const speedMultiplier = Math.min(5, Math.abs(velocity));
    const scrollDirection = velocity >= 0 ? 1 : -1;
    const currentDirection = direction * scrollDirection;

    const pixelsPerSecond = (unitWidth * baseVelocity) / 100;
    const moveBy = currentDirection * pixelsPerSecond * (1 + speedMultiplier) * dt;

    let newX = baseXRef.current + moveBy;
    if (newX >= unitWidth) newX = newX % unitWidth;
    else if (newX <= 0) newX = unitWidth + (newX % unitWidth);
    baseXRef.current = newX;
    x.set(newX);
  });

  const xTransform = useTransform(x, (v) => `translate3d(${-v}px,0,0)`);

  return (
    <div ref={containerRef} className={`w-full overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex will-change-transform transform-gpu"
        style={{ transform: xTransform }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`inline-flex shrink-0 ${i === 0 ? 'marquee-block' : ''}`}>
            {childrenArray}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* --- Review Card --- */
interface Review {
  name: string;
  rating: number;
  text: string;
  verified: boolean;
}

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="inline-flex flex-col w-[320px] md:w-[380px] bg-[#111] border border-white/10 rounded-2xl p-6 mx-3 shrink-0 select-none">
    {/* Stars */}
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-sm"
          style={{ color: i < review.rating ? '#0071E3' : 'rgba(255,255,255,0.15)' }}
        >
          star
        </span>
      ))}
    </div>
    {/* Text */}
    <p className="text-sm text-white/70 leading-relaxed mb-4 whitespace-normal line-clamp-3">
      {review.text}
    </p>
    {/* Author */}
    <div className="mt-auto flex items-center gap-2">
      <span className="text-xs font-semibold text-white/90">{review.name}</span>
      {review.verified && (
        <span className="text-[10px] text-[#0071E3] font-semibold uppercase tracking-wider flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">verified</span>
          Verifiziert
        </span>
      )}
    </div>
  </div>
);

/* --- Reviews Data --- */
const reviews: Review[] = [
  { name: 'Markus L.', rating: 5, text: 'Die beste Schallzahnbürste die ich je hatte. Unglaublich leise und die Zähne fühlen sich an wie nach einer professionellen Reinigung.', verified: true },
  { name: 'Sarah K.', rating: 5, text: 'Nach 3 Wochen hat mein Zahnarzt den Unterschied bemerkt. Weniger Zahnstein, gesünderes Zahnfleisch. Bin absolut überzeugt.', verified: true },
  { name: 'Thomas W.', rating: 5, text: 'USB-C Laden ist ein Game-Changer. Kein extra Kabel mehr im Badezimmer. Und der Akku hält wirklich ewig.', verified: true },
  { name: 'Julia M.', rating: 4, text: 'Das Design ist wunderschön — sieht aus wie ein Apple-Produkt für das Badezimmer. Die 5 Modi decken wirklich alles ab.', verified: true },
  { name: 'Andrea B.', rating: 5, text: 'Endlich eine elektrische Zahnbürste die nicht hässlich aussieht. Die Drucksensor-Funktion ist genial — kein zu festes Putzen mehr.', verified: true },
  { name: 'Felix R.', rating: 5, text: 'Habe die G3 seit 6 Monaten und bin begeistert. IPX7 heisst ich nehme sie ohne Bedenken mit unter die Dusche.', verified: true },
];

/* --- Main Section --- */
const Reviews: React.FC = () => {
  return (
    <section className="bg-[#050505] py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="section-label text-white/30 mb-4 block">KUNDENSTIMMEN</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Was unsere Kunden sagen.</h2>
        </motion.div>
      </div>

      {/* Scroll-velocity marquee rows */}
      <VelocityProvider>
        <div className="flex flex-col gap-4">
          <MarqueeRow baseVelocity={3} direction={1}>
            {reviews.slice(0, 3).map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </MarqueeRow>
          <MarqueeRow baseVelocity={3} direction={-1}>
            {reviews.slice(3, 6).map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </MarqueeRow>
        </div>
      </VelocityProvider>
    </section>
  );
};

export default Reviews;
