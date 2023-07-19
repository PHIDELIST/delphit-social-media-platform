import sql from 'mssql';
import config from '../db/config.js';
import * as e from 'express';

export const createComment = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  const { postId } = req.params;
  const { content } = req.body;
  const userID = req.user.userID;
  console.log(postId, content);

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
      .query('INSERT INTO Comments (userID, postID, comment_date, content) OUTPUT inserted.commentID, inserted.userID, inserted.comment_date, inserted.content VALUES (@userID, @postId, @comment_date, @content)');

    const insertedComment = result.recordset[0]; // Newly inserted comment

    console.log('Comment created:', insertedComment);

    res.json({ message: 'Comment created successfully', comment: insertedComment });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    sql.close();
  }
};




export const getCommentsByPostID = async (req, res) => {
  const { postId } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const request = pool.request();

    const comments = await request
      .input('postId', sql.Int, postId)
      .query('SELECT * FROM Comments WHERE postID = @postId ORDER BY comment_date DESC');

    res.json(comments.recordset); 
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Internal server error' });
  } catch(error){
    console.log(error);
  }finally {
    sql.close();
  }
};
