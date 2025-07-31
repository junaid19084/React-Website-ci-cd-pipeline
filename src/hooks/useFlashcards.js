import { useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage, generateId } from '../utils/storage';
import { sampleFlashcards } from '../data/sampleData';

export const useFlashcards = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    
    // If no flashcards exist, load sample data
    if (savedData.flashcards.length === 0) {
      savedData.flashcards = sampleFlashcards;
      saveToLocalStorage(savedData);
    }
    
    setData(savedData);
    setLoading(false);
  }, []);

  const saveData = (newData) => {
    setData(newData);
    saveToLocalStorage(newData);
  };

  const addFlashcard = (flashcard) => {
    const newFlashcard = {
      ...flashcard,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    
    const newData = {
      ...data,
      flashcards: [...data.flashcards, newFlashcard]
    };
    
    saveData(newData);
  };

  const updateFlashcard = (id, updates) => {
    const newData = {
      ...data,
      flashcards: data.flashcards.map(card =>
        card.id === id ? { ...card, ...updates } : card
      )
    };
    
    saveData(newData);
  };

  const deleteFlashcard = (id) => {
    const newData = {
      ...data,
      flashcards: data.flashcards.filter(card => card.id !== id)
    };
    
    saveData(newData);
  };

  const addScore = (score) => {
    const newScore = {
      ...score,
      id: generateId(),
      timestamp: new Date().toISOString()
    };
    
    const newData = {
      ...data,
      scores: [...data.scores, newScore]
    };
    
    saveData(newData);
  };

  const getFlashcardsByCategory = (category) => {
    return data?.flashcards?.filter(card => card.category === category) || [];
  };

  const getRecentScores = (limit = 10) => {
    return data?.scores?.slice(-limit).reverse() || [];
  };

  return {
    data,
    loading,
    addFlashcard,
    updateFlashcard,
    deleteFlashcard,
    addScore,
    getFlashcardsByCategory,
    getRecentScores,
    saveData
  };
};
