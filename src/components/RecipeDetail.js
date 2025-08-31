import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const RecipeDetail = ({ recipe, onClose }) => {
    const [servings, setServings] = useState(recipe.servings);
    const [userRating, setUserRating] = useState(0);
    const adjustIngredients = (amount, unit) => {
        const baseAmount = parseFloat(amount);
        const adjustedAmount = (baseAmount / recipe.servings) * servings;
        return `${adjustedAmount.toFixed(1)} ${unit}`;
    };
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy':
                return '#4CAF50';
            case 'Medium':
                return '#FF9800';
            case 'Hard':
                return '#F44336';
            default:
                return '#666';
        }
    };
    return (_jsx("div", { className: "recipe-detail-overlay", children: _jsxs("div", { className: "recipe-detail-modal", children: [_jsx("button", { className: "close-button", onClick: onClose, children: "\u00D7" }), _jsxs("div", { className: "recipe-detail-content", children: [_jsxs("div", { className: "recipe-header", children: [_jsx("h1", { children: recipe.name }), _jsx("p", { className: "recipe-description", children: recipe.description }), _jsxs("div", { className: "recipe-stats", children: [_jsxs("div", { className: "stat", children: [_jsx("span", { className: "stat-icon", children: "\u23F1\uFE0F" }), _jsxs("span", { children: [recipe.cookingTime, " minutes"] })] }), _jsxs("div", { className: "stat", children: [_jsx("span", { className: "stat-icon", children: "\uD83D\uDC65" }), _jsxs("span", { children: [servings, " servings"] })] }), _jsxs("div", { className: "stat", children: [_jsx("span", { className: "stat-icon", children: "\u2B50" }), _jsx("span", { children: recipe.rating })] })] }), _jsxs("div", { className: "recipe-badges", children: [_jsx("div", { className: "difficulty-badge", style: { backgroundColor: getDifficultyColor(recipe.difficulty) }, children: recipe.difficulty }), _jsx("div", { className: "cuisine-badge", children: recipe.cuisine }), recipe.dietary.map((diet) => (_jsx("div", { className: "dietary-badge", children: diet }, diet)))] })] }), _jsxs("div", { className: "recipe-body", children: [_jsxs("div", { className: "recipe-section", children: [_jsx("h3", { children: "Ingredients" }), _jsxs("div", { className: "servings-adjuster", children: [_jsx("label", { children: "Adjust servings:" }), _jsx("input", { type: "number", min: 1, max: 20, value: servings, onChange: (e) => setServings(parseInt(e.target.value) || 1) })] }), _jsx("ul", { className: "ingredients-list", children: recipe.ingredients.map((ingredient, index) => (_jsxs("li", { children: [adjustIngredients(ingredient.amount, ingredient.unit), " ", ingredient.name] }, index))) })] }), _jsxs("div", { className: "recipe-section", children: [_jsx("h3", { children: "Instructions" }), _jsx("ol", { className: "instructions-list", children: recipe.instructions.map((instruction, index) => (_jsx("li", { children: instruction }, index))) })] }), _jsxs("div", { className: "recipe-section", children: [_jsx("h3", { children: "Nutrition Information" }), _jsxs("div", { className: "nutrition-grid", children: [_jsxs("div", { className: "nutrition-item", children: [_jsx("span", { className: "nutrition-label", children: "Calories" }), _jsx("span", { className: "nutrition-value", children: recipe.nutrition.calories })] }), _jsxs("div", { className: "nutrition-item", children: [_jsx("span", { className: "nutrition-label", children: "Protein" }), _jsxs("span", { className: "nutrition-value", children: [recipe.nutrition.protein, "g"] })] }), _jsxs("div", { className: "nutrition-item", children: [_jsx("span", { className: "nutrition-label", children: "Carbs" }), _jsxs("span", { className: "nutrition-value", children: [recipe.nutrition.carbs, "g"] })] }), _jsxs("div", { className: "nutrition-item", children: [_jsx("span", { className: "nutrition-label", children: "Fat" }), _jsxs("span", { className: "nutrition-value", children: [recipe.nutrition.fat, "g"] })] })] })] }), _jsxs("div", { className: "recipe-section", children: [_jsx("h3", { children: "Rate this Recipe" }), _jsx("div", { className: "rating-stars", children: [1, 2, 3, 4, 5].map((star) => (_jsx("button", { className: `star ${star <= userRating ? 'filled' : ''}`, onClick: () => setUserRating(star), children: "\u2B50" }, star))) }), userRating > 0 && _jsx("p", { children: "Thank you for rating this recipe!" })] })] })] })] }) }));
};
export default RecipeDetail;
