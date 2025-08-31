import React, { useState } from 'react'
import RecipeCard from './RecipeCard.js'
import type { Recipe, RecipeListProps } from '../types.js'

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onRecipeSelect, ingredients }) => {
  const [filter, setFilter] = useState<string>('')
  const [sortBy, setSortBy] = useState<'match' | 'time' | 'rating'>('match')

  const calculateMatchPercentage = (recipe: Recipe): number => {
    const ingredientNames = ingredients.map((i: Recipe['ingredients'][0]) => i.name.toLowerCase())
    const recipeIngredients = recipe.ingredients.map((i: Recipe['ingredients'][0]) => i.name.toLowerCase())

    const matches = ingredientNames.filter(name =>
      recipeIngredients.some(recipeIngredient =>
        recipeIngredient.includes(name) || name.includes(recipeIngredient)
      )
    ).length

    return Math.round((matches / Math.max(ingredientNames.length, recipeIngredients.length)) * 100)
  }

  const filteredAndSortedRecipes = recipes
    .map((recipe: Recipe) => ({
      ...recipe,
      matchPercentage: calculateMatchPercentage(recipe)
    }))
    .filter((recipe: Recipe) =>
      recipe.name.toLowerCase().includes(filter.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(filter.toLowerCase()) ||
      recipe.dietary.some(diet => diet.toLowerCase().includes(filter.toLowerCase()))
    )
    .sort((a: Recipe, b: Recipe) => {
      switch (sortBy) {
        case 'match':
          return (b.matchPercentage ?? 0) - (a.matchPercentage ?? 0)
        case 'time':
          return a.cookingTime - b.cookingTime
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

  return (
    <div className="recipe-list">
      <div className="recipe-list-header">
        <h2>Found {filteredAndSortedRecipes.length} Recipes</h2>

        <div className="filters">
          <input
            type="text"
            placeholder="Filter recipes..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-input"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'match' | 'time' | 'rating')}
            className="sort-select"
          >
            <option value="match">Sort by Match</option>
            <option value="time">Sort by Time</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>

      <div className="recipes-grid">
        {filteredAndSortedRecipes.map((recipe: Recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onSelect={onRecipeSelect}
            matchPercentage={recipe.matchPercentage ?? 0}
          />
        ))}
      </div>

      {filteredAndSortedRecipes.length === 0 && (
        <div className="no-recipes">
          <p>No recipes found matching your criteria.</p>
          <p>Try adding more ingredients or adjusting your filters.</p>
        </div>
      )}
    </div>
  )
}

export default RecipeList
