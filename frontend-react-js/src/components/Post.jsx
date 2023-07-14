import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaComment, FaRetweet } from 'react-icons/fa';
import Avatar from '../assets/Avatar.jpg';
import './Post.css';
import Comments from './Comments.jsx';
import CommentForm from '../form/CommentForm.jsx';
import axios from 'axios';

function Post() {
  const username = 'phidel';
  const avatar = Avatar;
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [reposts, setReposts] = useState(0);
  const [isReposted, setIsReposted] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/posts');
        const fetchedPosts = response.data;
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };

  const handleLike = async (postId) => {
    try {
      // Find the post by postId
      const post = posts.find((post) => post.postID === postId);
      if (!post) return;

      // Toggle the like status
      const updatedPost = { ...post, isLiked: !post.isLiked };

      // Update the likes count in the local state
      const updatedPosts = posts.map((post) =>
        post.postID === postId ? { ...post, likesCount: post.likesCount + (updatedPost.isLiked ? 1 : -1) } : post
      );
      setPosts(updatedPosts);

      // Make an API request to update the likes count in the backend
      await axios.post(`http://localhost:8081/likesupdate/${postId}`, {
        isLiked: updatedPost.isLiked,
      });
      console.log('Likes count updated in the backend');
    } catch (error) {
      console.error('Error updating likes count:', error);
    }
  };

  const handleRepost = async (postId) => {
    try {
      // Find the post by postId
      const post = posts.find((post) => post.postID === postId);
      if (!post) return;

      // Toggle the repost status
      const updatedPost = { ...post, isReposted: !post.isReposted };

      // Update the reposts count in the local state
      const updatedPosts = posts.map((post) =>
        post.postID === postId ? { ...post, repostCount: post.repostCount + (updatedPost.isReposted ? 1 : -1) } : post
      );
      setPosts(updatedPosts);

      // Make an API request to update the reposts count in the backend
      await axios.post(`http://localhost:8081/reposts/${postId}`, {
        isReposted: updatedPost.isReposted,
      });
      console.log('Reposts count updated in the backend');
    } catch (error) {
      console.error('Error updating reposts count:', error);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div className="post" key={post.postID}>
          <div className="post-header">
            <img src={avatar} alt="Avatar" className="post-avatar" />
            <h4>@{username}</h4>
          </div>
          <div className="post-content">
            <p>{post.content}</p>
            <img src={post.postImg} alt="Post" className="post-image" />
          </div>
          <div className="post-actions">
            <div className="like-action" onClick={() => handleLike(post.postID)}>
              <FaThumbsUp className="icon" />
              <span>Like</span>
              <span>{post.likesCount}</span>
            </div>
            <div className="comment-action" onClick={handleToggleComments}>
              <FaComment className="icon" />
              <span>Comment</span>
            </div>
            <div className="repost-action" onClick={() => handleRepost(post.postID)}>
              <FaRetweet className="icon" />
              <span>Repost</span>
              <span>{post.repostCount}</span>
            </div>
          </div>

          {showComments && (
            <div className="comments-container">
              <Comments comments={post.comments} />
            </div>
          )}
          {showComments && (
            <div className="comment-form-container">
              {post.comments && post.comments.length > 0 && <hr />}
              <CommentForm onAddComment={handleAddComment} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Post;
