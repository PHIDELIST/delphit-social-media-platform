import React, { useState } from "react";
import placeholderImage from "../assets/placeholder.jpg";
import './EditProfilePage.css'

export default function ProfileForm() {
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);

  const handleBioChange = (event) => {
    setBio(event.target.value);
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
    // Replace with your own logic for updating the profile
    console.log("Bio:", bio);
    console.log("Avatar:", avatar);
  };

  return (
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
      <textarea
        value={bio}
        onChange={handleBioChange}
        placeholder="Enter your bio..."
      ></textarea>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
}
