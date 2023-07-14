import config from "../db/config.js"
import sql from "mssql"

// Update likes count of a post
export const updateLikes = async (req, res) => {
  const { postId } = req.params;
  const { isLiked } = req.body;

  try {
    const pool = await sql.connect(config.sql);

    // Get the current likes count of the post
    const getCurrentLikesCountQuery = `
      SELECT likesCount
      FROM Posts
      WHERE postID = @postId
    `;
    const getCurrentLikesCountRequest = pool.request();
    getCurrentLikesCountRequest.input('postId', sql.Int, postId);
    const currentLikesResult = await getCurrentLikesCountRequest.query(getCurrentLikesCountQuery);
    const currentLikesCount = currentLikesResult.recordset[0].likesCount;

    // Calculate the updated likes count based on the isLiked value
    const updatedLikesCount = isLiked ? currentLikesCount + 1 : currentLikesCount - 1;

    // Update the likes count in the database
    const updateLikesCountQuery = `
      UPDATE Posts
      SET likesCount = @updatedLikesCount
      WHERE postID = @postId
    `;
    const updateLikesCountRequest = pool.request();
    updateLikesCountRequest.input('updatedLikesCount', sql.Int, updatedLikesCount);
    updateLikesCountRequest.input('postId', sql.Int, postId);
    await updateLikesCountRequest.query(updateLikesCountQuery);

    res.status(200).json({ message: 'Likes count updated successfully' });
  } catch (error) {
    console.error('Error updating likes count:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    sql.close();
  }
};

