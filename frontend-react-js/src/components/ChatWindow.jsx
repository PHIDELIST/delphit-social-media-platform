import React, { useState, useEffect } from 'react';
import './ChatWindow.css';
import Chatsocket from './Chatsocket'; 
import { FaPaperPlane } from 'react-icons/fa';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

function ChatWindow({ chat, onBack }) {
  const [showChat, setShowChat] = useState(false);
  const [socket, setSocket] = useState(null);

  const storedUsername = useSelector((state) => state.user.user);
  const storedUserId = useSelector ((state) => state.user.userID)
  const selectedUserId = useSelector((state) => state.friends.selectedUser);
  // const room = `${storedUserId}-${selectedUserId}`;
  const room = `${Math.min(storedUserId, selectedUserId)}-${Math.max(storedUserId, selectedUserId)}`;


  useEffect(() => {
    if (storedUsername && selectedUserId) {
      joinRoom();
    }
  }, [storedUsername, selectedUserId]);

  const joinRoom = () => {
    if (storedUsername && selectedUserId) {
      const newSocket = io.connect('http://localhost:8081');
      setSocket(newSocket);
      newSocket.emit('join_room', room);
      setShowChat(true);
    } else {
      // Handle error or show a message
    }
  };

  return (
    <div className="chat-window-container">
      <div className="chat-header">
        <button onClick={onBack}>&larr; Back</button>
        <h2>{chat.name}</h2>
      </div>
      {showChat ? (
        <Chatsocket socket={socket} username={storedUsername} room={room} />
      ) : null}
    </div>
  );
}

export default ChatWindow;
