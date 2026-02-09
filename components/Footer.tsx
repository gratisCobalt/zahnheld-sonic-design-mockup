import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-2xl font-bold tracking-tighter uppercase mb-4">ZAHNHELD.</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Defining the intersection of oral health and minimalist design. Engineered in Germany.
            </p>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="section-label text-gray-400 mb-6">SHOP</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {['Sonic', 'Refill Heads', 'Travel Case', 'Sets'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="section-label text-gray-400 mb-6">COMPANY</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {['About', 'Sustainability', 'Shipping', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8">
          <p className="text-xs text-gray-600">&copy; 2025 Zahnheld GmbH</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-xs text-gray-600 hover:text-white transition-colors uppercase tracking-wider">
              Privacy
            </a>
            <a href="#" className="text-xs text-gray-600 hover:text-white transition-colors uppercase tracking-wider">
              Imprint
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
