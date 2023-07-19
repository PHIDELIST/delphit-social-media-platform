import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './Chatsocket.css';
import { url } from '../utilis';

function Chatsocket({ username, room }) {
  const [socket, setSocket] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Connect to the socket server
    const newSocket = io(`${url}`);
    newSocket.emit('join_room', room); // Join the room
    setSocket(newSocket);
  
    return () => newSocket.disconnect();
  }, [room]);

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages from the socket server
      socket.on('receive_message', (data) => {
        setMessageList((list) => [...list, data]);
        console.log(messageList);
      });
    }
  }, [socket, messageList]);

  const sendMessage = async () => {
    if (currentMessage.trim() !== '') {
      // Create a message object
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };
 // Send message to the HTTP server 
      try {
        const response = await axios.post(`${url}/messages`, messageData);
        if (response.status === 200) {
          setMessageList((list) => [...list, messageData]);
          setCurrentMessage('');
          console.log('Message sent successfully');
        } else {
          console.error('Failed to send message to HTTP server:', response.status);
        }
      } catch (error) {
        console.error('Error sending message to HTTP server:', error);
      }
      // Emit message to the socket server
      socket.emit('send_message', messageData);

      setMessageList((list) => [...list, messageData]); // Add the sent message to the list
      setCurrentMessage(''); // Clear the input field after sending
      inputRef.current.focus(); // Focus on the input field after sending
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-body">
        <div className="message-container">
          {messageList.map((messageContent, index) => (
            <div className="message" key={index} id={username === messageContent.author ? 'you' : 'other'}>
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-footer">
        <input type="textarea" value={currentMessage} placeholder="Delphit..." onChange={(event) => setCurrentMessage(event.target.value)} onKeyPress={(event) => event.key === 'Enter' && sendMessage()} ref={inputRef} />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chatsocket;
