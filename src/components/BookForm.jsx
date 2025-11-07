import { useEffect, useRef, useState } from 'react';
import { Upload, FileText, Wand2 } from 'lucide-react';

export default function BookForm({ initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [author, setAuthor] = useState(initial?.author || '');
  const [cover, setCover] = useState(initial?.cover || '');
  const [pdf, setPdf] = useState(initial?.pdf || '');
  const [notes, setNotes] = useState(initial?.notes || '');

  const coverInput = useRef(null);
  const pdfInput = useRef(null);

  useEffect(() => {
    setTitle(initial?.title || '');
    setAuthor(initial?.author || '');
    setCover(initial?.cover || '');
    setPdf(initial?.pdf || '');
    setNotes(initial?.notes || '');
  }, [initial]);

  const handleCover = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCover(url);
  };

  const handlePdf = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPdf(url);
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit?.({ title, author, cover, pdf, notes, id: initial?.id || crypto.randomUUID() });
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <div className="md:col-span-2">
        <div className="rounded-2xl border border-white/15 bg-white/5 overflow-hidden">
          <div className="aspect-[3/4] bg-[radial-gradient(ellipse_at_top,rgba(173,216,230,0.15),transparent_60%),linear-gradient(to_bottom,#0b0f1d,#0c1224)] grid place-items-center">
            {cover ? (
              <img src={cover} alt="Cover preview" className="h-full w-full object-cover" />
            ) : (
              <div className="text-center">
                <Upload className="h-8 w-8 mx-auto text-blue-200/80" />
                <p className="mt-2 text-sm text-blue-100/80">Cover preview</p>
              </div>
            )}
          </div>
          <div className="p-4">
            <button type="button" onClick={() => coverInput.current?.click()} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white py-2 transition">
              <Upload className="h-4 w-4" /> Upload cover
            </button>
            <input ref={coverInput} onChange={handleCover} type="file" accept="image/*" className="hidden" />
          </div>
        </div>
      </div>

      <div className="md:col-span-3">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-blue-100/80">Title</span>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-white placeholder:text-blue-100/60 outline-none focus:ring-2 focus:ring-blue-200/30" placeholder="The Starweaver's Oath" />
            </label>
            <label className="block">
              <span className="text-sm text-blue-100/80">Author</span>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-white placeholder:text-blue-100/60 outline-none focus:ring-2 focus:ring-blue-200/30" placeholder="Lyra Ashbourne" />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm text-blue-100/80">Notes</span>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-white placeholder:text-blue-100/60 outline-none focus:ring-2 focus:ring-blue-200/30" placeholder="Whispers, passages, or spells to remember..." />
            </label>
            <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button type="button" onClick={() => pdfInput.current?.click()} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-300 via-purple-300 to-amber-200 text-slate-900 font-medium px-4 py-2 shadow hover:shadow-blue-300/30 transition">
                <FileText className="h-4 w-4" /> Attach PDF
              </button>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white px-4 py-2">
                <Wand2 className="h-4 w-4" /> Save Tome
              </button>
              <button type="button" onClick={onCancel} className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent border border-white/15 text-blue-100/90 hover:text-white px-4 py-2">
                Cancel
              </button>
              <input ref={pdfInput} onChange={handlePdf} type="file" accept="application/pdf" className="hidden" />
            </div>
            {pdf && (
              <p className="text-xs text-blue-100/80 sm:col-span-2">PDF attached</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
