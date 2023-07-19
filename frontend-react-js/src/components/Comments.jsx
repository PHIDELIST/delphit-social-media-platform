import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Comments.css'
function Comments({ postId }) {
  const [commentsData, setCommentsData] = useState([]);
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${url}/comments/${postId}`,{
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
            
          },
        });
        setCommentsData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div>
      {commentsData.length > 0 ? (
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
        <p>...</p>
      )}
    </div>
  );
}

export default Comments;
