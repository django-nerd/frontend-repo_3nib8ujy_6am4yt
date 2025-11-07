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
      <div className="backdrop-blur-md bg-gradient-to-b from-[#0b0b1a]/70 to-[#0b0b1a]/30 border-b border-white/10">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/30 blur-md rounded-full" />
              <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 grid place-items-center shadow-lg shadow-purple-900/30">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-wide text-white/90">
                The Aureate Library
              </h1>
              <p className="text-xs text-white/60 -mt-0.5">Where stories glow with starlight</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tomes, authors, or sigils..."
                className="w-72 pl-9 pr-3 py-2 rounded-full bg-white/10 text-white placeholder:text-white/50 outline-none border border-white/10 focus:border-indigo-300/60 focus:ring-2 focus:ring-indigo-400/30 transition"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow hover:shadow-fuchsia-500/30 transition-transform hover:-translate-y-0.5"
            >
              <BookOpen className="h-4 w-4" />
              Search
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
