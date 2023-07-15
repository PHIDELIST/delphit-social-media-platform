import sql from 'mssql'
import config from '../db/config.js'

export const createPost = async (req, res) => {
  const { content, postImg } = req.body;
  const userID = req.user.userID;
console.log(content, postImg, userID);
  try {
    const pool = await sql.connect(config.sql);
    const request = pool.request();

    request.input('userID', sql.Int, userID);
    request.input('content', sql.VarChar, content);
    request.input('postImg', sql.VarChar, postImg);

    const result = await request.query(
      'INSERT INTO Posts (userID, content, postImg) OUTPUT inserted.postID VALUES (@userID, @content, @postImg)'
    );

    const { postID } = result.recordset[0];

    const updatedPostImg = `${postID}`; // Combine postID and postImg

    const updateRequest = pool.request();
    updateRequest.input('postID', sql.Int, postID);
    updateRequest.input('updatedPostImg', sql.VarChar, updatedPostImg);

    await updateRequest.query(
      'UPDATE Posts SET postImg = @updatedPostImg WHERE postID = @postID'
    );
console.log(updatedPostImg);
    res.json({ message: 'Post created successfully', updatedPostImg: updatedPostImg });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred' });
  } finally {
    sql.close();
  }
};


    
  
//get all posts
export const getAllPosts = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .query(
        `SELECT Posts.*, Users.name AS username, Users.avatarID 
         FROM Posts
         INNER JOIN Users ON Posts.userID = Users.userID`
      );

    const posts = result.recordset;
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while retrieving posts.' });
  } finally {
    sql.close();
  }
};
