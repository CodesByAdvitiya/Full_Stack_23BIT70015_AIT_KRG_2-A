// components/SearchBar.js
import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      className="search-bar"
      placeholder="Search by title..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;
