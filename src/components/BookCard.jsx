import { Eye, Pencil, Trash2, Bookmark } from 'lucide-react';

export default function BookCard({ book, onView, onEdit, onDelete }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden shadow-lg shadow-indigo-900/10">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />
      <div className="aspect-[3/4] w-full overflow-hidden">
        {book.cover ? (
          <img src={book.cover} alt={book.title} className="h-full w-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="h-full w-full grid place-items-center bg-gradient-to-br from-slate-900 to-indigo-950">
            <Bookmark className="h-10 w-10 text-indigo-300/60" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-medium truncate">{book.title}</h3>
        <p className="text-sm text-white/70 truncate">{book.author}</p>
        <div className="mt-4 flex items-center justify-between">
          <button onClick={() => onView?.(book)} className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 transition">
            <Eye className="h-4 w-4" /> View
          </button>
          <div className="flex items-center gap-3">
            <button onClick={() => onEdit?.(book)} className="text-white/80 hover:text-white transition">
              <Pencil className="h-4 w-4" />
            </button>
            <button onClick={() => onDelete?.(book)} className="text-rose-300 hover:text-rose-200 transition">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
