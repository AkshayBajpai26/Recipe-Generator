import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import RecipeCard from './RecipeCard.js';
const RecipeList = ({ recipes, onRecipeSelect, ingredients }) => {
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('match');
    const calculateMatchPercentage = (recipe) => {
        const ingredientNames = ingredients.map((i) => i.name.toLowerCase());
        const recipeIngredients = recipe.ingredients.map((i) => i.name.toLowerCase());
        const matches = ingredientNames.filter(name => recipeIngredients.some(recipeIngredient => recipeIngredient.includes(name) || name.includes(recipeIngredient))).length;
        return Math.round((matches / Math.max(ingredientNames.length, recipeIngredients.length)) * 100);
    };
    const filteredAndSortedRecipes = recipes
        .map((recipe) => ({
        ...recipe,
        matchPercentage: calculateMatchPercentage(recipe)
    }))
        .filter((recipe) => recipe.name.toLowerCase().includes(filter.toLowerCase()) ||
        recipe.cuisine.toLowerCase().includes(filter.toLowerCase()) ||
        recipe.dietary.some(diet => diet.toLowerCase().includes(filter.toLowerCase())))
        .sort((a, b) => {
        switch (sortBy) {
            case 'match':
                return (b.matchPercentage ?? 0) - (a.matchPercentage ?? 0);
            case 'time':
                return a.cookingTime - b.cookingTime;
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });
    return (_jsxs("div", { className: "recipe-list", children: [_jsxs("div", { className: "recipe-list-header", children: [_jsxs("h2", { children: ["Found ", filteredAndSortedRecipes.length, " Recipes"] }), _jsxs("div", { className: "filters", children: [_jsx("input", { type: "text", placeholder: "Filter recipes...", value: filter, onChange: (e) => setFilter(e.target.value), className: "filter-input" }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "sort-select", children: [_jsx("option", { value: "match", children: "Sort by Match" }), _jsx("option", { value: "time", children: "Sort by Time" }), _jsx("option", { value: "rating", children: "Sort by Rating" })] })] })] }), _jsx("div", { className: "recipes-grid", children: filteredAndSortedRecipes.map((recipe) => (_jsx(RecipeCard, { recipe: recipe, onSelect: onRecipeSelect, matchPercentage: recipe.matchPercentage ?? 0 }, recipe.id))) }), filteredAndSortedRecipes.length === 0 && (_jsxs("div", { className: "no-recipes", children: [_jsx("p", { children: "No recipes found matching your criteria." }), _jsx("p", { children: "Try adding more ingredients or adjusting your filters." })] }))] }));
};
export default RecipeList;
