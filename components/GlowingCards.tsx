import React, { useEffect, useRef, useState } from 'react';

export interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  className = '',
  glowColor = '#3b82f6',
}) => {
  return (
    <div
      className={`relative flex-1 min-w-[14rem] p-6 rounded-2xl text-white bg-[#111] border border-white/10 transition-all duration-400 ease-out ${className}`}
      style={{ '--glow-color': glowColor } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export interface GlowingCardsProps {
  children: React.ReactNode;
  className?: string;
  glowRadius?: number;
  glowOpacity?: number;
  gap?: string;
}

export const GlowingCards: React.FC<GlowingCardsProps> = ({
  children,
  className = '',
  glowRadius = 25,
  glowOpacity = 1,
  gap = '1.5rem',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      overlay.style.setProperty('--x', x + 'px');
      overlay.style.setProperty('--y', y + 'px');
      overlay.style.setProperty('--opacity', glowOpacity.toString());
      setShowOverlay(true);
    };

    const handleMouseLeave = () => {
      overlay.style.setProperty('--opacity', '0');
      setShowOverlay(false);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [glowOpacity]);

  const maskStyle = `radial-gradient(${glowRadius}rem ${glowRadius}rem at var(--x, 0) var(--y, 0), #000 1%, transparent 50%)`;

  return (
    <div className={`relative w-full ${className}`}>
      <div ref={containerRef} className="relative" style={{ padding: '1rem 0' }}>
        <div
          className="flex items-stretch justify-center flex-wrap"
          style={{ gap }}
        >
          {children}
        </div>

        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none select-none transition-opacity duration-400 ease-out"
          style={{
            WebkitMask: maskStyle,
            mask: maskStyle,
            opacity: showOverlay ? 'var(--opacity, 0)' : '0',
          }}
        >
          <div
            className="flex items-stretch justify-center flex-wrap"
            style={{ gap, padding: '1rem 0' }}
          >
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child) && child.type === GlowingCard) {
                const cardGlowColor = (child.props as GlowingCardProps).glowColor || '#3b82f6';
                return React.cloneElement(child as React.ReactElement<any>, {
                  style: {
                    backgroundColor: cardGlowColor + '15',
                    borderColor: cardGlowColor,
                    boxShadow: '0 0 0 1px inset ' + cardGlowColor,
                  },
                });
              }
              return child;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlowingCards;
