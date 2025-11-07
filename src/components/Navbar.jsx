import React from 'react';
import { Home, PlusCircle, BookOpen } from 'lucide-react';

const NavItem = ({ active, icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 shadow-sm border ${
      active
        ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-slate-900 border-amber-300 shadow'
        : 'text-amber-900 border-amber-200 bg-white/70 hover:bg-white hover:shadow'
    }`}
    aria-current={active ? 'page' : undefined}
  >
    <Icon size={18} />
    <span className="font-medium">{label}</span>
  </button>
);

const Navbar = ({ current, onNavigate }) => {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur bg-white/70 border-b border-amber-200/80">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 flex items-center justify-center text-slate-900 shadow">
            <BookOpen size={18} />
          </div>
          <span className="text-lg md:text-xl font-serif tracking-wide text-slate-900">The Grand Library</span>
        </div>
        <nav className="flex items-center gap-2">
          <NavItem
            icon={Home}
            label="Home"
            active={current === 'home'}
            onClick={() => onNavigate('home')}
          />
          <NavItem
            icon={PlusCircle}
            label="Add Book"
            active={current === 'add'}
            onClick={() => onNavigate('add')}
          />
        </nav>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
    </header>
  );
};

export default Navbar;
