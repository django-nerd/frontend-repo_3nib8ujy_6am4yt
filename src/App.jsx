import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import BookGrid from './components/BookGrid';
import BookForm from './components/BookForm';
import { Search } from 'lucide-react';

function App() {
  // Temporary client-side state to wire up UI. Backend endpoints can replace these handlers later.
  const [route, setRoute] = useState('home'); // 'home' | 'add' | 'edit' | 'detail'
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const [alert, setAlert] = useState(null); // {type: 'success'|'error', message}

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter((b) =>
      [b.title, b.author, b.genre].filter(Boolean).some((v) => String(v).toLowerCase().includes(q))
    );
  }, [books, query]);

  const handleCreate = async (values) => {
    const id = crypto.randomUUID();
    const coverUrl = values.coverFile ? URL.createObjectURL(values.coverFile) : values.coverUrl || '';
    const pdfUrl = values.pdfFile ? URL.createObjectURL(values.pdfFile) : values.pdfUrl || '';
    const newBook = { id, title: values.title, author: values.author, genre: values.genre, description: values.description, coverUrl, pdfUrl };
    setBooks((prev) => [newBook, ...prev]);
    showAlert('success', 'Your tome has been added to the library');
    setRoute('home');
  };

  const handleEdit = async (values) => {
    if (!selected) return;
    const coverUrl = values.coverFile ? URL.createObjectURL(values.coverFile) : (values.coverUrl || selected.coverUrl || '');
    const pdfUrl = values.pdfFile ? URL.createObjectURL(values.pdfFile) : (values.pdfUrl || selected.pdfUrl || '');
    setBooks((prev) => prev.map((b) => (b.id === selected.id ? { ...b, ...values, coverUrl, pdfUrl } : b)));
    showAlert('success', 'The manuscript was updated');
    setRoute('home');
    setSelected(null);
  };

  const handleDelete = async (book) => {
    setBooks((prev) => prev.filter((b) => b.id !== book.id));
    showAlert('success', 'The book was removed from the shelf');
  };

  const goDetail = (book) => {
    setSelected(book);
    setRoute('detail');
  };
  const goEdit = (book) => {
    setSelected(book);
    setRoute('edit');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-amber-100 text-slate-900 selection:bg-amber-200/70 selection:text-slate-900">
      <Navbar current={route === 'add' ? 'add' : 'home'} onNavigate={setRoute} />

      <main className="max-w-6xl mx-auto px-4 pb-16">
        {/* Alerts */}
        {alert && (
          <div className={`mt-6 rounded-xl border px-4 py-3 shadow-sm ${alert.type === 'success' ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-rose-50 text-rose-900 border-rose-200'}`}>
            {alert.message}
          </div>
        )}

        {/* Home / Grid */}
        {route === 'home' && (
          <section className="mt-8 space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide text-slate-900">
                The Grand Library
              </h2>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-700/60" size={18} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Seek by title, author, or genre"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-amber-200 bg-white/80 backdrop-blur focus:border-amber-400 focus:ring-2 focus:ring-amber-300 shadow-sm transition"
                />
              </div>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
            <BookGrid books={filtered} onView={goDetail} onEdit={goEdit} onDelete={handleDelete} />
          </section>
        )}

        {/* Add */}
        {route === 'add' && (
          <section className="mt-8">
            <h2 className="text-2xl md:text-3xl font-serif tracking-wide text-slate-900 mb-1">Add a New Volume</h2>
            <p className="text-amber-800/80 mb-4">Inscribe the details below to place a new tome upon the shelf.</p>
            <BookForm mode="create" onSubmit={handleCreate} onCancel={() => setRoute('home')} />
          </section>
        )}

        {/* Edit */}
        {route === 'edit' && selected && (
          <section className="mt-8">
            <h2 className="text-2xl md:text-3xl font-serif tracking-wide text-slate-900 mb-1">Revise Manuscript</h2>
            <p className="text-amber-800/80 mb-4">Polish the words and renew the cover.</p>
            <BookForm mode="edit" defaultValues={selected} onSubmit={handleEdit} onCancel={() => { setRoute('home'); setSelected(null); }} />
          </section>
        )}

        {/* Detail */}
        {route === 'detail' && selected && (
          <section className="mt-8">
            <button onClick={() => setRoute('home')} className="text-sm text-amber-800 hover:text-amber-900 hover:underline mb-4">← Return to shelves</button>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-amber-50 border border-amber-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                  {selected.coverUrl ? (
                    <img src={selected.coverUrl} alt={selected.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-amber-800/50">No cover</div>
                  )}
                </div>
              </div>
              <div className="md:col-span-3 space-y-3">
                <h1 className="text-3xl font-serif tracking-wide text-slate-900">{selected.title}</h1>
                <p className="text-slate-800"><span className="font-semibold">Author:</span> {selected.author || 'Unknown'}</p>
                <p className="text-slate-800"><span className="font-semibold">Genre:</span> {selected.genre || 'General'}</p>
                {selected.description && (
                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{selected.description}</p>
                )}
                {selected.pdfUrl && (
                  <a href={selected.pdfUrl} download className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-b from-amber-300 to-amber-500 text-slate-900 shadow hover:shadow-md transition">Download PDF</a>
                )}
                <div className="pt-4 flex gap-3">
                  <button onClick={() => setRoute('home')} className="px-4 py-2 rounded-lg border border-amber-300 bg-white/70 hover:bg-white shadow-sm transition">Close</button>
                  <button onClick={() => setRoute('edit')} className="px-4 py-2 rounded-lg bg-gradient-to-b from-amber-300 to-amber-500 text-slate-900 shadow hover:shadow-md transition">Edit</button>
                  <button onClick={() => { handleDelete(selected); setRoute('home'); }} className="px-4 py-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 shadow-sm transition">Delete</button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-amber-200 bg-white/70 backdrop-blur mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-amber-900/80 flex items-center justify-between">
          <p>© {new Date().getFullYear()} The Grand Library</p>
          <p className="text-amber-900/70">Crafted with care</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
