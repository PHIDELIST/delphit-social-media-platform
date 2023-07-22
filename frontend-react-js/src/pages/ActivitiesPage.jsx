import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './ActivitiesPage.css';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { homeUI } from "../redux/uiSlice";

import { postimgurl, avatarurl, url } from '../utilis.js';

function ActivitiesPage() {
  const token = useSelector((state) => state.user.token);
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${url}/activities`, {
          headers: {
            authorization: token,
          },
        });
        console.log(response);
        const fetchedPosts = response.data.map((post) => ({
          ...post,
          username: post.username,
          avatar: post.avatarID,
          showComments: false,
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [token]);

  const handleDeletePost = async (postId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this post?');
    if (!shouldDelete) {
      return;
    }

    try {
      await axios.delete(`${url}/posts/${postId}`, {
        headers: {
          authorization: token,
        },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.postID !== postId));
      console.log('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdatePost = async (postId) => {
    try {
      await axios.put(
        `${url}/posts/${postId}`,
        {
          content: updatedContent,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
        }
      );

      // Update the post content in the local state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postID === postId ? { ...post, content: updatedContent } : post
        )
      );

      // Reset edit state after updating
      setEditPostId(null);
      setUpdatedContent('');

      console.log('Post updated successfully');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };
  const handleProfile = () => {
    dispatch(homeUI("profile"));
  };
  return (
    <div>
      <button onClick={handleProfile}>&larr;</button>
      <h6>Activities</h6>
      {posts.map((post) => (
        <div className="post" key={post.postID}>
          <div className="post-header">
            <img id="post-avatar" src={`${avatarurl}/${post.avatar}.jpeg`} alt="Profile pic" />
            <p>@{post.username}</p>
            <div id="post-userdetails">
              <p>{post.bio}</p>
            </div>
          </div>
          <div className="post-content">
            {editPostId === post.postID ? (
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                rows={4}
                cols={50}
              />
            ) : (
              <p>{post.content}</p>
            )}
            {post.postImg && (
              <img className="displayImg" src={`${postimgurl}/${post.postImg}.jpeg`} alt="post" />
            )}
          </div>
          <div className="post-actions">
            {editPostId === post.postID ? (
              <>
                <button onClick={() => handleUpdatePost(post.postID)}>Save</button>
                <button onClick={() => setEditPostId(null)}>Cancel</button>
              </>
            ) : (
              <div className="edit-action" onClick={() => setEditPostId(post.postID)}>
                <FaEdit className="icon" />
                <span>Edit</span>
              </div>
            )}
            <div className="delete-action" onClick={() => handleDeletePost(post.postID)}>
              <FaTrash className="icon" />
              <span>Delete</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActivitiesPage;
