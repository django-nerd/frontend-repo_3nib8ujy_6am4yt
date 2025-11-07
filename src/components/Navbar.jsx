import React from 'react';
import { Home, PlusCircle, BookOpen } from 'lucide-react';

const NavItem = ({ active, icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-150 ${
      active ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'
    }`}
    aria-current={active ? 'page' : undefined}
  >
    <Icon size={18} />
    <span className="font-medium">{label}</span>
  </button>
);

const Navbar = ({ current, onNavigate }) => {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <BookOpen size={18} />
          </div>
          <span className="text-lg font-semibold text-slate-900">Book Manager</span>
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
    </header>
  );
};

export default Navbar;
