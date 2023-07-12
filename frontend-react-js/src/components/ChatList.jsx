import React from 'react';
import './ChatList.css';
import Avatar from './Avatar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/friendsSlice';

function ChatList({ onSelectChat }) {
  const dispatch = useDispatch();
  const yourUserId = useSelector((state) => state.user.userID);

  const chats = [
    {
      id: 1,
      name: 'phidel',
      avatar: 'path/to/avatar1.jpg',
      lastMessage: 'Hello there!',
      unreadCount: 0,
    },
    {
      id: 2,
      name: 'delphino',
      avatar: 'path/to/avatar1.jpg',
      lastMessage: 'Hello there!',
      unreadCount: 2,
    },
    
  ];

  const handleChatClick = (chat) => {
    const roomId = yourUserId + '-' + chat.id;
    dispatch(setSelectedUser(chat.id));
    onSelectChat(chat, roomId);
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
