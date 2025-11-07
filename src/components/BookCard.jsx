import React from 'react';
import { Pencil, Eye, Trash2 } from 'lucide-react';

const BookCard = ({ book, onView, onEdit, onDelete }) => {
  return (
    <div className="group bg-white/80 rounded-2xl border border-amber-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-amber-50">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-amber-800/50">No Cover</div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4">
        <h3 className="text-slate-900 font-serif tracking-wide truncate" title={book.title}>{book.title}</h3>
        <p className="text-sm text-amber-900/80 truncate" title={book.author}>{book.author}</p>
        <div className="mt-2 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 shadow-sm">{book.genre || 'General'}</div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button onClick={() => onView(book)} className="inline-flex items-center justify-center gap-1 text-xs px-2 py-1.5 rounded-full border border-amber-300 bg-white/70 hover:bg-white shadow-sm transition">
            <Eye size={14} /> View
          </button>
          <button onClick={() => onEdit(book)} className="inline-flex items-center justify-center gap-1 text-xs px-2 py-1.5 rounded-full border border-amber-300 bg-white/70 hover:bg-white shadow-sm transition">
            <Pencil size={14} /> Edit
          </button>
          <button onClick={() => onDelete(book)} className="inline-flex items-center justify-center gap-1 text-xs px-2 py-1.5 rounded-full border border-rose-200 text-rose-700 bg-rose-50/60 hover:bg-rose-50 shadow-sm transition">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
