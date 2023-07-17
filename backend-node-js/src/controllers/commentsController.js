import sql from 'mssql';
import config from '../db/config.js';

export const createComment = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userID = req.user.userID;
  
    try {
      const pool = await sql.connect(config.sql);
      const request = pool.request();
  
      // Find the post by postId
      const post = await request
        .input('postId', sql.Int, postId)
        .query('SELECT * FROM Posts WHERE postID = @postId');
  
      if (!post.recordset[0]) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Create a new comment
      const newComment = {
        userID: userID,
        postID: postId,
        comment_date: new Date(),
        content: content,
      };
  
      // Insert the comment into the database
      const result = await request
  .input('userID', sql.NVarChar, newComment.userID)
  .input('comment_date', sql.DateTime2, newComment.comment_date)
  .input('content', sql.VarChar(500), newComment.content)
  .query('INSERT INTO Comments (userID, postID, comment_date, content) OUTPUT inserted.commentID VALUES (@userID, @postId, @comment_date, @content)');

      const commentId = result.recordset[0].commentID;
      console.log(`Comment created with ID: ${commentId}`);
  
      res.json({ message: 'Comment created successfully' });
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      sql.close();
    }
  };
  