import React from 'react';
import BlurText from './BlurText';
import ScrollReveal from './ScrollReveal';

const BrandStatement: React.FC = () => {
  return (
    <section className="bg-[#050505] py-32 md:py-48">
      <div className="max-w-4xl mx-auto px-8 flex flex-col items-center text-center">
        {/* Label */}
        <span className="section-label text-white/30 mb-10 block">THE PHILOSOPHY</span>

        {/* BlurText Headline */}
        <BlurText
          text="Gründlicher. Präziser. Spürbar sauber."
          delay={150}
          animateBy="words"
          direction="top"
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight justify-center"
        />

        {/* Divider */}
        <div className="w-16 h-[1px] bg-white/20 my-12 md:my-16" />

        {/* ScrollReveal paragraph */}
        <div className="text-white/80 max-w-3xl">
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur
            baseRotation={1}
            blurStrength={3}
          >
            Wir glauben an das Wesentliche. Wenn Technologie zurücktritt, übernimmt das Design. Was bleibt, ist pure Präzision — 43.000 Schwingungen pro Minute, verpackt in ein Gehäuse aus recyceltem Kunststoff. Kein Lärm. Kein Überfluss. Nur das perfekte Ergebnis, zweimal am Tag.
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;
