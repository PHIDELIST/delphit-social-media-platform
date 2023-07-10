import React, { useState } from 'react';
import './PostCreationPage.css';
import placeholder from '../assets/placeholder.jpg';
import {useDispatch} from "react-redux"
import {homeUI} from "../redux/uiSlice";
function PostCreationPage() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

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
  const handlePost = () => {
    console.log('Text:', text);
    console.log('Image:', image);
    // Reset the input fields after post submission
    setText('');
    setImage(null);
    setPreviewImage(null);
  };

  return (
    <div className="post-container">
      <h2>Create a Post</h2>
      <button onClick={handleProfile}>&larr; Back</button>
      <div className="post-form">
        <textarea
          value={text}
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
