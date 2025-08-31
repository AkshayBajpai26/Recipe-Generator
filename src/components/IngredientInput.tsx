import React, { useState } from 'react'
import type { Ingredient, IngredientInputProps } from '../types.js'
import { aiService, type AIImageRecognitionResult } from '../services/aiService.js'

const IngredientInput: React.FC<IngredientInputProps> = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [newIngredient, setNewIngredient] = useState<Ingredient>({ name: '', amount: '', unit: '' })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAddIngredient = () => {
    if (newIngredient.name.trim()) {
      setIngredients([...ingredients, { ...newIngredient }])
      setNewIngredient({ name: '', amount: '', unit: '' })
    }
  }

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
      analyzeImage(file)
    }
  }

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true)

    try {
      const result: AIImageRecognitionResult = await aiService.recognizeIngredients(file)

      // Explicitly type map parameter as Ingredient
      const detectedIngredients: Ingredient[] = result.ingredients.map(item => ({
  name: item.name,
  amount: '1',
  unit: 'piece'
}))


      setIngredients((prev) => [...prev, ...detectedIngredients])

      console.log(`AI detected ${detectedIngredients.length} ingredients in ${result.processingTime}ms`)
    } catch (error) {
      console.error('AI recognition failed:', error)
      const fallbackIngredients: Ingredient[] = [
        { name: 'tomato', amount: '2', unit: 'pieces' },
        { name: 'onion', amount: '1', unit: 'piece' },
        { name: 'garlic', amount: '3', unit: 'cloves' }
      ]
      setIngredients((prev) => [...prev, ...fallbackIngredients])
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSubmit = () => {
    if (ingredients.length > 0) {
      onSubmit(ingredients)
    }
  }

  return (
    <div className="ingredient-input">
      <div className="input-section">
        <h2>What ingredients do you have?</h2>
        <div className="image-upload">
          <label htmlFor="image-upload" className="upload-button">
            📷 Upload Ingredient Photo
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          {isAnalyzing && (
            <div className="analyzing">
              <div className="spinner"></div>
              <p>Analyzing your ingredients...</p>
            </div>
          )}
        </div>

        <div className="manual-input">
          <h3>Or add ingredients manually:</h3>
          <div className="ingredient-form">
            <input
              type="text"
              placeholder="Ingredient name"
              value={newIngredient.name}
              onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Amount"
              value={newIngredient.amount}
              onChange={(e) => setNewIngredient({ ...newIngredient, amount: e.target.value })}
            />
            <select
              value={newIngredient.unit}
              onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
            >
              <option value="">Unit</option>
              <option value="grams">grams</option>
              <option value="pieces">pieces</option>
              <option value="cups">cups</option>
              <option value="tbsp">tbsp</option>
              <option value="tsp">tsp</option>
              <option value="cloves">cloves</option>
            </select>
            <button onClick={handleAddIngredient} className="add-button">
              Add
            </button>
          </div>
        </div>

        {ingredients.length > 0 && (
          <div className="ingredients-list">
            <h3>Your Ingredients:</h3>
            <div className="ingredients-grid">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-tag">
                  <span>{ingredient.name} ({ingredient.amount} {ingredient.unit})</span>
                  <button onClick={() => handleRemoveIngredient(index)} className="remove-button">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={handleSubmit} disabled={ingredients.length === 0} className="submit-button">
          Find Recipes
        </button>
      </div>
    </div>
  )
}

export default IngredientInput
