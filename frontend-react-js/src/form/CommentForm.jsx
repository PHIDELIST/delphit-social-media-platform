import React, { useState } from 'react';
import './CommentForm.css';

function CommentForm({ postId, onAddComment }) {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      await onAddComment(postId, comment); 
      setComment('');
    }
  };
  
  return (
    <form id="comment-form" onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CommentForm;
