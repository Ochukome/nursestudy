import React from 'react';

const CATEGORIES = ['All', 'Fundamentals', 'Pharmacology', 'Mental Health'];

export default function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="category-pills" role="tablist" aria-label="Filter topics by category">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`pill ${selectedCategory === cat ? 'active' : ''}`}
          onClick={() => setSelectedCategory(cat)}
          role="tab"
          aria-selected={selectedCategory === cat}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}