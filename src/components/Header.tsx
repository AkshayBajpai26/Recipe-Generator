import React, { useState } from 'react';
import AISettings from './AISettings.js';

const Header: React.FC = () => {
  const [showAISettings, setShowAISettings] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1 className="logo">
            🍳 Smart Recipe Generator
          </h1>
          <p className="tagline">
            Discover delicious recipes from your available ingredients
          </p>
          <button 
            className="ai-settings-button"
            onClick={() => setShowAISettings(true)}
            title="Configure AI Settings"
          >
            🤖 AI Settings
          </button>
        </div>
      </header>
      
      <AISettings 
        isOpen={showAISettings} 
        onClose={() => setShowAISettings(false)} 
      />
    </>
  );
};

export default Header;
