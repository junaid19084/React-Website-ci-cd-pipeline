// Local storage utilities for flashcards
const STORAGE_KEY = 'flashcard-study-app';

export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {
      flashcards: [],
      scores: [],
      categories: ['AWS', 'DevOps', 'General Knowledge']
    };
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return {
      flashcards: [],
      scores: [],
      categories: ['AWS', 'DevOps', 'General Knowledge']
    };
  }
};

export const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const exportToJSON = (data) => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'flashcards-backup.json';
  link.click();
  URL.revokeObjectURL(url);
};

export const importFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};
