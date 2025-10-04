// components/BookForm.js
import React from "react";

function BookForm({ formData, handleChange, handleSubmit, editingBookId }) {
  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Book Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        name="author"
        placeholder="Author Name"
        value={formData.author}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {editingBookId ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
}

export default BookForm;
