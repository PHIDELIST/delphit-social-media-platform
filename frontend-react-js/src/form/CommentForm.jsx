import React, { useState } from 'react';

function CommentForm({ onAddComment }) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      onAddComment(comment);
      setComment('');
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
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
