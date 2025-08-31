import React from 'react';
import type { RecipeCardProps } from '../types.js';

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect, matchPercentage }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#666';
    }
  };

  return (
    <div className="recipe-card" onClick={() => onSelect(recipe)}>
      <div className="recipe-card-header">
        <h3 className="recipe-name">{recipe.name}</h3>
        <div className="match-badge" style={{ backgroundColor: (matchPercentage ?? 0) > 70 ? '#4CAF50' : (matchPercentage ?? 0) > 40 ? '#FF9800' : '#F44336' }}>
          {matchPercentage}% Match
        </div>
      </div>
      
      <p className="recipe-description">{recipe.description}</p>
      
      <div className="recipe-meta">
        <div className="meta-item">
          <span className="meta-label">⏱️</span>
          <span>{recipe.cookingTime} min</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">👥</span>
          <span>{recipe.servings} servings</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">⭐</span>
          <span>{recipe.rating}</span>
        </div>
      </div>
      
      <div className="recipe-details">
        <div 
          className="difficulty-badge"
          style={{ backgroundColor: getDifficultyColor(recipe.difficulty) }}
        >
          {recipe.difficulty}
        </div>
        <div className="cuisine-badge">{recipe.cuisine}</div>
      </div>
      
      <div className="dietary-tags">
        {recipe.dietary.map((diet: string) => (
          <span key={diet} className="dietary-tag">{diet}</span>
        ))}
      </div>
      
      <div className="nutrition-preview">
        <span>🔥 {recipe.nutrition.calories} cal</span>
        <span>🥩 {recipe.nutrition.protein}g protein</span>
      </div>
      
      <button className="view-recipe-btn">View Recipe</button>
    </div>
  );
};

export default RecipeCard;
