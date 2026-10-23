import React from 'react';
import TopicCard from './TopicCard';
import EmptyState from './EmptyState';

export default function TopicList({ topics, completedTopicIds, onOpenTopic, searchQuery, onReset }) {
  if (topics.length === 0) {
    return <EmptyState searchQuery={searchQuery} onReset={onReset} />;
  }

  return (
    <div className="cards-grid">
      {topics.map((topic) => (
        <TopicCard 
          key={topic.id}
          topic={topic}
          isCompleted={completedTopicIds.includes(topic.id)}
          onOpenTopic={onOpenTopic}
        />
      ))}
    </div>
  );
}