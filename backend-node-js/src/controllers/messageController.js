import sql from 'mssql';
import config  from '../db/config.js';

export const storeMessage = async (req, res) => {
    const { room, author, message, time } = req.body;
    try {
      const pool = await sql.connect(config.sql);
      await pool.request()
        .input('room', sql.NVarChar, room)
        .input('author', sql.NVarChar, author)
        .input('message', sql.NVarChar, message)
        .input('time', sql.NVarChar, time)
        .query('INSERT INTO Messages (room, author, message, time) VALUES (@room, @author, @message, @time)');
        
      res.json({ message: 'Message stored successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while storing the message' });
    } finally {
      sql.close();
    }
  };

  //get messages for a specific room
 
  export const getChats = async (req, res) => {
    try {
      const pool = await sql.connect(config.sql);
  
      // Fetch all chat data from Messages table
      const query = `
        SELECT M.room, M.author, M.message, M.time, U.name, U.avatarID
        FROM Messages M
        INNER JOIN Users U ON M.author = U.name
        ORDER BY M.created_at DESC
      `;
  
      const result = await pool.request().query(query);
      const messages = result.recordset;
  
      // Create chat objects 
      const chats = messages.map((message) => ({
        id: message.room.split('-')[1],
        name: message.name,
        avatarID: message.avatarID,
        lastMessage: {
          message: message.message,
          timestamp: message.time,
        },
      }));
  
      res.json(chats);
    } catch (error) {
      console.error('Error fetching chats:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
