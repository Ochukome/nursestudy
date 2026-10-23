import React from 'react';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="hero-search-box">
      <span className="search-icon">🔍</span>
      <input
        type="search"
        placeholder="Search keywords (e.g. BP, ACE, Pharmacology, Communication)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search nursing topics"
      />
    </div>
  );
}