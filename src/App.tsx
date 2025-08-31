import React, { useState } from 'react';
import './App.css';
import Header from './components/Header.js';
import IngredientInput from './components/IngredientInput.js';
import RecipeList from './components/RecipeList.js';
import RecipeDetail from './components/RecipeDetail.js';
import type { Recipe, Ingredient } from './types.js';


function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const handleIngredientsSubmit = async (newIngredients: Ingredient[]) => {
    setLoading(true);
    setLoadingStep(0);
    setIngredients(newIngredients);
    
    // Simulate API call to get recipes with step-by-step loading
    setTimeout(() => {
      setLoadingStep(1); // Analyzing ingredients
    }, 500);
    
    setTimeout(() => {
      setLoadingStep(2); // Searching recipes
    }, 1500);
    
    setTimeout(() => {
      setLoadingStep(3); // Calculating matches
    }, 2500);
    
    setTimeout(() => {
      const matchedRecipes = generateRecipes(newIngredients);
      setRecipes(matchedRecipes);
      setLoading(false);
      setLoadingStep(0);
    }, 3500);
  };

  const generateRecipes = (ingredients: Ingredient[]): Recipe[] => {
    // This is a simplified recipe matching algorithm
    // In a real app, this would use AI/ML services
    const ingredientNames = ingredients.map((i: Ingredient) => i.name.toLowerCase());
    
    return sampleRecipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map((i: Ingredient) => i.name.toLowerCase());
      const matchCount = ingredientNames.filter(name => 
        recipeIngredients.some((recipeIngredient: string) => 
          recipeIngredient.includes(name) || name.includes(recipeIngredient)
        )
      ).length;
      
      return matchCount >= Math.min(2, ingredients.length);
    });
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <IngredientInput onSubmit={handleIngredientsSubmit} />
        
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Finding delicious recipes for you...</p>
            <div className="loading-steps">
              <div className={`loading-step ${loadingStep >= 1 ? 'completed' : ''}`}>
                <div className={`step-icon ${loadingStep === 1 ? 'active' : loadingStep > 1 ? 'completed' : 'pending'}`}>
                  {loadingStep > 1 ? '✓' : loadingStep === 1 ? '⟳' : '1'}
                </div>
                <span>Analyzing your ingredients</span>
              </div>
              <div className={`loading-step ${loadingStep >= 2 ? 'completed' : ''}`}>
                <div className={`step-icon ${loadingStep === 2 ? 'active' : loadingStep > 2 ? 'completed' : 'pending'}`}>
                  {loadingStep > 2 ? '✓' : loadingStep === 2 ? '⟳' : '2'}
                </div>
                <span>Searching recipe database</span>
              </div>
              <div className={`loading-step ${loadingStep >= 3 ? 'completed' : ''}`}>
                <div className={`step-icon ${loadingStep === 3 ? 'active' : loadingStep > 3 ? 'completed' : 'pending'}`}>
                  {loadingStep > 3 ? '✓' : loadingStep === 3 ? '⟳' : '3'}
                </div>
                <span>Calculating perfect matches</span>
              </div>
            </div>
      </div>
        )}
        
        {!loading && recipes.length > 0 && (
          <RecipeList 
            recipes={recipes} 
            onRecipeSelect={setSelectedRecipe}
            ingredients={ingredients}
          />
        )}
        
        {selectedRecipe && (
          <RecipeDetail 
            recipe={selectedRecipe} 
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </main>
      </div>
  );
}

// Sample recipe data
const sampleRecipes: Recipe[] = [
  {
    id: 1,
    name: "Pasta Carbonara",
    description: "Classic Italian pasta with eggs, cheese, and pancetta",
    ingredients: [
      { name: "pasta", amount: "200g", unit: "grams" },
      { name: "eggs", amount: "2", unit: "pieces" },
      { name: "cheese", amount: "50g", unit: "grams" },
      { name: "bacon", amount: "100g", unit: "grams" },
      { name: "black pepper", amount: "1", unit: "tsp" }
    ],
    instructions: [
      "Boil pasta according to package instructions",
      "Cook bacon until crispy",
      "Beat eggs with cheese and pepper",
      "Mix hot pasta with egg mixture",
      "Add bacon and serve immediately"
    ],
    cookingTime: 20,
    difficulty: "Easy",
    servings: 2,
    nutrition: {
      calories: 450,
      protein: 25,
      carbs: 45,
      fat: 20
    },
    cuisine: "Italian",
    dietary: ["vegetarian"],
    rating: 4.5
  },
  {
    id: 2,
    name: "Chicken Stir Fry",
    description: "Quick and healthy stir-fried chicken with vegetables",
    ingredients: [
      { name: "chicken", amount: "300g", unit: "grams" },
      { name: "vegetables", amount: "200g", unit: "grams" },
      { name: "soy sauce", amount: "2", unit: "tbsp" },
      { name: "oil", amount: "1", unit: "tbsp" },
      { name: "garlic", amount: "2", unit: "cloves" }
    ],
    instructions: [
      "Cut chicken into bite-sized pieces",
      "Heat oil in a wok or large pan",
      "Stir-fry chicken until golden",
      "Add vegetables and garlic",
      "Season with soy sauce and serve"
    ],
    cookingTime: 15,
    difficulty: "Easy",
    servings: 3,
    nutrition: {
      calories: 350,
      protein: 35,
      carbs: 15,
      fat: 18
    },
    cuisine: "Asian",
    dietary: ["gluten-free"],
    rating: 4.2
  },
  {
    id: 3,
    name: "Vegetable Soup",
    description: "Hearty vegetable soup perfect for cold days",
    ingredients: [
      { name: "vegetables", amount: "500g", unit: "grams" },
      { name: "onion", amount: "1", unit: "piece" },
      { name: "garlic", amount: "3", unit: "cloves" },
      { name: "vegetable broth", amount: "1", unit: "liter" },
      { name: "herbs", amount: "1", unit: "tbsp" }
    ],
    instructions: [
      "Chop all vegetables",
      "Sauté onion and garlic",
      "Add vegetables and broth",
      "Simmer for 30 minutes",
      "Season with herbs and serve"
    ],
    cookingTime: 45,
    difficulty: "Easy",
    servings: 4,
    nutrition: {
      calories: 120,
      protein: 8,
      carbs: 20,
      fat: 3
    },
    cuisine: "International",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    rating: 4.0
  },
  {
    id: 4,
    name: "Margherita Pizza",
    description: "Classic Italian pizza with tomato, mozzarella, and basil",
    ingredients: [
      { name: "pizza dough", amount: "250g", unit: "grams" },
      { name: "tomato sauce", amount: "100ml", unit: "ml" },
      { name: "mozzarella", amount: "150g", unit: "grams" },
      { name: "basil", amount: "10", unit: "leaves" },
      { name: "olive oil", amount: "2", unit: "tbsp" }
    ],
    instructions: [
      "Preheat oven to 250°C",
      "Roll out pizza dough",
      "Spread tomato sauce",
      "Add mozzarella and basil",
      "Bake for 12-15 minutes"
    ],
    cookingTime: 25,
    difficulty: "Medium",
    servings: 2,
    nutrition: {
      calories: 380,
      protein: 18,
      carbs: 55,
      fat: 12
    },
    cuisine: "Italian",
    dietary: ["vegetarian"],
    rating: 4.7
  },
  {
    id: 5,
    name: "Beef Tacos",
    description: "Mexican beef tacos with fresh vegetables and salsa",
    ingredients: [
      { name: "beef", amount: "400g", unit: "grams" },
      { name: "tortillas", amount: "8", unit: "pieces" },
      { name: "tomato", amount: "2", unit: "pieces" },
      { name: "lettuce", amount: "1", unit: "head" },
      { name: "cheese", amount: "100g", unit: "grams" }
    ],
    instructions: [
      "Cook beef with spices",
      "Warm tortillas",
      "Chop vegetables",
      "Assemble tacos",
      "Serve with salsa"
    ],
    cookingTime: 20,
    difficulty: "Easy",
    servings: 4,
    nutrition: {
      calories: 420,
      protein: 28,
      carbs: 35,
      fat: 22
    },
    cuisine: "Mexican",
    dietary: [],
    rating: 4.3
  },
  {
    id: 6,
    name: "Greek Salad",
    description: "Fresh Mediterranean salad with feta and olives",
    ingredients: [
      { name: "cucumber", amount: "1", unit: "piece" },
      { name: "tomato", amount: "3", unit: "pieces" },
      { name: "olives", amount: "100g", unit: "grams" },
      { name: "feta cheese", amount: "150g", unit: "grams" },
      { name: "olive oil", amount: "3", unit: "tbsp" }
    ],
    instructions: [
      "Chop cucumber and tomatoes",
      "Add olives and feta",
      "Drizzle with olive oil",
      "Season with herbs",
      "Serve immediately"
    ],
    cookingTime: 10,
    difficulty: "Easy",
    servings: 4,
    nutrition: {
      calories: 180,
      protein: 8,
      carbs: 8,
      fat: 15
    },
    cuisine: "Mediterranean",
    dietary: ["vegetarian", "gluten-free"],
    rating: 4.4
  },
  {
    id: 7,
    name: "Chicken Curry",
    description: "Spicy Indian chicken curry with rice",
    ingredients: [
      { name: "chicken", amount: "500g", unit: "grams" },
      { name: "rice", amount: "200g", unit: "grams" },
      { name: "curry powder", amount: "2", unit: "tbsp" },
      { name: "coconut milk", amount: "400ml", unit: "ml" },
      { name: "onion", amount: "2", unit: "pieces" }
    ],
    instructions: [
      "Cook chicken with spices",
      "Add coconut milk",
      "Simmer until thickened",
      "Cook rice separately",
      "Serve curry over rice"
    ],
    cookingTime: 40,
    difficulty: "Medium",
    servings: 4,
    nutrition: {
      calories: 520,
      protein: 32,
      carbs: 45,
      fat: 25
    },
    cuisine: "Indian",
    dietary: ["gluten-free"],
    rating: 4.6
  },
  {
    id: 8,
    name: "Caesar Salad",
    description: "Classic Caesar salad with croutons and parmesan",
    ingredients: [
      { name: "lettuce", amount: "1", unit: "head" },
      { name: "croutons", amount: "100g", unit: "grams" },
      { name: "parmesan", amount: "50g", unit: "grams" },
      { name: "caesar dressing", amount: "4", unit: "tbsp" },
      { name: "lemon", amount: "1", unit: "piece" }
    ],
    instructions: [
      "Wash and chop lettuce",
      "Make croutons",
      "Prepare dressing",
      "Toss all ingredients",
      "Serve with lemon wedges"
    ],
    cookingTime: 15,
    difficulty: "Easy",
    servings: 2,
    nutrition: {
      calories: 280,
      protein: 12,
      carbs: 18,
      fat: 20
    },
    cuisine: "American",
    dietary: ["vegetarian"],
    rating: 4.1
  },
  {
    id: 9,
    name: "Fish and Chips",
    description: "British classic with crispy battered fish and chips",
    ingredients: [
      { name: "fish fillets", amount: "400g", unit: "grams" },
      { name: "potatoes", amount: "500g", unit: "grams" },
      { name: "flour", amount: "100g", unit: "grams" },
      { name: "beer", amount: "200ml", unit: "ml" },
      { name: "oil", amount: "500ml", unit: "ml" }
    ],
    instructions: [
      "Cut potatoes into chips",
      "Make beer batter",
      "Fry fish in batter",
      "Fry chips until golden",
      "Serve with tartar sauce"
    ],
    cookingTime: 35,
    difficulty: "Medium",
    servings: 4,
    nutrition: {
      calories: 650,
      protein: 35,
      carbs: 55,
      fat: 35
    },
    cuisine: "British",
    dietary: [],
    rating: 4.3
  },
  {
    id: 10,
    name: "Vegetable Lasagna",
    description: "Layered pasta with vegetables and cheese",
    ingredients: [
      { name: "lasagna sheets", amount: "12", unit: "pieces" },
      { name: "vegetables", amount: "600g", unit: "grams" },
      { name: "ricotta cheese", amount: "300g", unit: "grams" },
      { name: "tomato sauce", amount: "500ml", unit: "ml" },
      { name: "mozzarella", amount: "200g", unit: "grams" }
    ],
    instructions: [
      "Cook lasagna sheets",
      "Layer vegetables and cheese",
      "Add tomato sauce",
      "Bake for 45 minutes",
      "Let rest before serving"
    ],
    cookingTime: 60,
    difficulty: "Medium",
    servings: 6,
    nutrition: {
      calories: 420,
      protein: 22,
      carbs: 45,
      fat: 18
    },
    cuisine: "Italian",
    dietary: ["vegetarian"],
    rating: 4.4
  },
  {
    id: 11,
    name: "Thai Green Curry",
    description: "Spicy Thai curry with coconut milk and vegetables",
    ingredients: [
      { name: "green curry paste", amount: "3", unit: "tbsp" },
      { name: "coconut milk", amount: "400ml", unit: "ml" },
      { name: "vegetables", amount: "400g", unit: "grams" },
      { name: "fish sauce", amount: "2", unit: "tbsp" },
      { name: "rice", amount: "200g", unit: "grams" }
    ],
    instructions: [
      "Fry curry paste",
      "Add coconut milk",
      "Add vegetables",
      "Season with fish sauce",
      "Serve with rice"
    ],
    cookingTime: 30,
    difficulty: "Medium",
    servings: 4,
    nutrition: {
      calories: 380,
      protein: 12,
      carbs: 35,
      fat: 22
    },
    cuisine: "Thai",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    rating: 4.5
  },
  {
    id: 12,
    name: "Beef Burger",
    description: "Juicy beef burger with fresh toppings",
    ingredients: [
      { name: "beef mince", amount: "400g", unit: "grams" },
      { name: "burger buns", amount: "4", unit: "pieces" },
      { name: "lettuce", amount: "1", unit: "head" },
      { name: "tomato", amount: "2", unit: "pieces" },
      { name: "cheese", amount: "100g", unit: "grams" }
    ],
    instructions: [
      "Form beef patties",
      "Grill or pan-fry patties",
      "Toast burger buns",
      "Add toppings",
      "Serve with fries"
    ],
    cookingTime: 20,
    difficulty: "Easy",
    servings: 4,
    nutrition: {
      calories: 550,
      protein: 35,
      carbs: 40,
      fat: 28
    },
    cuisine: "American",
    dietary: [],
    rating: 4.2
  },
  {
    id: 13,
    name: "Mushroom Risotto",
    description: "Creamy Italian risotto with wild mushrooms",
    ingredients: [
      { name: "arborio rice", amount: "300g", unit: "grams" },
      { name: "mushrooms", amount: "400g", unit: "grams" },
      { name: "vegetable broth", amount: "1", unit: "liter" },
      { name: "parmesan", amount: "100g", unit: "grams" },
      { name: "white wine", amount: "100ml", unit: "ml" }
    ],
    instructions: [
      "Sauté mushrooms",
      "Toast rice",
      "Add wine and broth gradually",
      "Stir until creamy",
      "Finish with parmesan"
    ],
    cookingTime: 35,
    difficulty: "Medium",
    servings: 4,
    nutrition: {
      calories: 420,
      protein: 18,
      carbs: 65,
      fat: 12
    },
    cuisine: "Italian",
    dietary: ["vegetarian"],
    rating: 4.6
  },
  {
    id: 14,
    name: "Chicken Noodle Soup",
    description: "Comforting soup with chicken and vegetables",
    ingredients: [
      { name: "chicken", amount: "300g", unit: "grams" },
      { name: "noodles", amount: "200g", unit: "grams" },
      { name: "vegetables", amount: "300g", unit: "grams" },
      { name: "chicken broth", amount: "1.5", unit: "liters" },
      { name: "herbs", amount: "2", unit: "tbsp" }
    ],
    instructions: [
      "Cook chicken in broth",
      "Add vegetables",
      "Cook noodles",
      "Combine all ingredients",
      "Season and serve"
    ],
    cookingTime: 40,
    difficulty: "Easy",
    servings: 4,
    nutrition: {
      calories: 280,
      protein: 25,
      carbs: 35,
      fat: 8
    },
    cuisine: "International",
    dietary: [],
    rating: 4.3
  },
  {
    id: 15,
    name: "Vegetable Stir Fry",
    description: "Quick and healthy vegetable stir fry",
    ingredients: [
      { name: "vegetables", amount: "500g", unit: "grams" },
      { name: "soy sauce", amount: "3", unit: "tbsp" },
      { name: "oil", amount: "2", unit: "tbsp" },
      { name: "garlic", amount: "3", unit: "cloves" },
      { name: "ginger", amount: "1", unit: "tbsp" }
    ],
    instructions: [
      "Chop all vegetables",
      "Heat oil in wok",
      "Stir-fry vegetables",
      "Add sauce and seasonings",
      "Serve hot"
    ],
    cookingTime: 15,
    difficulty: "Easy",
    servings: 3,
    nutrition: {
      calories: 180,
      protein: 8,
      carbs: 25,
      fat: 8
    },
    cuisine: "Asian",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    rating: 4.1
  },
  {
    id: 16,
    name: "Beef Steak",
    description: "Grilled beef steak with herbs and butter",
    ingredients: [
      { name: "beef steak", amount: "400g", unit: "grams" },
      { name: "butter", amount: "50g", unit: "grams" },
      { name: "herbs", amount: "2", unit: "tbsp" },
      { name: "garlic", amount: "2", unit: "cloves" },
      { name: "potatoes", amount: "300g", unit: "grams" }
    ],
    instructions: [
      "Season steak",
      "Grill to desired doneness",
      "Make herb butter",
      "Cook potatoes",
      "Rest steak before serving"
    ],
    cookingTime: 25,
    difficulty: "Medium",
    servings: 2,
    nutrition: {
      calories: 650,
      protein: 45,
      carbs: 25,
      fat: 40
    },
    cuisine: "International",
    dietary: [],
    rating: 4.7
  },
  {
    id: 17,
    name: "Quinoa Bowl",
    description: "Healthy quinoa bowl with roasted vegetables",
    ingredients: [
      { name: "quinoa", amount: "200g", unit: "grams" },
      { name: "vegetables", amount: "400g", unit: "grams" },
      { name: "olive oil", amount: "3", unit: "tbsp" },
      { name: "lemon", amount: "1", unit: "piece" },
      { name: "herbs", amount: "2", unit: "tbsp" }
    ],
    instructions: [
      "Cook quinoa",
      "Roast vegetables",
      "Make dressing",
      "Combine ingredients",
      "Serve warm or cold"
    ],
    cookingTime: 30,
    difficulty: "Easy",
    servings: 3,
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 12
    },
    cuisine: "International",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    rating: 4.4
  },
  {
    id: 18,
    name: "Salmon Teriyaki",
    description: "Japanese-style salmon with teriyaki sauce",
    ingredients: [
      { name: "salmon", amount: "400g", unit: "grams" },
      { name: "teriyaki sauce", amount: "4", unit: "tbsp" },
      { name: "rice", amount: "200g", unit: "grams" },
      { name: "vegetables", amount: "200g", unit: "grams" },
      { name: "sesame seeds", amount: "2", unit: "tbsp" }
    ],
    instructions: [
      "Marinate salmon",
      "Cook rice",
      "Grill salmon",
      "Steam vegetables",
      "Serve with sauce"
    ],
    cookingTime: 25,
    difficulty: "Medium",
    servings: 4,
    nutrition: {
      calories: 420,
      protein: 35,
      carbs: 35,
      fat: 18
    },
    cuisine: "Japanese",
    dietary: ["gluten-free"],
    rating: 4.5
  },
  {
    id: 19,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with chocolate frosting",
    ingredients: [
      { name: "flour", amount: "200g", unit: "grams" },
      { name: "cocoa powder", amount: "50g", unit: "grams" },
      { name: "sugar", amount: "200g", unit: "grams" },
      { name: "eggs", amount: "3", unit: "pieces" },
      { name: "milk", amount: "200ml", unit: "ml" }
    ],
    instructions: [
      "Mix dry ingredients",
      "Add wet ingredients",
      "Pour into pan",
      "Bake for 30 minutes",
      "Frost when cool"
    ],
    cookingTime: 45,
    difficulty: "Medium",
    servings: 8,
    nutrition: {
      calories: 380,
      protein: 6,
      carbs: 55,
      fat: 15
    },
    cuisine: "International",
    dietary: ["vegetarian"],
    rating: 4.8
  },
  {
    id: 20,
    name: "Apple Pie",
    description: "Classic American apple pie with flaky crust",
    ingredients: [
      { name: "apples", amount: "800g", unit: "grams" },
      { name: "pie crust", amount: "2", unit: "pieces" },
      { name: "sugar", amount: "150g", unit: "grams" },
      { name: "cinnamon", amount: "2", unit: "tsp" },
      { name: "butter", amount: "50g", unit: "grams" }
    ],
    instructions: [
      "Prepare pie crust",
      "Slice and season apples",
      "Fill pie crust",
      "Add top crust",
      "Bake until golden"
    ],
    cookingTime: 60,
    difficulty: "Hard",
    servings: 8,
    nutrition: {
      calories: 320,
      protein: 4,
      carbs: 45,
      fat: 12
    },
    cuisine: "American",
    dietary: ["vegetarian"],
    rating: 4.6
  }
];

export default App;
