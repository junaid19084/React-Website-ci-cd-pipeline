import React from 'react';
import { Trophy, Clock, Target, Calendar } from 'lucide-react';
import './ScoreBoard.css';

const ScoreBoard = ({ scores }) => {
  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#10b981';
    if (percentage >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getAverageScore = () => {
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum, score) => sum + score.percentage, 0);
    return Math.round(total / scores.length);
  };

  const getBestScore = () => {
    if (scores.length === 0) return 0;
    return Math.max(...scores.map(score => score.percentage));
  };

  const getTotalQuizzes = () => scores.length;

  if (scores.length === 0) {
    return (
      <div className="scoreboard-container">
        <div className="scoreboard-header">
          <h2>Score History</h2>
        </div>
        <div className="no-scores">
          <Trophy size={48} color="#9ca3af" />
          <p>No quiz scores yet. Take your first quiz to see your progress!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="scoreboard-container">
      <div className="scoreboard-header">
        <h2>Score History</h2>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#3b82f6' }}>
            <Target size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{getAverageScore()}%</span>
            <span className="stat-label">Average Score</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#10b981' }}>
            <Trophy size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{getBestScore()}%</span>
            <span className="stat-label">Best Score</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#8b5cf6' }}>
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{getTotalQuizzes()}</span>
            <span className="stat-label">Total Quizzes</span>
          </div>
        </div>
      </div>

      <div className="scores-list">
        {scores.map((score, index) => (
          <div key={score.id || index} className="score-item">
            <div className="score-main">
              <div className="score-circle-mini" style={{ borderColor: getScoreColor(score.percentage) }}>
                <span style={{ color: getScoreColor(score.percentage) }}>
                  {score.percentage}%
                </span>
              </div>
              
              <div className="score-details">
                <div className="score-info">
                  <span className="category-name">{score.category}</span>
                  <span className="score-fraction">
                    {score.score}/{score.totalQuestions} correct
                  </span>
                </div>
                
                <div className="score-meta">
                  <div className="meta-item">
                    <Clock size={14} />
                    <span>{formatDuration(score.duration)}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{formatDate(score.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="score-progress">
              <div 
                className="score-progress-bar"
                style={{ 
                  width: `${score.percentage}%`,
                  backgroundColor: getScoreColor(score.percentage)
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
