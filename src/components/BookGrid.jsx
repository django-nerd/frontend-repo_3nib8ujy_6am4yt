import BookCard from './BookCard';

export default function BookGrid({ books, onView, onEdit, onDelete }) {
  if (!books.length) {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/5 p-10 text-center">
        <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-gradient-to-tr from-blue-200/80 to-amber-200/80" />
        <p className="text-blue-100/90">Your astral shelves await. Add your first star-bound tome.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((b) => (
        <BookCard key={b.id} book={b} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
