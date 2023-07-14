import React from 'react';

function Comments({ comments }) {
  return (
    <div>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div className="comment" key={comment.commentID}>
            <h5>@{comment.username}</h5>
            <p>{comment.content}</p>
            <p>{comment.comment_date}</p>
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
}

export default Comments;
