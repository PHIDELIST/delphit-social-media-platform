import React, { useState } from 'react';
import './PostCreationPage.css';
import placeholder from '../assets/placeholder.jpg';
import { useDispatch, useSelector } from "react-redux";
import { homeUI } from "../redux/uiSlice";
import axios from 'axios';
import { url, presurl_posts } from '../utilis';

function PostCreationPage() {
  const token = useSelector((state) => state.user.token);
  const [content, setContent] = useState('');
  const [postImg, setPostImg] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [updatedPostImg, setUpdatedPostImg] = useState(null);
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
      content: content,
      postImg: postImg ? postImg.name : null,
    };
    
  
    console.log('postData:', postData);
  
    try {
      const response = await axios.post(`${url}/posts`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: token,
        },
      });
  console.log(postData);
      console.log('Post submitted successfully');
      const { updatedPostImg } = response.data;
      console.log('Updated post image:', updatedPostImg);

      // Set the updatedPostImg value in the state
      setUpdatedPostImg(updatedPostImg);

      // Upload the post image
      if (postImg) {
        const extension = postImg.name.split('.').pop();
        const requestBody = {
          updatedPostImg: updatedPostImg,
          extension: extension,
        };
        try {
          const response = await axios.post(presurl_posts, requestBody);
          if (response.status === 200) {
            
            const presignedurl = response.data.url;
            try {
              const uploadResponse = await axios.put(presignedurl, postImg, {
                headers: {
                  'Content-Type': "application/octet-stream",
                }
              });
              if (uploadResponse.status === 200) {
                console.log('Upload successful');
              } else {
                console.log('Upload failed');
              }
            } catch (err) {
              console.error('Error uploading image:', err);
            }
          } else {
            console.error('Error getting presigned URL');
          }
        } catch (err) {
          console.error('Error requesting presigned URL:', err);
        }
      }

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
      <button onClick={handleProfile}>&larr;</button>
      <div className="post-form">
        <textarea value={content} onChange={handleTextChange} placeholder="Enter your post text..."></textarea>
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
