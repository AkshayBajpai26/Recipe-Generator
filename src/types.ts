export type Ingredient = {
  name: string;
  amount: string;
  unit: string;
}

export type Nutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export type Recipe = {
  id: number;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  cookingTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  nutrition: Nutrition;
  cuisine: string;
  dietary: string[];
  rating: number;
  matchPercentage?: number;
}

export type RecipeCardProps = {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
  matchPercentage?: number;
}

export type IngredientInputProps = {
  onSubmit: (ingredients: Ingredient[]) => void;
}

export type RecipeListProps = {
  recipes: Recipe[];
  onRecipeSelect: (recipe: Recipe) => void;
  ingredients: Ingredient[];
}

export type RecipeDetailProps = {
  recipe: Recipe;
  onClose: () => void;
}

// New interface for AI image recognition response
export interface AIImageRecognitionResult {
  ingredients: Ingredient[];
  processingTime: number;
  // Add other properties here if needed
}
