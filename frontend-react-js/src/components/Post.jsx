import React, { useState } from 'react';
import { FaThumbsUp, FaComment, FaRetweet } from 'react-icons/fa';
import Avatar from '../assets/Avatar.jpg';
import './Post.css';
import Comments from './Comments.jsx';
import CommentForm from '../form/CommentForm.jsx';

function Post() {
  const username = 'phidel';
  const avatar = Avatar;
  const content =
    'A black hole is a region of spacetime where gravity is so strong that nothing, including light or other electromagnetic waves, has enough energy to escape it. The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole.';
  const image = Avatar;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(['This is the first comment']);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [reposts, setReposts] = useState(0);
  const [isReposted, setIsReposted] = useState(false);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleRepost = () => {
    if (isReposted) {
      setReposts(reposts - 1);
    } else {
      setReposts(reposts + 1);
    }
    setIsReposted(!isReposted);
  };

  return (
    <div className="post">
      <div className="post-header">
        <img src={avatar} alt="Avatar" className="post-avatar" />
        <h4>@{username}</h4>
      </div>
      <div className="post-content">
        <p>{content}</p>
        <img src={image} alt="Post" className="post-image" />
      </div>
      <div className="post-actions">
        <div className="like-action" onClick={handleLike}>
          {isLiked ? (
            <FaThumbsUp className="icon-liked" />
          ) : (
            <FaThumbsUp className="icon" />
          )}
          <span>{isLiked ? 'Liked' : 'Like'}</span>
          <span>{likes}</span>
        </div>
        <div className="comment-action" onClick={handleToggleComments}>
          <FaComment className="icon" />
          <span>Comment</span>
        </div>
        <div className="repost-action" onClick={handleRepost}>
          {isReposted ? (
            <FaRetweet className="icon-liked" />
          ) : (
            <FaRetweet className="icon" />
          )}
          <span>{isReposted ? 'Reposted' : 'Repost'}</span>
          <span>{reposts}</span>
        </div>
      </div>
      {showComments && (
        <div className="comments-container">
          <Comments comments={comments} />
        </div>
      )}
      {showComments && (
        <div className="comment-form-container">
          {comments.length > 0 && <hr />}
          <CommentForm onAddComment={handleAddComment} />
        </div>
      )}
    </div>
  );
}

export default Post;
