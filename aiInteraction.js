// AIInteraction.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AIInteraction = ({ userRole, userId }) => {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change for AI questions or feedback
  const handleInputChange = (e) => setInput(e.target.value);

  // Send interaction request to the AI backend endpoint
  const handleSend = async () => {
    if (!input) return;
    setIsLoading(true);

    try {
      const response = await axios.post('/api/ai/interact', {
        userRole,
        userId,
        message: input,
      });
      setResponses([...responses, { role: 'user', text: input }, { role: 'ai', text: response.data.reply }]);
    } catch (error) {
      console.error('Error interacting with AI:', error);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="ai-interaction">
      <div className="ai-chat">
        {responses.map((res, index) => (
          <div key={index} className={chat-bubble ${res.role}}>
            {res.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input type="text" value={input} onChange={handleInputChange} placeholder="Ask the AI..." />
        <button onClick={handleSend} disabled={isLoading}>
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default AIInteraction;