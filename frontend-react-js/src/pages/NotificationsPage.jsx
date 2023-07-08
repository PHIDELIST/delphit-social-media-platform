import React from 'react';
import './NotificationsPage.css';
import Avatar from '../components/Avatar';
function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      message: 'You have a new message from John Doe',
      name: 'phidel',
      time: '5 minutes ago',
      read: false,
      avatar: {Avatar},
    },
    {
      id: 2,
      message: 'You have a friend request from Jane Smith',
      name:'delphino',
      time: '1 hour ago',
      read: true,
      avatar: {Avatar},
    },
    {
    id: 3,
    message: 'You have a new message from John Doe',
    name: 'oluoch',
    time: '5 minutes ago',
    read: false,
    avatar: {Avatar},
  },
  {
    id: 4,
    message: 'You have a friend request from Jane Smith',
    name:'omuya',
    time: '1 hour ago',
    read: true,
    avatar: {Avatar},
  },
  {
  id: 5,
  message: 'You have a new message from John Doe',
  name: 'otiya',
  time: '5 minutes ago',
  read: false,
  avatar: {Avatar},
},
{
  id: 6,
  message: 'You have a friend request from Jane Smith',
  name:'jakoti',
  time: '1 hour ago',
  read: true,
  avatar: {Avatar},
},
    
  ];

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={notification.read ? 'read' : 'unread'}
            >
              <div className="notification-item">
                <div className="notification-avatar">
                  @{notification.name}
                  <Avatar />
                </div>
                <div className="notification-content">
                  <div className="notification-message">
                    {notification.message}
                  </div>
                  <div className="notification-time">{notification.time}</div>
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
