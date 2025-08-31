import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import AISettings from './AISettings.js';
const Header = () => {
    const [showAISettings, setShowAISettings] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx("header", { className: "header", children: _jsxs("div", { className: "header-content", children: [_jsx("h1", { className: "logo", children: "\uD83C\uDF73 Smart Recipe Generator" }), _jsx("p", { className: "tagline", children: "Discover delicious recipes from your available ingredients" }), _jsx("button", { className: "ai-settings-button", onClick: () => setShowAISettings(true), title: "Configure AI Settings", children: "\uD83E\uDD16 AI Settings" })] }) }), _jsx(AISettings, { isOpen: showAISettings, onClose: () => setShowAISettings(false) })] }));
};
export default Header;
