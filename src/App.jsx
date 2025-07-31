import React, { useState } from 'react';
import { Plus, Play, BarChart3, BookOpen, Download, Upload } from 'lucide-react';
import { useFlashcards } from './hooks/useFlashcards';
import { exportToJSON, importFromJSON } from './utils/storage';
import Flashcard from './components/Flashcard';
import FlashcardForm from './components/FlashcardForm';
import Quiz from './components/Quiz';
import ScoreBoard from './components/ScoreBoard';
import { categories } from './data/sampleData';
import './App.css';

function App() {
  const {
    data,
    loading,
    addFlashcard,
    updateFlashcard,
    deleteFlashcard,
    addScore,
    getFlashcardsByCategory,
    getRecentScores,
    saveData
  } = useFlashcards();

  const [currentView, setCurrentView] = useState('study'); // study, quiz, scores
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [quizCards, setQuizCards] = useState([]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your flashcards...</p>
      </div>
    );
  }

  const filteredCards = selectedCategory === 'All' 
    ? data.flashcards 
    : getFlashcardsByCategory(selectedCategory);

  const handleEditCard = (card) => {
    setEditingCard(card);
    setIsFormOpen(true);
  };

  const handleSaveCard = (cardData) => {
    if (editingCard) {
      updateFlashcard(editingCard.id, cardData);
    } else {
      addFlashcard(cardData);
    }
    setEditingCard(null);
  };

  const handleStartQuiz = () => {
    if (filteredCards.length === 0) {
      alert('No flashcards available for the selected category!');
      return;
    }
    
    // Shuffle the cards for the quiz
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setQuizCards(shuffled);
    setCurrentView('quiz');
  };

  const handleExport = () => {
    exportToJSON(data);
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const importedData = await importFromJSON(file);
        saveData(importedData);
        alert('Flashcards imported successfully!');
      } catch (err) {
        console.error('Import error:', err);
        alert('Error importing file. Please check the file format.');
      }
    }
    event.target.value = '';
  };

  if (currentView === 'quiz') {
    return (
      <Quiz
        flashcards={quizCards}
        onBack={() => setCurrentView('study')}
        onSaveScore={addScore}
      />
    );
  }

  if (currentView === 'scores') {
    return (
      <div className="app">
        <nav className="app-nav">
          <div className="nav-left">
            <h1 className="app-title">
              <BookOpen size={28} />
              FlashCard Study
            </h1>
          </div>
          <div className="nav-center">
            <button
              onClick={() => setCurrentView('study')}
              className="nav-btn"
            >
              <BookOpen size={16} />
              Study
            </button>
            <button
              onClick={() => setCurrentView('scores')}
              className="nav-btn active"
            >
              <BarChart3 size={16} />
              Scores
            </button>
          </div>
        </nav>
        
        <main className="app-main">
          <ScoreBoard scores={getRecentScores(20)} />
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="app-nav">
        <div className="nav-left">
          <h1 className="app-title">
            <BookOpen size={28} />
            FlashCard Study
          </h1>
        </div>
        <div className="nav-center">
          <button
            onClick={() => setCurrentView('study')}
            className="nav-btn active"
          >
            <BookOpen size={16} />
            Study
          </button>
          <button
            onClick={() => setCurrentView('scores')}
            className="nav-btn"
          >
            <BarChart3 size={16} />
            Scores
          </button>
        </div>
        <div className="nav-right">
          <button onClick={handleExport} className="action-btn">
            <Download size={16} />
            Export
          </button>
          <label className="action-btn" style={{ cursor: 'pointer' }}>
            <Upload size={16} />
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
          <button
            onClick={() => setIsFormOpen(true)}
            className="primary-btn"
          >
            <Plus size={16} />
            Add Card
          </button>
        </div>
      </nav>

      <main className="app-main">
        <div className="controls">
          <div className="category-filter">
            <label htmlFor="category-select">Category:</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="quiz-controls">
            <button onClick={handleStartQuiz} className="quiz-btn">
              <Play size={16} />
              Start Quiz ({filteredCards.length} cards)
            </button>
          </div>
        </div>

        <div className="flashcards-grid">
          {filteredCards.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={48} color="#9ca3af" />
              <h3>No flashcards found</h3>
              <p>
                {selectedCategory === 'All' 
                  ? 'Create your first flashcard to get started!'
                  : `No flashcards in the ${selectedCategory} category. Try selecting a different category or create a new card.`
                }
              </p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="primary-btn"
              >
                <Plus size={16} />
                Create Flashcard
              </button>
            </div>
          ) : (
            filteredCards.map(card => (
              <Flashcard
                key={card.id}
                card={card}
                onEdit={handleEditCard}
                onDelete={deleteFlashcard}
              />
            ))
          )}
        </div>
      </main>

      <FlashcardForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCard(null);
        }}
        onSave={handleSaveCard}
        editingCard={editingCard}
      />
    </div>
  );
}

export default App;
