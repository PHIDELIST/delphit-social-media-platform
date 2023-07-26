import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import './Comments.css';
import { url } from '../utilis';
import { setLoading } from '../redux/loadingSlice';

function Comments({ postId }) {
  const [commentsData, setCommentsData] = useState([]);
  const token = useSelector((state) => state.user.token);
  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch(); 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        dispatch(setLoading(true)); 

        const response = await axios.get(`${url}/comments/${postId}`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
        });

        setCommentsData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        dispatch(setLoading(false)); 
      }
    };

    fetchComments();
  }, [dispatch, postId, token]);

  return (
    <div>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : commentsData.length > 0 ? (
        commentsData.map((comment) => (
          <div id="comment" key={comment.commentID}>
            <div id='comment-content'>
              <div id='commented-by'>
                <p>{"Comment by: " + comment.name}</p>
              </div>
              <p>{comment.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No comments yet...</p>
      )}
    </div>
  );
}

export default Comments;
