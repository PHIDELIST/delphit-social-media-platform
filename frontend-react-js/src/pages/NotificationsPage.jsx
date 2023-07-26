import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './NotificationsPage.css';
import placeholder from '../assets/placeholder.jpg';
import axios from 'axios';
import { url ,avatarurl} from '../utilis.js';
import { setLoading } from '../redux/loadingSlice.js';
import Loader from '../Loader.jsx'

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const token = useSelector(state => state.user.token);
  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotifications = async () => {
      // Set loading to true before fetching notifications
      dispatch(setLoading(true));

      try {
        const response = await axios.get(`${url}/notifications`,{
          headers: {
            'authorization': token
          }
        }); 
        const data = response.data;
      
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        
        dispatch(setLoading(false));
      }
    };

    fetchNotifications();
  }, [dispatch, token]);

  const handleNotificationClick = async (notificationID) => {
    // Make a request to the backend API to update the notification status
    try {
      await axios.patch(`${url}/notifications/${notificationID}`, { read: true });
      
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
      {isLoading ? (
        <Loader />
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
                  <img className="displayImg" src={`${avatarurl}/${notification.avatar}.jpeg`} alt="Profile pic" />
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
