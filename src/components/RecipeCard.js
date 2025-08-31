import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const RecipeCard = ({ recipe, onSelect, matchPercentage }) => {
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return '#4CAF50';
            case 'Medium': return '#FF9800';
            case 'Hard': return '#F44336';
            default: return '#666';
        }
    };
    return (_jsxs("div", { className: "recipe-card", onClick: () => onSelect(recipe), children: [_jsxs("div", { className: "recipe-card-header", children: [_jsx("h3", { className: "recipe-name", children: recipe.name }), _jsxs("div", { className: "match-badge", style: { backgroundColor: (matchPercentage ?? 0) > 70 ? '#4CAF50' : (matchPercentage ?? 0) > 40 ? '#FF9800' : '#F44336' }, children: [matchPercentage, "% Match"] })] }), _jsx("p", { className: "recipe-description", children: recipe.description }), _jsxs("div", { className: "recipe-meta", children: [_jsxs("div", { className: "meta-item", children: [_jsx("span", { className: "meta-label", children: "\u23F1\uFE0F" }), _jsxs("span", { children: [recipe.cookingTime, " min"] })] }), _jsxs("div", { className: "meta-item", children: [_jsx("span", { className: "meta-label", children: "\uD83D\uDC65" }), _jsxs("span", { children: [recipe.servings, " servings"] })] }), _jsxs("div", { className: "meta-item", children: [_jsx("span", { className: "meta-label", children: "\u2B50" }), _jsx("span", { children: recipe.rating })] })] }), _jsxs("div", { className: "recipe-details", children: [_jsx("div", { className: "difficulty-badge", style: { backgroundColor: getDifficultyColor(recipe.difficulty) }, children: recipe.difficulty }), _jsx("div", { className: "cuisine-badge", children: recipe.cuisine })] }), _jsx("div", { className: "dietary-tags", children: recipe.dietary.map((diet) => (_jsx("span", { className: "dietary-tag", children: diet }, diet))) }), _jsxs("div", { className: "nutrition-preview", children: [_jsxs("span", { children: ["\uD83D\uDD25 ", recipe.nutrition.calories, " cal"] }), _jsxs("span", { children: ["\uD83E\uDD69 ", recipe.nutrition.protein, "g protein"] })] }), _jsx("button", { className: "view-recipe-btn", children: "View Recipe" })] }));
};
export default RecipeCard;
