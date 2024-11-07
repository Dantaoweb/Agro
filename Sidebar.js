import React, { useState } from 'react';
import AIInteraction from './AIInteraction';

const Sidebar = () => {
  const [showAI, setShowAI] = useState(false);

  const handleAIClick = () => {
    setShowAI(!showAI);
  };

  return (
    <div className="sidebar">
      <button onClick={handleAIClick} className="ai-button">AI Assistant</button>
      {showAI && <AIInteraction />}
    </div>
  );
};

export default Sidebar;