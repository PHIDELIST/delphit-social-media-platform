import React, { useEffect, useState } from 'react';
import './NotificationsPage.css';
import {useSelector} from 'react-redux';
import placeholder from '../assets/placeholder.jpg';
import axios from 'axios';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
const token = useSelector(state => state.user.token);
  useEffect(() => {
    // Fetch notifications from the backend API
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:8081/notifications',{
          headers:{
            'authorization':token
          
        }}); 
        const data = response.data;
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notificationID) => {
    // Make a request to the backend API to update the notification status
    try {
      await axios.patch(`http://localhost:8081/notifications/${notificationID}`, { read: true });
      // Update the local state to mark the notification as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.notificationID === notificationID ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  };

  return (
    <div className="notifications-container">
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notification) => (
            <li
              key={notification.notificationID}
              className={notification.read ? 'read' : 'unread'}
            >
              <div className="notification-item" onClick={() => handleNotificationClick(notification.notificationID)}>
                <div className="notification-avatar">
                  @{notification.name}
                  <img src={placeholder} alt="" />
                </div>
                <div className="notification-content">
                  <div className="notification-message">
                    {notification.message}
                  </div>
                  <div className="notification-time">{notification.timestamp}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotificationsPage;
