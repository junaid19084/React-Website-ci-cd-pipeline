import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { categories, difficulties } from '../data/sampleData';
import './FlashcardForm.css';

const FlashcardForm = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingCard = null 
}) => {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General Knowledge',
    difficulty: 'Medium',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (editingCard) {
      setFormData({
        question: editingCard.question || '',
        answer: editingCard.answer || '',
        category: editingCard.category || 'General Knowledge',
        difficulty: editingCard.difficulty || 'Medium',
        tags: editingCard.tags || []
      });
    } else {
      setFormData({
        question: '',
        answer: '',
        category: 'General Knowledge',
        difficulty: 'Medium',
        tags: []
      });
    }
    setTagInput('');
  }, [editingCard, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.question.trim() && formData.answer.trim()) {
      onSave(formData);
      onClose();
    }
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTagAdd();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{editingCard ? 'Edit Flashcard' : 'Create New Flashcard'}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flashcard-form">
          <div className="form-group">
            <label htmlFor="question">Question *</label>
            <textarea
              id="question"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="Enter your question..."
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="answer">Answer *</label>
            <textarea
              id="answer"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="Enter the answer..."
              rows={4}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">Difficulty</label>
              <select
                id="difficulty"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <div className="tag-input-container">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagKeyPress}
                placeholder="Add a tag..."
              />
              <button 
                type="button" 
                onClick={handleTagAdd}
                className="add-tag-btn"
                disabled={!tagInput.trim()}
              >
                <Plus size={16} />
              </button>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="tags-display">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="tag-item">
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="remove-tag-btn"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-btn"
              disabled={!formData.question.trim() || !formData.answer.trim()}
            >
              <Save size={16} />
              {editingCard ? 'Update' : 'Create'} Flashcard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlashcardForm;
