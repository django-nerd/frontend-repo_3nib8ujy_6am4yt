import { BookOpen, Search, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <header className="relative w-full">
      {/* Celestial ribbon background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-10 h-56 w-56 rounded-full bg-gradient-to-br from-blue-200/20 via-indigo-200/10 to-purple-200/10 blur-2xl" />
          <div className="absolute -bottom-24 right-16 h-64 w-64 rounded-full bg-gradient-to-br from-amber-200/20 via-yellow-100/10 to-white/10 blur-3xl" />
        </div>
        <div className="backdrop-blur-xl bg-gradient-to-b from-[#0a0d1a]/70 to-[#0b0f1d]/50 border-b border-white/10">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200/30 blur-lg rounded-full" />
                <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-blue-300 via-purple-300 to-amber-200 grid place-items-center ring-1 ring-white/30 shadow-lg shadow-blue-900/20">
                  <Sparkles className="h-5 w-5 text-slate-900/80" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-wide text-white">
                  Astral Wizard Library
                </h1>
                <p className="text-xs text-blue-100/80 -mt-0.5">Tomes of light, traced in starlight</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-100/70" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Seek titles, authors, or runes..."
                  className="w-72 pl-9 pr-3 py-2 rounded-full bg-white/10 text-white placeholder:text-blue-100/60 outline-none border border-white/10 focus:border-blue-200/60 focus:ring-2 focus:ring-blue-200/30 transition"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-300 via-purple-300 to-amber-200 text-slate-900 font-medium shadow hover:shadow-blue-300/30 transition-transform hover:-translate-y-0.5"
              >
                <BookOpen className="h-4 w-4" />
                Search
              </button>
            </form>
          </nav>
        </div>
      </div>
    </header>
  );
}
