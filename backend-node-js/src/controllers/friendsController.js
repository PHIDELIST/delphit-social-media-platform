import sql from 'mssql';
import config from '../db/config.js';

export const getFriends = async (req, res) => {
    const userID = req.user.userID;
  
    try {
      const pool = await sql.connect(config.sql);
      const query = `
        SELECT Friendship.friendship_id, Users.userID, Users.name, Users.avatarID
        FROM Users
        INNER JOIN Friendship ON (Users.userID = Friendship.user2ID)
        WHERE Friendship.user1ID = @userID
      `;
      const result = await pool
        .request()
        .input('userID', sql.Int, userID)
        .query(query);
  
      const friends = result.recordset;
      res.json(friends);
    } catch (error) {
      console.error('Error fetching friends:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  export const deleteFriendship = async (req, res) => {
    const friendshipId = req.params.friendship_id;
  
    try {
      const pool = await sql.connect(config.sql);
      const query = `DELETE FROM Friendship WHERE friendship_id = @friendshipId`;
      await pool.request().input('friendshipId', sql.Int, friendshipId).query(query);
  
      res.status(200).json({ message: 'Friendship deleted successfully' });
    } catch (error) {
      console.error('Error deleting friendship:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };