import React from 'react';

export default function Header({ tempName, userName, handleNameSave, setTempName, completedCount, totalTopicsCount }) {
  return (
    <section className="dashboard-hero-unified">
      <div className="hero-top-row">
        <div className="user-profile-badge">
          <div className="avatar-placeholder">NS</div>
          <div className="user-info">
            <span className="user-label">Student Profile</span>
            <input
              type="text"
              className="user-name-input"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyDown={handleNameSave}
              onBlur={handleNameSave}
              placeholder="Type name + Enter"
              title="Type name and press Enter to save"
            />
          </div>
        </div>

        <div className="hero-chip">
          <span>Progress:</span> <strong>{completedCount} of {totalTopicsCount} Completed</strong>
        </div>
      </div>

      <div className="hero-greeting">
        <h1>Hi, Nurse {userName}! 👋</h1>
        <p>Welcome to your centralized nursing study hub. Search topics or filter by subject below.</p>
      </div>
    </section>
  );
}