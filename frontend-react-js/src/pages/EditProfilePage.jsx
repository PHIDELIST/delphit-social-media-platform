import React, { useState } from "react";
import placeholderImage from "../assets/placeholder.jpg";
import './EditProfilePage.css'
import {useDispatch} from "react-redux"
import {homeUI} from "../redux/uiSlice";
import AvatarUpload from "../components/AvatarUpload";

export default function ProfileForm() {
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const dispatch = useDispatch();
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

  const handleUpdateProfile = () => {
    
    console.log("Bio:", bio);
    console.log("Avatar:", avatar);
  };

  return (
    <>
    <button onClick={handleProfile}>&larr; Back</button>
    <div className="profile-form">
      
      <input
        type="file"
        name="avatarupload"
        onChange={handleAvatarChange}
      />
      <div className="avatar-preview">
        {previewAvatar ? (
          <img src={previewAvatar} alt="Preview" />
        ) : (
          <img src={placeholderImage} alt="Placeholder" />
        )}
      </div>
      <AvatarUpload />
      <textarea
        value={bio}
        onChange={handleBioChange}
        placeholder="Enter your bio..."
      ></textarea>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
    </>
  );
}
