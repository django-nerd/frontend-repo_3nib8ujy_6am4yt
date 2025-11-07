import { useMemo, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookGrid from './components/BookGrid';
import BookForm from './components/BookForm';

export default function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('list'); // 'list' | 'create' | 'edit'
  const [current, setCurrent] = useState(null);
  const [viewing, setViewing] = useState(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return books;
    const q = search.toLowerCase();
    return books.filter((b) =>
      [b.title, b.author, b.notes].some((v) => (v || '').toLowerCase().includes(q))
    );
  }, [books, search]);

  const startCreate = () => {
    setCurrent(null);
    setMode('create');
  };

  const startEdit = (b) => {
    setCurrent(b);
    setMode('edit');
  };

  const saveBook = (data) => {
    if (mode === 'edit') {
      setBooks((prev) => prev.map((b) => (b.id === data.id ? { ...b, ...data } : b)));
    } else {
      setBooks((prev) => [{ ...data }, ...prev]);
    }
    setMode('list');
    setCurrent(null);
  };

  const removeBook = (b) => {
    setBooks((prev) => prev.filter((x) => x.id !== b.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b1a] via-[#0a0a18] to-[#0b0b1a] text-white">
      {/* Decorative ethereal glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-24 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute top-40 -right-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <Navbar onSearch={setSearch} />
      <Hero />

      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium tracking-wide text-white/90">Your Private Stacks</h2>
            <p className="text-sm text-white/60">Curate, annotate, and tend to your luminous catalog.</p>
          </div>
          {mode === 'list' && (
            <button onClick={startCreate} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 shadow hover:shadow-fuchsia-500/30 transition-transform hover:-translate-y-0.5">
              <Plus className="h-4 w-4" />
              Add Tome
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {mode !== 'list' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="relative"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-white/90">
                  {mode === 'create' ? 'Inscribe a New Tome' : 'Edit Tome'}
                </h3>
                <button onClick={() => setMode('list')} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-white/80 hover:text-white">
                  <X className="h-4 w-4" /> Close
                </button>
              </div>
              <BookForm initial={current} onSubmit={saveBook} onCancel={() => setMode('list')} />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <BookGrid
                books={filtered}
                onView={(b) => setViewing(b)}
                onEdit={startEdit}
                onDelete={removeBook}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Quick view modal */}
      <AnimatePresence>
        {viewing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-b from-slate-950/90 to-[#0b0b1a]/90 backdrop-blur p-4 sm:p-6"
            >
              <button onClick={() => setViewing(null)} className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/15 border border-white/10">
                <X className="h-4 w-4 text-white" />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-6">
                <div className="sm:col-span-2 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                  <div className="aspect-[3/4] bg-gradient-to-b from-indigo-950 to-slate-950">
                    {viewing.cover && (
                      <img src={viewing.cover} alt={viewing.title} className="h-full w-full object-cover" />
                    )}
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <h4 className="text-2xl font-medium text-white">{viewing.title}</h4>
                  <p className="text-white/70">by {viewing.author || 'Unknown'}</p>
                  {viewing.notes && (
                    <p className="mt-3 text-white/80">{viewing.notes}</p>
                  )}
                  {viewing.pdf && (
                    <a
                      href={viewing.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 shadow hover:shadow-fuchsia-500/30"
                    >
                      Read PDF
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative border-t border-white/10/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-center text-white/60">
          Crafted for wanderers of words. May your shelves be ever luminous.
        </div>
      </footer>
    </div>
  );
}
