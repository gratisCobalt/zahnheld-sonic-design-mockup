import React from 'react';
import ScrollVelocity from './ScrollVelocity';

const MarqueeDivider: React.FC = () => {
  return (
    <section className="bg-black py-20 md:py-32 border-y border-white/5 overflow-hidden">
      <ScrollVelocity
        texts={[
          'HART ZU PLAQUE \u00A0\u00A0\u00A0·\u00A0\u00A0\u00A0 SANFT ZU ZÄHNEN \u00A0\u00A0\u00A0·\u00A0\u00A0\u00A0',
          '43.000 SCHWINGUNGEN \u00A0\u00A0\u00A0·\u00A0\u00A0\u00A0 10 WOCHEN AKKU \u00A0\u00A0\u00A0·\u00A0\u00A0\u00A0 USB-C MAGNETIC \u00A0\u00A0\u00A0·\u00A0\u00A0\u00A0',
        ]}
        velocity={60}
        className="text-white/[0.08] font-bold uppercase"
      />
    </section>
  );
};

export default MarqueeDivider;
