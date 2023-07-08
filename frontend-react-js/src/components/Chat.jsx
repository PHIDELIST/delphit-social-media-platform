import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import './Chat.css';

function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleBackToChatList = () => {
    setSelectedChat(null);
  };

  return (
    <div className="chats-container">
      {selectedChat ? (
        <ChatWindow chat={selectedChat} onBack={handleBackToChatList} />
      ) : (
        <ChatList onSelectChat={handleSelectChat} />
      )}
    </div>
  );
}

export default Chat;
