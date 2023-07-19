import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
function Comments({ postId }) {
  const [commentsData, setCommentsData] = useState([]);
  const token = useSelector((state) => state.user.token);
  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8081/comments/${postId}`,{
  //         headers: {
  //           'Content-Type': 'application/json',
  //           authorization: token,
            
  //         },
  //       });
  //       setCommentsData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching comments:', error);
  //     }
  //   };

  //   fetchComments();
  // }, []);

  return (
    <div>
      {commentsData.length > 0 ? (
        commentsData.map((comment) => (
          <div className="comment" key={comment.commentID}>
            
            <p>{comment.content}</p>
           
          </div>
        ))
      ) : (
        <p>...</p>
      )}
    </div>
  );
}

export default Comments;
