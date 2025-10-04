// components/BookList.js
import React from "react";

function BookList({ books, handleEdit, handleDelete }) {
  return (
    <ul className="book-list">
      {books.map(book => (
        <li key={book.id}>
          <div>
            <strong>{book.title}</strong> — {book.author}
          </div>

          <div>
            <button className="edit-btn" onClick={() => handleEdit(book)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BookList;
