import React, { useState } from 'react'
import type { RecipeDetailProps, Ingredient } from '../types.js'

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onClose }) => {
  const [servings, setServings] = useState<number>(recipe.servings)
  const [userRating, setUserRating] = useState<number>(0)

  const adjustIngredients = (amount: string, unit: string): string => {
    const baseAmount = parseFloat(amount)
    const adjustedAmount = (baseAmount / recipe.servings) * servings
    return `${adjustedAmount.toFixed(1)} ${unit}`
  }

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'Easy':
        return '#4CAF50'
      case 'Medium':
        return '#FF9800'
      case 'Hard':
        return '#F44336'
      default:
        return '#666'
    }
  }

  return (
    <div className="recipe-detail-overlay">
      <div className="recipe-detail-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <div className="recipe-detail-content">
          <div className="recipe-header">
            <h1>{recipe.name}</h1>
            <p className="recipe-description">{recipe.description}</p>

            <div className="recipe-stats">
              <div className="stat">
                <span className="stat-icon">⏱️</span>
                <span>{recipe.cookingTime} minutes</span>
              </div>
              <div className="stat">
                <span className="stat-icon">👥</span>
                <span>{servings} servings</span>
              </div>
              <div className="stat">
                <span className="stat-icon">⭐</span>
                <span>{recipe.rating}</span>
              </div>
            </div>

            <div className="recipe-badges">
              <div
                className="difficulty-badge"
                style={{ backgroundColor: getDifficultyColor(recipe.difficulty) }}
              >
                {recipe.difficulty}
              </div>
              <div className="cuisine-badge">{recipe.cuisine}</div>
              {recipe.dietary.map((diet: string) => (
                <div key={diet} className="dietary-badge">
                  {diet}
                </div>
              ))}
            </div>
          </div>

          <div className="recipe-body">
            <div className="recipe-section">
              <h3>Ingredients</h3>
              <div className="servings-adjuster">
                <label>Adjust servings:</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={servings}
                  onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                />
              </div>
              <ul className="ingredients-list">
                {recipe.ingredients.map((ingredient: Ingredient, index: number) => (
                  <li key={index}>
                    {adjustIngredients(ingredient.amount, ingredient.unit)} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="recipe-section">
              <h3>Instructions</h3>
              <ol className="instructions-list">
                {recipe.instructions.map((instruction: string, index: number) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            <div className="recipe-section">
              <h3>Nutrition Information</h3>
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <span className="nutrition-label">Calories</span>
                  <span className="nutrition-value">{recipe.nutrition.calories}</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Protein</span>
                  <span className="nutrition-value">{recipe.nutrition.protein}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Carbs</span>
                  <span className="nutrition-value">{recipe.nutrition.carbs}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Fat</span>
                  <span className="nutrition-value">{recipe.nutrition.fat}g</span>
                </div>
              </div>
            </div>

            <div className="recipe-section">
              <h3>Rate this Recipe</h3>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star: number) => (
                  <button
                    key={star}
                    className={`star ${star <= userRating ? 'filled' : ''}`}
                    onClick={() => setUserRating(star)}
                  >
                    ⭐
                  </button>
                ))}
              </div>
              {userRating > 0 && <p>Thank you for rating this recipe!</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail
