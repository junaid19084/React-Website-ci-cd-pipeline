import React, { useState } from 'react';
import { RotateCcw, Edit, Trash2 } from 'lucide-react';
import './Flashcard.css';

const Flashcard = ({ 
  card, 
  onEdit, 
  onDelete, 
  showActions = true,
  onAnswer = null,
  isQuizMode = false 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    
    // In quiz mode, call onAnswer when card is flipped to show answer
    if (isQuizMode && !isFlipped && onAnswer) {
      onAnswer();
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return '#4ade80';
      case 'medium': return '#fbbf24';
      case 'hard': return '#f87171';
      default: return '#6b7280';
    }
  };

  return (
    <div className="flashcard-container">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <div className="flashcard-header">
              <span 
                className="difficulty-badge"
                style={{ backgroundColor: getDifficultyColor(card.difficulty) }}
              >
                {card.difficulty || 'Medium'}
              </span>
              <span className="category-badge">{card.category}</span>
            </div>
            <div className="flashcard-content">
              <h3>Question</h3>
              <p>{card.question}</p>
            </div>
            <div className="flashcard-footer">
              <div className="flip-instruction">
                <RotateCcw size={16} />
                Click to flip
              </div>
            </div>
          </div>
          
          <div className="flashcard-back">
            <div className="flashcard-header">
              <span 
                className="difficulty-badge"
                style={{ backgroundColor: getDifficultyColor(card.difficulty) }}
              >
                {card.difficulty || 'Medium'}
              </span>
              <span className="category-badge">{card.category}</span>
            </div>
            <div className="flashcard-content">
              <h3>Answer</h3>
              <p>{card.answer}</p>
            </div>
            <div className="flashcard-footer">
              {card.tags && (
                <div className="tags">
                  {card.tags.map((tag, index) => (
                    <span key={index} className="tag">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showActions && (
        <div className="flashcard-actions">
          <button 
            className="action-btn edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(card);
            }}
          >
            <Edit size={16} />
            Edit
          </button>
          <button 
            className="action-btn delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(card.id);
            }}
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
