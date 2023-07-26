import React, { useState } from "react";
import placeholderImage from "../assets/placeholder.jpg";
import './EditProfilePage.css'
import { useDispatch, useSelector } from "react-redux";
import { homeUI } from "../redux/uiSlice";
import axios from 'axios';
import { presurl, url } from '../utilis';

// Loader component (assuming you have already implemented it)
import Loader from "../Loader";

export default function ProfileForm() {
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add the isSubmitting state
  const dispatch = useDispatch();
  const avatarname = useSelector(state => state.user.userID);
  const token = useSelector(state => state.user.token);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleProfile = () => {
    dispatch(homeUI("profile"));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewAvatar(null);
    }
  };

  const handleUpdateProfile = async () => {
    setIsSubmitting(true); // Set isSubmitting to true when update starts

    // Update avatar in S3
    if (avatar) {
      const extension = avatar.name.split('.').pop();
      const requestBody = {
        userID: avatarname,
        extension: extension,
      };

      try {
        const response = await axios.post(presurl, requestBody);
        if (response.status === 200) {
          const presignedurl = response.data.url;
          try {
            const uploadResponse = await axios.put(presignedurl, avatar, {
              method: "PUT",
              body: avatar,
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
            console.log(err);
          }
        } else {
          console.log('Error getting presigned URL');
        }
      } catch (err) {
        console.log('Error requesting presigned URL:', err);
      }
    }

    // Update bio in the backend
    try {
      const bioResponse = await axios.post(`${url}/updateprofile`, {
        bio: bio, 
      },{
        headers:{
          authorization:token
        }
      });

      if (bioResponse.status === 200) {
        console.log('Bio update successful');
      } else {
        console.log('Bio update failed');
      }
    } catch (err) {
      console.log('Error updating bio:', err);
    }

    setIsSubmitting(false); // Set isSubmitting back to false when update is complete
    setBio("");
    setAvatar(null);
    setPreviewAvatar(null);
  };

  return (
    <>
      <button onClick={handleProfile}>&larr;</button>
      <div className="profile-form">
        <div className="avatar-preview">
          {previewAvatar ? (
            <img src={previewAvatar} alt="Preview" />
          ) : (
            <img src={placeholderImage} alt="Placeholder" />
          )}
        </div>
        <input type="file" name="avatarupload" onChange={handleAvatarChange} />
        <textarea
          value={bio}
          onChange={handleBioChange}
          placeholder="Enter your bio..."
        ></textarea>
        <button onClick={handleUpdateProfile}>Update Profile</button>
        {isSubmitting && <Loader />}
      </div>
    </>
  );
}
