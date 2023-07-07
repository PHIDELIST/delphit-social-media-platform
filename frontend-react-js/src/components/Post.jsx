import React from 'react';


import Avatar from '../assets/Avatar.jpg'
import './Post.css'

function Post ({ username, avatar, content, image, likes, comments }){ //this are props that will be passed later
  return (
    <div className="post">
      <div className="post-header">
        <img src={Avatar} alt="Avatar" className="post-avatar" />
        <h4>@phidel</h4>
      </div>
      <div className="post-content">
        <p>A black hole is a region of spacetime where gravity is so strong that nothing, including light or other electromagnetic waves, has enough energy to escape it. The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole.</p>
        <img src={Avatar} alt="Post" className="post-image" />
      </div>
      <div className="post-actions">
        <div className="like-action">
          <i className="far fa-thumbs-up"></i>
          <span>like</span>
         
        </div>
        <div className="comment-action">
          <i className="far fa-comment"></i>
          <span>comment</span>
        </div>
        <div className="share-action">
          <i className="fas fa-share"></i>
        </div>
      </div>
    </div>
  );
};

export default Post;
