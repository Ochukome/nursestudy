import React from 'react';

export default function ScheduleWidget({ 
  selectedDate, 
  setSelectedDate, 
  activeDaySchedules, 
  setShowScheduleModal 
}) {
  return (
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
  );
}