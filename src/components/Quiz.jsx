import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import Flashcard from './Flashcard';
import './Quiz.css';

const Quiz = ({ flashcards, onBack, onSaveScore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [startTime] = useState(new Date());
  const [answers, setAnswers] = useState([]);

  const currentCard = flashcards[currentIndex];

  useEffect(() => {
    if (currentIndex >= flashcards.length && flashcards.length > 0) {
      setQuizComplete(true);
      const endTime = new Date();
      const duration = Math.round((endTime - startTime) / 1000);
      
      const quizResult = {
        score,
        totalQuestions: flashcards.length,
        percentage: Math.round((score / flashcards.length) * 100),
        duration,
        category: flashcards[0]?.category || 'Mixed',
        answers
      };
      
      onSaveScore(quizResult);
    }
  }, [currentIndex, flashcards, score, startTime, answers, onSaveScore]);

  const handleAnswer = (isCorrect) => {
    if (answered) return;
    
    setAnswered(true);
    
    const newAnswer = {
      cardId: currentCard.id,
      question: currentCard.question,
      answer: currentCard.answer,
      userCorrect: isCorrect,
      timestamp: new Date().toISOString()
    };
    
    setAnswers([...answers, newAnswer]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setAnswered(false);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setQuizComplete(false);
    setAnswers([]);
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#10b981';
    if (percentage >= 60) return '#f59e0b';
    return '#ef4444';
  };

  if (quizComplete) {
    const percentage = Math.round((score / flashcards.length) * 100);
    const duration = Math.round((new Date() - startTime) / 1000);
    
    return (
      <div className="quiz-complete">
        <div className="quiz-results">
          <div className="trophy-icon" style={{ color: getScoreColor(percentage) }}>
            <Trophy size={64} />
          </div>
          
          <h2>Quiz Complete!</h2>
          
          <div className="score-display">
            <div className="score-circle" style={{ borderColor: getScoreColor(percentage) }}>
              <span className="score-percentage" style={{ color: getScoreColor(percentage) }}>
                {percentage}%
              </span>
              <span className="score-fraction">
                {score}/{flashcards.length}
              </span>
            </div>
          </div>
          
          <div className="quiz-stats">
            <div className="stat">
              <span className="stat-label">Time</span>
              <span className="stat-value">{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Category</span>
              <span className="stat-value">{flashcards[0]?.category || 'Mixed'}</span>
            </div>
          </div>
          
          <div className="quiz-actions">
            <button onClick={restartQuiz} className="restart-btn">
              <RotateCcw size={16} />
              Try Again
            </button>
            <button onClick={onBack} className="back-btn">
              <ArrowLeft size={16} />
              Back to Study
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <button onClick={onBack} className="back-button">
            <ArrowLeft size={20} />
            Back
          </button>
          <h2>No flashcards available for quiz</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="quiz-progress">
          <span>Question {currentIndex + 1} of {flashcards.length}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="score-display-mini">
          Score: {score}/{currentIndex + (answered ? 1 : 0)}
        </div>
      </div>

      <div className="quiz-content">
        <Flashcard
          card={currentCard}
          showActions={false}
          isQuizMode={true}
          onAnswer={() => setAnswered(true)}
        />

        {answered && (
          <div className="quiz-answers">
            <h3>Did you get it right?</h3>
            <div className="answer-buttons">
              <button
                onClick={() => handleAnswer(false)}
                className="answer-btn incorrect-btn"
              >
                <XCircle size={20} />
                Incorrect
              </button>
              <button
                onClick={() => handleAnswer(true)}
                className="answer-btn correct-btn"
              >
                <CheckCircle size={20} />
                Correct
              </button>
            </div>
            
            <button onClick={nextQuestion} className="next-btn">
              {currentIndex < flashcards.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
