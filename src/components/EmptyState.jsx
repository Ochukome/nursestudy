import React from 'react';

export default function EmptyState({ searchQuery, onReset }) {
  return (
    <div className="empty-state-box">
      <h3>No nursing topics found</h3>
      <p>No results matching "{searchQuery}". Try searching another keyword or reset filters.</p>
      <button className="reset-btn" onClick={onReset}>
        Reset Search & Filters
      </button>
    </div>
  );
}