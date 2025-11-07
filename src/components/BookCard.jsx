import React from 'react';
import { Pencil, Eye, Trash2 } from 'lucide-react';

const BookCard = ({ book, onView, onEdit, onDelete }) => {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="aspect-[3/4] w-full overflow-hidden bg-slate-100">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-400">No Cover</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-slate-900 font-semibold truncate" title={book.title}>{book.title}</h3>
        <p className="text-sm text-slate-600 truncate" title={book.author}>{book.author}</p>
        <div className="mt-2 inline-flex items-center text-xs font-medium px-2 py-1 bg-indigo-50 text-indigo-700 rounded">{book.genre || 'General'}</div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button onClick={() => onView(book)} className="inline-flex items-center justify-center gap-1 text-xs px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-50">
            <Eye size={14} /> View
          </button>
          <button onClick={() => onEdit(book)} className="inline-flex items-center justify-center gap-1 text-xs px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-50">
            <Pencil size={14} /> Edit
          </button>
          <button onClick={() => onDelete(book)} className="inline-flex items-center justify-center gap-1 text-xs px-2 py-1.5 rounded border border-rose-200 text-rose-600 hover:bg-rose-50">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
