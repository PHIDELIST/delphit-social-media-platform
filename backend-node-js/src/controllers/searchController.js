import sql from 'mssql';
import config from '../db/config.js';

// Controller function to search for posts based on a search query
export const searchPosts = async (req, res) => {
  const { query } = req.query;

  try {
    const pool = await sql.connect(config.sql);
    const searchQuery = `
      SELECT postID, userID, content, postImg, post_date, likesCount, repostCount
      FROM Posts
      WHERE content LIKE '%${query}%'
      ORDER BY likesCount DESC;
    `;

    const result = await pool.request().query(searchQuery);
    const searchResults = result.recordset;

    res.json(searchResults);
  } catch (error) {
    console.error('Error searching for posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
