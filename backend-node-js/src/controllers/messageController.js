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
  export const getMessages = async (req, res) => {
    const { room } = req.params;
    try {
      const pool = await sql.connect(config.sql);
      const result = await pool.request()
        .input('room', sql.NVarChar, room)
        .query('SELECT message FROM Messages WHERE room = @room');
      res.json(result.recordset);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while retrieving the messages' });
    } finally {
      sql.close();
    }
  }