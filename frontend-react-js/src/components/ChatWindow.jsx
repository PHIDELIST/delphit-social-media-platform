import React from 'react';
import './ChatWindow.css';
import { FaPaperPlane } from 'react-icons/fa';


function ChatWindow({ chat, onBack }) {
  return (
    <div className="chat-window-container">
      <div className="chat-header">
        <button onClick={onBack}>&larr; Back</button>
        <h2>{chat.name}</h2>
      </div>
      <div className="chat-messages">
        {chat.lastMessage}
      </div>
      <div className="chat-input">
        <textarea type="text" placeholder="Type your message..." />
        <button><FaPaperPlane /></button>
      </div>
    </div>
  );
}

export default ChatWindow;
