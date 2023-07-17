import sql from 'mssql';
import config from '../db/config.js';

//get all users
export const getUsers = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    let users = await pool.request().query('SELECT userID,name, avatarID FROM Users');
    res.json(users.recordset);
  } catch (error) {
    res.status(500).json('Oops');
    console.log(error.message);
  }
};

//follow user

export const followUser = async (req, res) => {
  const { userID } = req.params;
  const followerID = req.user.userID;

  try {
    const pool = await sql.connect(config.sql);

    // Check if the follow relationship already exists
    const checkQuery = `SELECT friendship_id FROM Friendship WHERE user1ID = @followerID AND user2ID = @userID`;
    const checkResult = await pool.request()
      .input('followerID', sql.NVarChar, followerID)
      .input('userID', sql.NVarChar, userID)
      .query(checkQuery);

    if (checkResult.recordset.length > 0) {
      return res.status(400).json({ error: 'You are already following this user' });
    }

    // Create the follow relationship
    const insertQuery = `INSERT INTO Friendship (user1ID, user2ID, friendship_date) VALUES (@followerID, @userID, GETDATE())`;
    const insertResult = await pool.request()
      .input('followerID', sql.NVarChar, followerID)
      .input('userID', sql.NVarChar, userID)
      .query(insertQuery);

    res.status(200).json({ message: 'Follow request sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.error('Error following user:', error);
  }
};
