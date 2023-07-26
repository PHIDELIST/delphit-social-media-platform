import React, { useEffect, useState } from 'react';
import './ChatList.css';
import Avatar from './Avatar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/friendsSlice';
import axios from 'axios';
import { url } from '../utilis';
import Loader from '../Loader.jsx';

function ChatList({ onSelectChat }) {
  const dispatch = useDispatch();
  const yourUserId = useSelector((state) => state.user.userID);
  const yourUserName = useSelector((state) => state.user.name);
  const token = useSelector((state) => state.user.token);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${url}/messages`, {
          headers: {
            Authorization: token,
          },
        });
        const fetchedChats = response.data;
        setChats(fetchedChats);
        setIsLoading(false); // Data has been fetched successfully, set isLoading to false
      } catch (error) {
        console.error('Error fetching chats:', error);
        setIsLoading(false); // An error occurred, set isLoading to false
      }
    };

    fetchChats();
  }, []);

  const handleChatClick = (chat) => {
    const roomId = yourUserId + '-' + chat.id;
    dispatch(setSelectedUser(chat.id));
    onSelectChat(chat, roomId);
  };

  return (
    <div className="chat-list-container">
      {isLoading ? (
       <Loader />
      ) : (
        <ul className="chat-list">
          {chats.map((chat, index) => (
            <li key={index} onClick={() => handleChatClick(chat)}>
              <div className="chat-item">
                <div className="chat-item-avatar">
                  @{chat.name}
                  <Avatar avatarID={chat.avatarID} />
                </div>
                <div className="chat-item-info">
                  <p>{chat.lastMessage.message}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ChatList;
