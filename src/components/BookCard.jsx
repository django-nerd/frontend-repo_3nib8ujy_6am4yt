import { Eye, Pencil, Trash2, Bookmark } from 'lucide-react';

export default function BookCard({ book, onView, onEdit, onDelete }) {
  return (
    <div className="group relative rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 transition overflow-hidden shadow-lg shadow-blue-900/10">
      {/* Magical sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.12),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(180,220,255,0.1),transparent_35%)] opacity-0 group-hover:opacity-100 transition pointer-events-none" />
      <div className="aspect-[3/4] w-full overflow-hidden">
        {book.cover ? (
          <img src={book.cover} alt={book.title} className="h-full w-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="h-full w-full grid place-items-center bg-gradient-to-br from-[#0b0f1d] via-[#0c1224] to-[#0b0f1d]">
            <Bookmark className="h-10 w-10 text-blue-200/70" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-medium truncate">{book.title}</h3>
        <p className="text-sm text-blue-100/80 truncate">{book.author}</p>
        <div className="mt-4 flex items-center justify-between">
          <button onClick={() => onView?.(book)} className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition">
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
