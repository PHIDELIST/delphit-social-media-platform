import sql from 'mssql'
import config from '../db/config.js'

export const createPost = async (req, res) => {
  const { content, postImg } = req.body;
  const userID = req.user.userID;
console.log(content, postImg, userID);
  try {
    const pool = await sql.connect(config.sql);
    const request = pool.request();

    request.input('userID', sql.NVarChar, userID);
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
        `SELECT Posts.*, Users.name AS username, Users.avatarID ,Users.bio
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
//getting posts for a specific user
export const getUserPosts = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const userID = req.user.userID;
    const result = await pool
      .request()
      .input('userID', sql.NVarChar, userID)
      .query(
        `SELECT Posts.*, Users.name AS username, Users.avatarID, Users.bio
         FROM Posts
         INNER JOIN Users ON Posts.userID = Users.userID
         WHERE Posts.userID = @userID`
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


//update post
export const postUpdate = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const pool = await sql.connect(config.sql);

    //  check if the post with the given postId exists
    const checkPostQuery = `SELECT * FROM Posts WHERE postID = @postId`;
    const checkPostResult = await pool.request().input('postId', sql.Int, postId).query(checkPostQuery);

    if (checkPostResult.recordset.length === 0) {
      return res.status(404).json({ error: 'Post not found.' });
    }
    // Update the post's content
    const updatePostQuery = `UPDATE Posts SET content = @content WHERE postID = @postId`;
    await pool.request().input('content', sql.NVarChar, content).input('postId', sql.Int, postId).query(updatePostQuery);

    res.json({ message: 'Post updated successfully.' });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: 'An error occurred while updating the post.' });
  } finally {
    sql.close();
  }
};



//delete posts
export const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const request = pool.request();

    // Find the post by postId
    const post = await request
      .input('selectPostId', sql.Int, postId) 
      .query('SELECT * FROM Posts WHERE postID = @selectPostId');

    if (!post.recordset[0]) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete the post from the database
    await request
      .input('deletePostId', sql.Int, postId) // Unique parameter name for DELETE query
      .query('DELETE FROM Posts WHERE postID = @deletePostId');

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    sql.close();
  }
};


