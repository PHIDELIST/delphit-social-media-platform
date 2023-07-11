import React, { useState } from 'react';
import './PostCreationPage.css';
import placeholder from '../assets/placeholder.jpg';
import { useDispatch } from "react-redux";
import { homeUI } from "../redux/uiSlice";
import axios from 'axios';
import { url } from '../utilis';
function PostCreationPage() {
  const [content, setContent] = useState('');
  const [postImg, setPostImg] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();

  const handleTextChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setPostImg(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleProfile = () => {
    dispatch(homeUI("profile"));
  };

  const handlePost = async () => {
    console.log('content:', content);
    console.log('Image:', postImg);
  
    const postData = {
      content,
      image: postImg,
    };
  console.log(postData);
    try {
      // Send the data to the backend
      await axios.post(`${url}/post/postcreation`, postData);
  
      console.log('Post submitted successfully');
  
      // Reset the input fields after post submission
      setContent('');
      setPostImg(null);
      setPreviewImage(null);
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };
  
  

  
  return (
    <div className="post-container">
      <h2>Create a Post</h2>
      <button onClick={handleProfile}>&larr; Back</button>
      <div className="post-form">
        <textarea
          value={content}
          onChange={handleTextChange}
          placeholder="Enter your post text..."
        ></textarea>
        <div className="image-preview">
          {previewImage ? (
            <img src={previewImage} alt="Preview" />
          ) : (
            <img src={placeholder} alt="Placeholder" />
          )}
        </div>
        <input type="file" onChange={handleImageChange} />
        <button onClick={handlePost}>Post</button>
      </div>
    </div>
  );
}

export default PostCreationPage;
