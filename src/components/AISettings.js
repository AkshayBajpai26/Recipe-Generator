import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { aiService } from '../services/aiService.js';
const AISettings = ({ isOpen, onClose }) => {
    const [apiKey, setApiKey] = useState('');
    const [useLocalModel, setUseLocalModel] = useState(false);
    const [selectedOption, setSelectedOption] = useState('local');
    useEffect(() => {
        // Load current settings
        const savedApiKey = localStorage.getItem('ai_api_key') || '';
        const savedUseLocal = localStorage.getItem('use_local_model') === 'true';
        setApiKey(savedApiKey);
        setUseLocalModel(savedUseLocal);
        setSelectedOption(savedUseLocal ? 'local' : 'cloud');
    }, []);
    const handleSave = () => {
        aiService.setApiKey(apiKey);
        aiService.setUseLocalModel(useLocalModel);
        onClose();
    };
    const availableOptions = aiService.getAvailableOptions();
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "ai-settings-overlay", children: _jsxs("div", { className: "ai-settings-modal", children: [_jsxs("div", { className: "ai-settings-header", children: [_jsx("h2", { children: "\uD83E\uDD16 AI Settings" }), _jsx("button", { className: "close-button", onClick: onClose, children: "\u00D7" })] }), _jsxs("div", { className: "ai-settings-content", children: [_jsxs("div", { className: "ai-option", children: [_jsx("h3", { children: "AI Recognition Method" }), _jsx("div", { className: "ai-options-grid", children: Object.entries(availableOptions).map(([key, option]) => (_jsxs("div", { className: `ai-option-card ${selectedOption === key ? 'selected' : ''} ${!option.available ? 'disabled' : ''}`, onClick: () => option.available && setSelectedOption(key), children: [_jsxs("div", { className: "ai-option-header", children: [_jsx("h4", { children: option.name }), _jsx("span", { className: `status ${option.available ? 'available' : 'unavailable'}`, children: option.available ? '✓ Available' : '✗ Unavailable' })] }), _jsx("p", { children: option.description }), _jsx("small", { children: option.setup })] }, key))) })] }), _jsxs("div", { className: "ai-option", children: [_jsx("h3", { children: "API Configuration" }), _jsxs("div", { className: "api-key-section", children: [_jsx("label", { htmlFor: "api-key", children: "API Key (Optional)" }), _jsx("input", { id: "api-key", type: "password", placeholder: "Enter your API key for enhanced features", value: apiKey, onChange: (e) => setApiKey(e.target.value) }), _jsxs("small", { children: ["Get free API keys from:", _jsx("a", { href: "https://huggingface.co/settings/tokens", target: "_blank", rel: "noopener noreferrer", children: " Hugging Face" }), " or", _jsx("a", { href: "https://platform.openai.com/api-keys", target: "_blank", rel: "noopener noreferrer", children: " OpenAI" })] })] }), _jsxs("div", { className: "local-model-section", children: [_jsxs("label", { className: "checkbox-label", children: [_jsx("input", { type: "checkbox", checked: useLocalModel, onChange: (e) => setUseLocalModel(e.target.checked) }), _jsx("span", { children: "Use Local AI Model (Offline)" })] }), _jsx("small", { children: "Runs AI models in your browser without internet connection" })] })] }), _jsxs("div", { className: "ai-info", children: [_jsx("h3", { children: "\u2139\uFE0F About AI Features" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("strong", { children: "Local Model:" }), " Free, offline, runs in your browser"] }), _jsxs("li", { children: [_jsx("strong", { children: "Hugging Face:" }), " Free tier with 1000 requests/month"] }), _jsxs("li", { children: [_jsx("strong", { children: "Imagga:" }), " Free tier with 1000 requests/month"] }), _jsxs("li", { children: [_jsx("strong", { children: "OpenAI:" }), " Advanced features, requires API key"] })] })] })] }), _jsxs("div", { className: "ai-settings-footer", children: [_jsx("button", { className: "cancel-button", onClick: onClose, children: "Cancel" }), _jsx("button", { className: "save-button", onClick: handleSave, children: "Save Settings" })] })] }) }));
};
export default AISettings;
