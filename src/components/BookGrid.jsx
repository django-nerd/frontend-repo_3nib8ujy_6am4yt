import React from 'react';
import BookCard from './BookCard';

const EmptyState = () => (
  <div className="text-center py-16 border-2 border-dashed border-amber-200 rounded-2xl bg-white/70 shadow-inner">
    <p className="text-amber-900/80">No tomes yet. Select "Add Book" to scribe your first entry.</p>
  </div>
);

const BookGrid = ({ books, onView, onEdit, onDelete }) => {
  if (!books?.length) return <EmptyState />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((b) => (
        <BookCard key={b.id || b._id || b.title} book={b} onView={onView} onEdit={onEdit} onDelete={onDelete} />)
      )}
    </div>
  );
};

export default BookGrid;
