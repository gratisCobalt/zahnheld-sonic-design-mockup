import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

interface GlowContextType {
  x: number;
  y: number;
  containerRect: DOMRect | null;
  isHovering: boolean;
  glowRadius: number;
  glowOpacity: number;
}

const GlowContext = createContext<GlowContextType>({
  x: 0,
  y: 0,
  containerRect: null,
  isHovering: false,
  glowRadius: 25,
  glowOpacity: 1,
});

export interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}

export const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  className = '',
  glowColor = '#3b82f6',
  style,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { x, y, containerRect, isHovering, glowRadius, glowOpacity } = useContext(GlowContext);

  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({ opacity: 0 });

  useEffect(() => {
    if (!isHovering || !cardRef.current || !containerRect) {
      setGlowStyle({ opacity: 0 });
      return;
    }

    const cardRect = cardRef.current.getBoundingClientRect();
    const relX = x - (cardRect.left - containerRect.left);
    const relY = y - (cardRect.top - containerRect.top);
    const radius = glowRadius * 16; // rem to px

    // Check if glow circle intersects this card
    const centerX = relX;
    const centerY = relY;
    const dist = Math.sqrt(
      Math.pow(Math.max(0, Math.abs(centerX - cardRect.width / 2) - cardRect.width / 2), 2) +
      Math.pow(Math.max(0, Math.abs(centerY - cardRect.height / 2) - cardRect.height / 2), 2)
    );

    const intensity = Math.max(0, 1 - dist / radius);

    setGlowStyle({
      opacity: intensity * glowOpacity,
      background: `radial-gradient(${radius}px ${radius}px at ${relX}px ${relY}px, ${glowColor}15 0%, transparent 70%)`,
      borderColor: glowColor,
      boxShadow: `0 0 0 1px inset ${glowColor}`,
    });
  }, [x, y, containerRect, isHovering, glowRadius, glowOpacity, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`relative flex-1 min-w-[14rem] p-6 rounded-2xl text-white bg-[#111] border border-white/10 transition-colors duration-400 ease-out overflow-hidden ${className}`}
      style={style}
    >
      {/* Glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-400 ease-out"
        style={glowStyle}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export interface GlowingCardsProps {
  children: React.ReactNode;
  className?: string;
  glowRadius?: number;
  glowOpacity?: number;
  gap?: string;
  enableGlow?: boolean;
}

export const GlowingCards: React.FC<GlowingCardsProps> = ({
  children,
  className = '',
  glowRadius = 25,
  glowOpacity = 1,
  gap = '1.5rem',
  enableGlow = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseState, setMouseState] = useState<{ x: number; y: number; isHovering: boolean }>({
    x: 0, y: 0, isHovering: false,
  });
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setContainerRect(rect);
    setMouseState({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovering: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseState((prev) => ({ ...prev, isHovering: false }));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enableGlow) return;

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enableGlow, handleMouseMove, handleMouseLeave]);

  return (
    <GlowContext.Provider
      value={{
        x: mouseState.x,
        y: mouseState.y,
        containerRect,
        isHovering: mouseState.isHovering,
        glowRadius,
        glowOpacity,
      }}
    >
      <div className={`relative w-full ${className}`}>
        <div ref={containerRef} className="relative" style={{ padding: '1rem 0' }}>
          <div
            className="flex items-stretch justify-center flex-wrap"
            style={{ gap }}
          >
            {children}
          </div>
        </div>
      </div>
    </GlowContext.Provider>
  );
};

export default GlowingCards;
