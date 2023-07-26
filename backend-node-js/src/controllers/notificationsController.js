import sql from 'mssql';
import config from '../db/config.js';

export const sendNotifications = async (author, message, room) => {
  try {
    // Get the sender's userID based on the author from the Users table
    const pool = await sql.connect(config.sql);
    const userQuery = `
      SELECT userID
      FROM Users
      WHERE name = @author
    `;
    const userResult = await pool
      .request()
      .input('author', sql.NVarChar, author)
      .query(userQuery);

    const senderUserID = userResult.recordset[0].userID;

    // Get the recipient's userID based on the room (friendship ID) from the Friendship table
    const friendshipQuery = `
      SELECT user1ID, user2ID
      FROM Friendship
      WHERE friendship_id = @room
    `;
    const friendshipResult = await pool
      .request()
      .input('room', sql.Int, room)
      .query(friendshipQuery);

    const user1ID = friendshipResult.recordset[0].user1ID;
    const user2ID = friendshipResult.recordset[0].user2ID;

    const recipientUserID = senderUserID === user1ID ? user2ID : user1ID;

    // Create a new notification
    const notificationQuery = `
      INSERT INTO Notifications (recipientUserID, message, timestamp, status)
      VALUES (@recipientUserID, @message, GETDATE(), 'unread')
    `;

    await pool
      .request()
      .input('recipientUserID', sql.NVarChar, recipientUserID)
      .input('message', sql.NVarChar, message)
      .query(notificationQuery);
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};



// Get all notifications
export const getNotifications = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const query = `
      SELECT notificationID as id, message, name, timestamp as time, status, Users.avatarID as avatar
      FROM Notifications
      INNER JOIN Users ON Notifications.recipientUserID = Users.userID
    `;
    const result = await pool.request().query(query);

    const notifications = result.recordset;
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Update notification status (mark as read)
export const updateNotificationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const pool = await sql.connect(config.sql);
      const query = `
        UPDATE Notifications
        SET status = @status // Change 'read' to 'status'
        WHERE notificationID = @id
      `;
      await pool
        .request()
        .input('id', sql.Int, id)
        .input('status', sql.NVarChar, status) 
        .query(query);
  
      res.sendStatus(200);
    } catch (error) {
      console.error('Error updating notification status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  