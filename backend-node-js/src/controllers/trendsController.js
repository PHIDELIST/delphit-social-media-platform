import sql from 'mssql';
import config from '../db/config.js';

export const getPostsTrends = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const query = `
      SELECT TOP 1 content
      FROM Posts
      ORDER BY likesCount DESC;
    `;

    const result = await pool.request().query(query);
    const postWithHighestLikes = result.recordset[0];

    // Extract the first 4 words from the content
    const first4Words = postWithHighestLikes.content.split(' ').slice(0, 6).join(' ');

    res.json({ postWithHighestLikes, first4Words });
  } catch (error) {
    console.error('Error fetching post with highest likes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

