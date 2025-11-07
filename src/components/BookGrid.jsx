import React from 'react';
import BookCard from './BookCard';

const EmptyState = () => (
  <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl bg-white">
    <p className="text-slate-600">No books yet. Click "Add Book" to create your first one.</p>
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
