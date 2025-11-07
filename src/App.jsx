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
    showAlert('success', 'Book added successfully');
    setRoute('home');
  };

  const handleEdit = async (values) => {
    if (!selected) return;
    const coverUrl = values.coverFile ? URL.createObjectURL(values.coverFile) : (values.coverUrl || selected.coverUrl || '');
    const pdfUrl = values.pdfFile ? URL.createObjectURL(values.pdfFile) : (values.pdfUrl || selected.pdfUrl || '');
    setBooks((prev) => prev.map((b) => (b.id === selected.id ? { ...b, ...values, coverUrl, pdfUrl } : b)));
    showAlert('success', 'Book updated successfully');
    setRoute('home');
    setSelected(null);
  };

  const handleDelete = async (book) => {
    setBooks((prev) => prev.filter((b) => b.id !== book.id));
    showAlert('success', 'Book deleted');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <Navbar current={route === 'add' ? 'add' : 'home'} onNavigate={setRoute} />

      <main className="max-w-6xl mx-auto px-4 pb-16">
        {/* Alerts */}
        {alert && (
          <div className={`mt-6 rounded-lg border px-4 py-3 ${alert.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'}`}>
            {alert.message}
          </div>
        )}

        {/* Home / Grid */}
        {route === 'home' && (
          <section className="mt-8 space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-xl font-semibold text-slate-900">All Books</h2>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, author, or genre"
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 bg-white focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <BookGrid books={filtered} onView={goDetail} onEdit={goEdit} onDelete={handleDelete} />
          </section>
        )}

        {/* Add */}
        {route === 'add' && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Add a New Book</h2>
            <BookForm mode="create" onSubmit={handleCreate} onCancel={() => setRoute('home')} />
          </section>
        )}

        {/* Edit */}
        {route === 'edit' && selected && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Edit Book</h2>
            <BookForm mode="edit" defaultValues={selected} onSubmit={handleEdit} onCancel={() => { setRoute('home'); setSelected(null); }} />
          </section>
        )}

        {/* Detail */}
        {route === 'detail' && selected && (
          <section className="mt-8">
            <button onClick={() => setRoute('home')} className="text-sm text-indigo-700 hover:underline mb-4">← Back to list</button>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  {selected.coverUrl ? (
                    <img src={selected.coverUrl} alt={selected.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-400">No cover</div>
                  )}
                </div>
              </div>
              <div className="md:col-span-3 space-y-3">
                <h1 className="text-2xl font-semibold text-slate-900">{selected.title}</h1>
                <p className="text-slate-700"><span className="font-medium">Author:</span> {selected.author || 'Unknown'}</p>
                <p className="text-slate-700"><span className="font-medium">Genre:</span> {selected.genre || 'General'}</p>
                {selected.description && (
                  <p className="text-slate-700 whitespace-pre-wrap">{selected.description}</p>
                )}
                {selected.pdfUrl && (
                  <a href={selected.pdfUrl} download className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800">Download PDF</a>
                )}
                <div className="pt-4 flex gap-3">
                  <button onClick={() => setRoute('home')} className="px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50">Close</button>
                  <button onClick={() => setRoute('edit')} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Edit</button>
                  <button onClick={() => { handleDelete(selected); setRoute('home'); }} className="px-4 py-2 rounded-md bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100">Delete</button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white/70 backdrop-blur mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Book Manager</p>
          <p className="text-slate-500">Built with React & Tailwind</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
