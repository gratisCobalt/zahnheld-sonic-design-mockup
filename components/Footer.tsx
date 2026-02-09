import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="text-2xl font-bold tracking-tighter uppercase block mb-6">ZAHNHELD</a>
            <p className="text-gray-500 text-sm leading-relaxed">
              Defining the future of oral care through silence, simplicity, and sustainability.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6 text-xs text-gray-400">Product</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              {['Sonic Toothbrush', 'Refill Heads', 'Travel Case', 'Sets'].map(item => (
                <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6 text-xs text-gray-400">Company</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              {['Our Story', 'Sustainability', 'Support', 'Contact'].map(item => (
                <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6 text-xs text-gray-400">Newsletter</h4>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white focus:ring-0 text-sm transition-colors"
              />
              <button className="bg-white text-black font-bold uppercase text-xs tracking-widest py-3 px-4 rounded-sm hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-10">
          <p className="text-xs text-gray-600 mb-4 md:mb-0">© 2024 Zahnheld GmbH. All rights reserved.</p>
          <div className="flex gap-6">
             <span className="text-gray-600 hover:text-white cursor-pointer transition-colors text-xs uppercase tracking-wider">Privacy</span>
             <span className="text-gray-600 hover:text-white cursor-pointer transition-colors text-xs uppercase tracking-wider">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;