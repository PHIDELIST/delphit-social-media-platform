import React from 'react';
import './ChatList.css';
import Avatar from './Avatar.jsx'

function ChatList({ onSelectChat }) {
  const chats = [
    {
      id: 1,
      name: 'phidel',
      avatar: 'path/to/avatar1.jpg',
      lastMessage: 'Hello there!',
      unreadCount: 2,
    },
    {
      id: 2,
      name: 'listo',
      avatar: 'path/to/avatar2.jpg',
      lastMessage: 'How are you?',
      unreadCount: 0,
    },
    {
      id: 3,
      name: 'phinodelo',
      avatar: 'path/to/avatar1.jpg',
      lastMessage: 'Hello there!',
      unreadCount: 2,
    },
    {
      id: 4,
      name: 'delphi',
      avatar: 'path/to/avatar2.jpg',
      lastMessage: 'How are you?',
      unreadCount: 0,
    },
    {
      id: 5,
      name: 'oyamuz',
      avatar: 'path/to/avatar1.jpg',
      lastMessage: 'Hello there!',
      unreadCount: 2,
    },
    {
      id: 6,
      name: 'omuya',
      avatar: 'path/to/avatar2.jpg',
      lastMessage: 'How are you?',
      unreadCount: 0,
    },
  
  ];

  const handleChatClick = (chat) => {
    onSelectChat(chat);
  };

  return (
    <div className="chat-list-container">
      
      <ul className="chat-list">
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => handleChatClick(chat)}>
            <div className="chat-item">
              <div className="chat-item-avatar">
              @{chat.name}
               <Avatar />
              </div>
              <div className="chat-item-info">
                
                <p>{chat.lastMessage}</p>
                {chat.unreadCount > 0 && (
                  <div className="unread-count">{chat.unreadCount}</div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
