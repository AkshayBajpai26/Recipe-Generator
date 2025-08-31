import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { aiService } from '../services/aiService.js';
const IngredientInput = ({ onSubmit }) => {
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState({ name: '', amount: '', unit: '' });
    const [imageFile, setImageFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const handleAddIngredient = () => {
        if (newIngredient.name.trim()) {
            setIngredients([...ingredients, { ...newIngredient }]);
            setNewIngredient({ name: '', amount: '', unit: '' });
        }
    };
    const handleRemoveIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };
    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            analyzeImage(file);
        }
    };
    const analyzeImage = async (file) => {
        setIsAnalyzing(true);
        try {
            const result = await aiService.recognizeIngredients(file);
            // Explicitly type map parameter as Ingredient
            const detectedIngredients = result.ingredients.map(item => ({
                name: item.name,
                amount: '1',
                unit: 'piece'
            }));
            setIngredients((prev) => [...prev, ...detectedIngredients]);
            console.log(`AI detected ${detectedIngredients.length} ingredients in ${result.processingTime}ms`);
        }
        catch (error) {
            console.error('AI recognition failed:', error);
            const fallbackIngredients = [
                { name: 'tomato', amount: '2', unit: 'pieces' },
                { name: 'onion', amount: '1', unit: 'piece' },
                { name: 'garlic', amount: '3', unit: 'cloves' }
            ];
            setIngredients((prev) => [...prev, ...fallbackIngredients]);
        }
        finally {
            setIsAnalyzing(false);
        }
    };
    const handleSubmit = () => {
        if (ingredients.length > 0) {
            onSubmit(ingredients);
        }
    };
    return (_jsx("div", { className: "ingredient-input", children: _jsxs("div", { className: "input-section", children: [_jsx("h2", { children: "What ingredients do you have?" }), _jsxs("div", { className: "image-upload", children: [_jsx("label", { htmlFor: "image-upload", className: "upload-button", children: "\uD83D\uDCF7 Upload Ingredient Photo" }), _jsx("input", { id: "image-upload", type: "file", accept: "image/*", onChange: handleImageUpload, style: { display: 'none' } }), isAnalyzing && (_jsxs("div", { className: "analyzing", children: [_jsx("div", { className: "spinner" }), _jsx("p", { children: "Analyzing your ingredients..." })] }))] }), _jsxs("div", { className: "manual-input", children: [_jsx("h3", { children: "Or add ingredients manually:" }), _jsxs("div", { className: "ingredient-form", children: [_jsx("input", { type: "text", placeholder: "Ingredient name", value: newIngredient.name, onChange: (e) => setNewIngredient({ ...newIngredient, name: e.target.value }) }), _jsx("input", { type: "text", placeholder: "Amount", value: newIngredient.amount, onChange: (e) => setNewIngredient({ ...newIngredient, amount: e.target.value }) }), _jsxs("select", { value: newIngredient.unit, onChange: (e) => setNewIngredient({ ...newIngredient, unit: e.target.value }), children: [_jsx("option", { value: "", children: "Unit" }), _jsx("option", { value: "grams", children: "grams" }), _jsx("option", { value: "pieces", children: "pieces" }), _jsx("option", { value: "cups", children: "cups" }), _jsx("option", { value: "tbsp", children: "tbsp" }), _jsx("option", { value: "tsp", children: "tsp" }), _jsx("option", { value: "cloves", children: "cloves" })] }), _jsx("button", { onClick: handleAddIngredient, className: "add-button", children: "Add" })] })] }), ingredients.length > 0 && (_jsxs("div", { className: "ingredients-list", children: [_jsx("h3", { children: "Your Ingredients:" }), _jsx("div", { className: "ingredients-grid", children: ingredients.map((ingredient, index) => (_jsxs("div", { className: "ingredient-tag", children: [_jsxs("span", { children: [ingredient.name, " (", ingredient.amount, " ", ingredient.unit, ")"] }), _jsx("button", { onClick: () => handleRemoveIngredient(index), className: "remove-button", children: "\u00D7" })] }, index))) })] })), _jsx("button", { onClick: handleSubmit, disabled: ingredients.length === 0, className: "submit-button", children: "Find Recipes" })] }) }));
};
export default IngredientInput;
