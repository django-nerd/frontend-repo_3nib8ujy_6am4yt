import React, { useEffect, useState } from 'react';

const initialState = {
  title: '',
  author: '',
  genre: '',
  description: '',
  coverUrl: '',
  pdfUrl: '',
};

const BookForm = ({ mode = 'create', defaultValues, onSubmit, onCancel }) => {
  const [values, setValues] = useState(initialState);
  const [coverPreview, setCoverPreview] = useState('');

  useEffect(() => {
    if (defaultValues) {
      setValues({ ...initialState, ...defaultValues });
      setCoverPreview(defaultValues.coverUrl || '');
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleFile = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (field === 'cover') setCoverPreview(url);
    setValues((v) => ({ ...v, [field === 'cover' ? 'coverFile' : 'pdfFile']: file }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2">
          <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
            {coverPreview ? (
              <img src={coverPreview} alt="Cover preview" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-slate-400">Cover preview</div>
            )}
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleFile(e, 'cover')} className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
          </div>
        </div>
        <div className="md:col-span-3 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Book Name</label>
            <input name="title" value={values.title} onChange={handleChange} required className="w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
              <input name="author" value={values.author} onChange={handleChange} required className="w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Genre</label>
              <input name="genre" value={values.genre} onChange={handleChange} className="w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="Fiction, Sci-Fi, ..." />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea name="description" value={values.description} onChange={handleChange} rows={6} className="w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Book PDF (optional)</label>
            <input type="file" accept="application/pdf" onChange={(e) => handleFile(e, 'pdf')} className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
          </div>
          <div className="pt-2 flex gap-3">
            <button type="submit" className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 font-medium">
              {mode === 'create' ? 'Add Book' : 'Save Changes'}
            </button>
            {onCancel && (
              <button type="button" onClick={onCancel} className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50 font-medium">
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default BookForm;
