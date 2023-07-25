import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaComment, FaRetweet, FaTrash } from 'react-icons/fa';
import './Post.css';
import Comments from './Comments.jsx';
import CommentForm from '../form/CommentForm.jsx';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { postimgurl, avatarurl ,url} from '../utilis.js';

function Post() {
  const token = useSelector((state) => state.user.token);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${url}/posts`, {
        headers: {
          authorization: token,
        },
      });

      const fetchedPosts = response.data.map((post) => ({
        ...post,
        username: post.username,
        avatar: post.avatarID,
        showComments: false,
      }));

      fetchedPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));

      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 9000); 

    return () => clearInterval(interval); 
  }, []);
  
  const handleToggleComments = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postID === postId ? { ...post, showComments: !post.showComments } : post
      )
    );
  };

const handleAddComment = async (postId, comment) => {
  try {
    const response = await axios.post(
      `${url}/comments/${postId}`,
      {
        content: comment,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      }
    );

    // Update the comments in the local state
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.postID === postId) {
          const comments = post.comments || [];
          return {
            ...post,
            comments: [...comments, response.data.comment],
          };
        }
        return post;
      })
    );
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};

const handleLike = async (postId) => {
  try {
    // Find the post by postId
    const post = posts.find((post) => post.postID === postId);
    if (!post) return;

    // Toggle the like status
    const updatedPost = { ...post, isLiked: !post.isLiked };

    // Update the likes count in the local state
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postID === postId ? { ...post, likesCount: post.likesCount + (updatedPost.isLiked ? 1 : -1) } : post
      )
    );

    await axios.post(`${url}/likesupdate/${postId}`, {
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
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postID === postId ? { ...post, repostCount: post.repostCount + (updatedPost.isReposted ? 1 : -1) } : post
      )
    );

    await axios.post(`${url}/reposts/${postId}`, {
      isReposted: updatedPost.isReposted,
    });
    console.log('Reposts count updated in the backend');
  } catch (error) {
    console.error('Error updating reposts count:', error);
  }
};




  return (
    <div >
      {posts.map((post) => (
        <div className="post" key={post.postID}>
          <div className="post-header">
            <div id="post-avatar-container">
              <img id="post-avatar" src={`${avatarurl}/${post.avatar}.jpeg`} alt="Profile pic" />
            <div id='post-userdetails'>
              <p>@{post.username}</p>
              <p>{post.bio}</p>
            </div>
            </div>
            <div id = "date">
              <p>{new Date(post.post_date).toUTCString()}</p>
            </div>
          </div>
          <div className="post-content">
            {!post.postImg ? (
              <p>{post.content}</p>
            ) : (
              <>
                <p>{post.content}</p>
                
                <img className="displayImg" src={`${postimgurl}/${post.postImg}.jpeg`} alt="post" />
              </>
            )}
          </div>
          <div className="post-actions">
            <div className="like-action" onClick={() => handleLike(post.postID)}>
              <FaThumbsUp className="icon" />
              <span>Like</span>
              <span>{post.likesCount}</span>
            </div>
            <div className="comment-action" onClick={() => handleToggleComments(post.postID)}>
              <FaComment className="icon" />
              <span>Comment</span>
            </div>
            <div className="repost-action" onClick={() => handleRepost(post.postID)}>
              <FaRetweet className="icon" />
              <span>Repost</span>
              <span>{post.repostCount}</span>
            </div>
         
          </div>

          {post.showComments && (
            <div className="comments-container">
              <Comments comments={post.comments} postId={post.postID} />
            </div>
          )}
          {post.showComments && (
            <div className="comment-form-container">
              {post.comments && post.comments.length > 0 && <hr />}
              <CommentForm postId={post.postID} onAddComment={handleAddComment} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Post;
