import React from 'react';
import { Search, Menu } from 'lucide-react';
import { navLinks } from '../mock';

export default function Header() {
  const [active, setActive] = React.useState('Home');
  return (
    <header className="bg-navy text-white sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 border-2 border-gold rounded flex items-center justify-center">
            <span className="serif text-gold text-2xl font-bold">R</span>
          </div>
          <div className="leading-tight">
            <div className="text-gold font-bold tracking-wider text-lg">RAMANI</div>
            <div className="text-gold tracking-[0.3em] text-[10px]">GROUPS</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className={`nav-link text-sm font-medium ${active === link ? 'active text-white' : 'text-white/90'}`}
            >
              {link}
            </button>
          ))}
          <button aria-label="Search" className="hover:text-gold transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </nav>

        <button className="lg:hidden" aria-label="Menu">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
