import BookCard from './BookCard';

export default function BookGrid({ books, onView, onEdit, onDelete }) {
  if (!books.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-white/80">Your shelves are quiet. Add your first tome to awaken the stacks.</p>
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
