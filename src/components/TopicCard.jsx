import React from 'react';

export default function TopicCard({ topic, isCompleted, onOpenTopic }) {
  return (
    <div className={`dashboard-card ${isCompleted ? 'completed-card' : ''}`}>
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
          onClick={() => onOpenTopic(topic.id)}
        >
          {isCompleted ? 'Reviewed ✓' : 'Open Notes ↗'}
        </a>
        <span className="quiz-pill">Quiz in W3</span>
      </div>
    </div>
  );
}