import sql from 'mssql';
import config from '../db/config.js';

// Update the repost count and create a new reposted post
export const updateRepost = async (req, res) => {
    const { postId } = req.params;
    const { isReposted } = req.body;
    console.log(postId, isReposted);
  
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
  
      const originalPost = post.recordset[0];
  
      const repostCount = originalPost.repostCount + (isReposted ? 1 : -1);
  
      // Update the repost count for the original post
      await request
        .input('repostCount', sql.Int, repostCount)
        .query('UPDATE Posts SET repostCount = @repostCount WHERE postID = @postId');
  
      // Create a new reposted post
      if (isReposted) {
        const repostedPost = {
          userID: originalPost.userID,
          content: originalPost.content,
          postImg: originalPost.postImg,
          post_date: new Date(),
          likesCount: 0,
          repostCount: 0,
        };
  
        // Insert the reposted post into the database
        const insertResult = await request
          .input('repostedUserID', sql.NVarChar, repostedPost.userID)
          .input('repostedContent', sql.VarChar(1000), repostedPost.content)
          .input('repostedPostImg', sql.VarChar(256), repostedPost.postImg)
          .input('repostedPostDate', sql.Date, repostedPost.post_date)
          .input('repostedLikesCount', sql.Int, repostedPost.likesCount)
          .input('repostedRepostCount', sql.Int, repostedPost.repostCount)
          .query(
            'INSERT INTO Posts (userID, content, postImg, post_date, likesCount, repostCount) OUTPUT inserted.postID VALUES (@repostedUserID, @repostedContent, @repostedPostImg, @repostedPostDate, @repostedLikesCount, @repostedRepostCount)'
          );
  
        const repostedPostId = insertResult.recordset[0].postID;
        console.log(`Reposted post created with ID: ${repostedPostId}`);
      }
  
      res.json({ message: 'Repost count updated successfully' });
    } catch (error) {
      console.error('Error updating repost count:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      sql.close();
    }
  };
  