// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import BookForm from "./components/BookForm.jsx";
import BookList from "./components/BookList.jsx";
import SearchBar from "./components/SearchBar.jsx";


function App() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: "", author: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBookId, setEditingBookId] = useState(null);

  // Fetch books from JSON Server
  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update a book
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingBookId) {
      // Update a book
      fetch(`http://localhost:3001/books/${editingBookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then(res => res.json())
        .then(updatedBook => {
          setBooks(books.map(b => (b.id === editingBookId ? updatedBook : b)));
          setEditingBookId(null);
          setFormData({ title: "", author: "" });
        });
    } else {
      // Create a new book
      fetch("http://localhost:3001/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then(res => res.json())
        .then(newBook => {
          setBooks([...books, newBook]);
          setFormData({ title: "", author: "" });
        });
    }
  };

  const handleEdit = (book) => {
    setEditingBookId(book.id);
    setFormData({ title: book.title, author: book.author });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/books/${id}`, { method: "DELETE" })
      .then(() => setBooks(books.filter(book => book.id !== id)));
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>📚 Library Management System</h2>

      <BookForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editingBookId={editingBookId}
      />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <BookList
        books={filteredBooks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
