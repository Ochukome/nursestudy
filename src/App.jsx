import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import TopicList from './components/TopicList';
import ScheduleWidget from './components/ScheduleWidget';
import topicDataJSON from './data/topics.json';

export default function App() {
  const [userName, setUserName] = useState('Favour');
  const [tempName, setTempName] = useState('Favour');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Week 2 Asynchronous Data Loading States
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Completed topics & Schedule states
  const [completedTopicIds, setCompletedTopicIds] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2026-10-16');
  const [schedules, setSchedules] = useState([
    { id: 1, date: '2026-10-16', time: '10:00 AM', event: 'Pharmacology Review' },
    { id: 2, date: '2026-10-16', time: '02:30 PM', event: 'Clinical Assessment' },
  ]);
  const [newTime, setNewTime] = useState('09:00');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const loadTopicsData = () => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        setTopics(topicDataJSON);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load nursing topics. Please check your connection.');
        setIsLoading(false);
      }
    }, 800);
  };

  useEffect(() => {
    loadTopicsData();
  }, []);

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

  const totalTopicsCount = topics.length;
  const completedCount = completedTopicIds.length;
  const progressPercentage = totalTopicsCount > 0 ? Math.round((completedCount / totalTopicsCount) * 100) : 0;

  const filteredTopics = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    
    return topics.filter((topic) => {
      const matchesCategory =
        selectedCategory === 'All' || topic.category === selectedCategory;

      if (!q) return matchesCategory;

      const titleMatch = topic.title.toLowerCase().includes(q);
      const categoryMatch = topic.category.toLowerCase().includes(q);
      const summaryMatch = topic.summary.toLowerCase().includes(q);
      const keyPointsMatch = topic.keyPoints.some((pt) => pt.toLowerCase().includes(q));

      return matchesCategory && (titleMatch || categoryMatch || summaryMatch || keyPointsMatch);
    });
  }, [topics, searchQuery, selectedCategory]);

  const activeDaySchedules = useMemo(() => {
    return schedules.filter((s) => s.date === selectedDate);
  }, [schedules, selectedDate]);

  return (
    <div className="db-wrapper">
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
          <div className="widget-title">Week 2 Build</div>
          <p className="widget-sub">Modular components & async data loading active.</p>
        </div>
      </aside>

      <main className="db-main">
        {activeTab === 'Dashboard' && (
          <>
            <Header 
              tempName={tempName}
              userName={userName}
              handleNameSave={handleNameSave}
              setTempName={setTempName}
              completedCount={completedCount}
              totalTopicsCount={totalTopicsCount}
            />

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <div className="db-grid-container" style={{ marginTop: '1.5rem' }}>
              <div className="db-primary-col">
                <div className="section-header">
                  <h2>Explore Subjects</h2>
                  <CategoryFilter 
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory} 
                  />
                </div>

                {isLoading ? (
                  <div className="empty-state-box">
                    <h3>Loading nursing topics...</h3>
                    <p>Please wait while we fetch the asynchronous dataset.</p>
                  </div>
                ) : error ? (
                  <div className="empty-state-box">
                    <h3 style={{ color: '#dc2626' }}>Data Loading Error</h3>
                    <p>{error}</p>
                    <button className="reset-btn" onClick={loadTopicsData}>
                      Retry Loading
                    </button>
                  </div>
                ) : (
                  <TopicList 
                    topics={filteredTopics}
                    completedTopicIds={completedTopicIds}
                    onOpenTopic={handleOpenTopic}
                    searchQuery={searchQuery}
                    onReset={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  />
                )}
              </div>

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

                <ScheduleWidget 
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  schedules={schedules}
                  activeDaySchedules={activeDaySchedules}
                  setShowScheduleModal={setShowScheduleModal}
                />
              </aside>
            </div>
          </>
        )}

        {activeTab === 'Subjects' && (
          <div className="tab-page">
            <h2>Nursing Curriculum Subjects</h2>
            <p className="sub-text">Select any subject category to view filtered modules instantly.</p>
          </div>
        )}

        {activeTab === 'Library' && (
          <div className="tab-page">
            <h2>Open Access Study Library</h2>
            <p className="sub-text">Direct links to peer-reviewed nursing guides.</p>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="tab-page">
            <h2>Account Preferences</h2>
            <p className="sub-text">Customize your student profile settings.</p>
          </div>
        )}

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