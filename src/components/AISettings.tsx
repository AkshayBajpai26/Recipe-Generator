import React, { useState, useEffect } from 'react';
import { aiService } from '../services/aiService.js';

interface AISettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const AISettings: React.FC<AISettingsProps> = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  return (
    <div className="ai-settings-overlay">
      <div className="ai-settings-modal">
        <div className="ai-settings-header">
          <h2>🤖 AI Settings</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="ai-settings-content">
          <div className="ai-option">
            <h3>AI Recognition Method</h3>
            
            <div className="ai-options-grid">
              {Object.entries(availableOptions).map(([key, option]) => (
                <div 
                  key={key}
                  className={`ai-option-card ${selectedOption === key ? 'selected' : ''} ${!option.available ? 'disabled' : ''}`}
                  onClick={() => option.available && setSelectedOption(key)}
                >
                  <div className="ai-option-header">
                    <h4>{option.name}</h4>
                    <span className={`status ${option.available ? 'available' : 'unavailable'}`}>
                      {option.available ? '✓ Available' : '✗ Unavailable'}
                    </span>
                  </div>
                  <p>{option.description}</p>
                  <small>{option.setup}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="ai-option">
            <h3>API Configuration</h3>
            
            <div className="api-key-section">
              <label htmlFor="api-key">API Key (Optional)</label>
              <input
                id="api-key"
                type="password"
                placeholder="Enter your API key for enhanced features"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <small>
                Get free API keys from: 
                <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer"> Hugging Face</a> or 
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer"> OpenAI</a>
              </small>
            </div>

            <div className="local-model-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={useLocalModel}
                  onChange={(e) => setUseLocalModel(e.target.checked)}
                />
                <span>Use Local AI Model (Offline)</span>
              </label>
              <small>Runs AI models in your browser without internet connection</small>
            </div>
          </div>

          <div className="ai-info">
            <h3>ℹ️ About AI Features</h3>
            <ul>
              <li><strong>Local Model:</strong> Free, offline, runs in your browser</li>
              <li><strong>Hugging Face:</strong> Free tier with 1000 requests/month</li>
              <li><strong>Imagga:</strong> Free tier with 1000 requests/month</li>
              <li><strong>OpenAI:</strong> Advanced features, requires API key</li>
            </ul>
          </div>
        </div>

        <div className="ai-settings-footer">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="save-button" onClick={handleSave}>Save Settings</button>
        </div>
      </div>
    </div>
  );
};

export default AISettings;
