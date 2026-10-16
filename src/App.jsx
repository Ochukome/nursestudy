import React, { useState, useMemo } from 'react';
import topicData from './data/topics.json';

const CATEGORIES = ['All', 'Fundamentals', 'Pharmacology', 'Mental Health'];

export default function App() {
  const [userName, setUserName] = useState('Favour');
  const [tempName, setTempName] = useState('Favour');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Track completed topics
  const [completedTopicIds, setCompletedTopicIds] = useState([]);

  // Schedule state
  const [selectedDate, setSelectedDate] = useState('2026-10-16');
  const [schedules, setSchedules] = useState([
    { id: 1, date: '2026-10-16', time: '10:00 AM', event: 'Pharmacology Review' },
    { id: 2, date: '2026-10-16', time: '02:30 PM', event: 'Clinical Assessment' },
  ]);
  const [newTime, setNewTime] = useState('09:00');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Handle instant name saving on Enter or Blur
  const handleNameSave = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      if (tempName.trim()) setUserName(tempName.trim());
    }
  };

  const handleOpenTopic = (id) => {
    if (!completedTopicIds.includes(id)) {
      setCompletedTopicIds((prev) => [...prev, id]);
    }
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const [hours, minutes] = newTime.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 || 12;
    const formattedTime = `${formattedHour}:${minutes} ${ampm}`;

    setSchedules((prev) => [
      ...prev,
      { id: Date.now(), date: selectedDate, time: formattedTime, event: newEventTitle },
    ]);
    setNewEventTitle('');
    setShowScheduleModal(false);
  };

  const totalTopicsCount = topicData.length;
  const completedCount = completedTopicIds.length;
  const progressPercentage = Math.round((completedCount / totalTopicsCount) * 100);

  // Fixed Global Deep Search across all properties
  const filteredTopics = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    
    return topicData.filter((topic) => {
      const matchesCategory =
        selectedCategory === 'All' || topic.category === selectedCategory;

      if (!q) return matchesCategory;

      const titleMatch = topic.title.toLowerCase().includes(q);
      const categoryMatch = topic.category.toLowerCase().includes(q);
      const summaryMatch = topic.summary.toLowerCase().includes(q);
      const keyPointsMatch = topic.keyPoints.some((pt) => pt.toLowerCase().includes(q));

      return matchesCategory && (titleMatch || categoryMatch || summaryMatch || keyPointsMatch);
    });
  }, [searchQuery, selectedCategory]);

  const activeDaySchedules = useMemo(() => {
    return schedules.filter((s) => s.date === selectedDate);
  }, [schedules, selectedDate]);

  return (
    <div className="db-wrapper">
      {/* Mobile Top Header Toggle */}
      <div className="mobile-top-bar">
        <div className="brand-logo">
          <span className="logo-text">NurseStudy</span>
        </div>
        <button 
          className="menu-toggle-btn"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          {mobileNavOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`db-sidebar ${mobileNavOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-top">
          <div className="brand-logo desktop-only">
            <span className="logo-text">NurseStudy</span>
          </div>

          <nav className="nav-menu">
            {['Dashboard', 'Subjects', 'Library', 'Settings'].map((item) => (
              <button
                key={item}
                className={`nav-item ${activeTab === item ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item);
                  setMobileNavOpen(false);
                }}
              >
                <span className="nav-dot"></span>
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-widget">
          <div className="widget-title">Study Habit</div>
          <p className="widget-sub">Open notes daily to increase your revision score.</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="db-main">
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'Dashboard' && (
          <>
            {/* Unified Hero & User Profile Header Banner */}
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

              {/* Unified Search Control inside Dashboard Hero */}
              <div className="hero-search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="search"
                  placeholder="Search keywords (e.g. BP, ACE)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search nursing topics"
                />
              </div>
            </section>

            <div className="db-grid-container">
              <div className="db-primary-col">
                <div className="section-header">
                  <h2>Explore Subjects</h2>
                  <div className="category-pills">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        className={`pill ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredTopics.length > 0 ? (
                  <div className="cards-grid">
                    {filteredTopics.map((topic) => {
                      const isCompleted = completedTopicIds.includes(topic.id);
                      return (
                        <div className={`dashboard-card ${isCompleted ? 'completed-card' : ''}`} key={topic.id}>
                          <div>
                            <div className="card-header">
                              <span
                                className="badge"
                                style={{
                                  backgroundColor: topic.badgeBg,
                                  color: topic.badgeText,
                                }}
                              >
                                {topic.category}
                              </span>
                              <span className="read-time">{topic.readTime}</span>
                            </div>

                            <h3>{topic.title}</h3>
                            <p className="summary">{topic.summary}</p>

                            <ul className="points">
                              {topic.keyPoints.map((point, idx) => (
                                <li key={idx}>{point}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="card-footer">
                            <a
                              href={topic.resourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-open"
                              onClick={() => handleOpenTopic(topic.id)}
                            >
                              {isCompleted ? 'Reviewed ✓' : 'Open Notes ↗'}
                            </a>
                            <span className="quiz-pill">Quiz in W3</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="empty-state-box">
                    <h3>No nursing topics found</h3>
                    <p>No results matching "{searchQuery}". Try searching another keyword or reset filters.</p>
                    <button
                      className="reset-btn"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                    >
                      Reset Search & Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Right Sidebar Widgets */}
              <aside className="db-right-col">
                <div className="widget-card stats-card">
                  <h3>Revision Progress</h3>
                  <div 
                    className="progress-circle"
                    style={{
                      background: `conic-gradient(#2563eb ${progressPercentage * 3.6}deg, #e2e8f0 0deg)`
                    }}
                  >
                    <div className="progress-circle-inner">
                      <span className="progress-val">{progressPercentage}%</span>
                    </div>
                  </div>
                  <p className="progress-text">{completedCount} of {totalTopicsCount} Topics Reviewed</p>
                </div>

                <div className="widget-card schedule-card">
                  <div className="schedule-header">
                    <h3>Upcoming Schedule</h3>
                    <button className="add-btn" onClick={() => setShowScheduleModal(true)}>+ Add</button>
                  </div>

                  <div className="calendar-picker">
                    <label htmlFor="schedule-date">Select Date:</label>
                    <input
                      type="date"
                      id="schedule-date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>

                  {activeDaySchedules.length > 0 ? (
                    <ul className="schedule-list">
                      {activeDaySchedules.map((item) => (
                        <li key={item.id}>
                          <span className="time">{item.time}</span>
                          <span className="event">{item.event}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-schedule">No study events scheduled for this day.</p>
                  )}
                </div>
              </aside>
            </div>
          </>
        )}

        {/* TAB 2: SUBJECTS */}
        {activeTab === 'Subjects' && (
          <div className="tab-page">
            <h2>Nursing Curriculum Subjects</h2>
            <p className="sub-text">Select any subject category to view filtered modules instantly.</p>
            <div className="subjects-grid">
              {CATEGORIES.filter(c => c !== 'All').map(cat => (
                <div className="subject-box" key={cat}>
                  <h3>{cat}</h3>
                  <p>{topicData.filter(t => t.category === cat).length} Topics Available</p>
                  <button className="reset-btn" onClick={() => { setSelectedCategory(cat); setActiveTab('Dashboard'); }}>
                    Explore Topics
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LIBRARY */}
        {activeTab === 'Library' && (
          <div className="tab-page">
            <h2>Open Access Study Library</h2>
            <p className="sub-text">Direct links to peer-reviewed nursing guides and reference manuals.</p>
            <div className="cards-grid">
              {topicData.map(topic => (
                <div className="dashboard-card" key={topic.id}>
                  <div>
                    <span className="badge" style={{ backgroundColor: topic.badgeBg, color: topic.badgeText }}>
                      {topic.category}
                    </span>
                    <h3 style={{ marginTop: '0.5rem' }}>{topic.title}</h3>
                    <p className="summary">{topic.summary}</p>
                  </div>
                  <div className="card-footer" style={{ marginTop: '1rem' }}>
                    <a href={topic.resourceUrl} target="_blank" rel="noopener noreferrer" className="btn-open">
                      Open External Notes ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === 'Settings' && (
          <div className="tab-page">
            <h2>Account Preferences</h2>
            <p className="sub-text">Customize your local student profile settings.</p>
            <div className="settings-box">
              <label>Update Student Name (Press Enter to Save)</label>
              <input
                type="text"
                className="settings-input"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={handleNameSave}
                onBlur={handleNameSave}
              />
              <p className="sub-text" style={{ marginTop: '0.5rem', color: '#10b981' }}>
                Current Saved Name: <strong>{userName}</strong>
              </p>
            </div>
          </div>
        )}

        {/* Schedule Modal */}
        {showScheduleModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Add Study Schedule</h3>
              <form onSubmit={handleAddSchedule}>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Task Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Pharmacology Review Session"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowScheduleModal(false)}>Cancel</button>
                  <button type="submit" className="reset-btn">Save Schedule</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}