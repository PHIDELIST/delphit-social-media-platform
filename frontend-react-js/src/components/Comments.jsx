import React from 'react';

function Comments({ comments }) {
  return (
    <div className="comments">
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          {comment}
        </div>
      ))}
    </div>
  );
}

export default Comments;
