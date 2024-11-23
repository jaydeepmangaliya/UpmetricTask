import React, { useState } from "react";
import './MyProfile.css';

const MyProfile = () => {
  const [profile, setProfile] = useState({
    name: "Jaydeep Mangaliya",
    email: "jaydeepmangaliya@gmail.com",
    phone: "9316563638",
    address: "Vadodara, Parul University",
    gender: "Male",
    birthday: "05-10-2003",
    profilePicture: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ ...profile });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedProfile({ ...updatedProfile, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleSave = () => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-picture">
        <img
          src={
            updatedProfile.profilePicture
              ? updatedProfile.profilePicture
              : "https://via.placeholder.com/150"
          }
          alt="Profile"
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
        )}
      </div>
      <div className="profile-details">
        <label>
          Name:
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={updatedProfile.name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profile.name}</span>
          )}
        </label>
        <label>
          Email:
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={updatedProfile.email}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profile.email}</span>
          )}
        </label>
        <label>
          Phone:
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={updatedProfile.phone}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profile.phone}</span>
          )}
        </label>
        <label>
          Address:
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={updatedProfile.address}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profile.address}</span>
          )}
        </label>
        <label>
          Gender:
          {isEditing ? (
            <select
              name="gender"
              value={updatedProfile.gender}
              onChange={handleInputChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <span>{profile.gender}</span>
          )}
        </label>
        <label>
          Birthday:
          {isEditing ? (
            <input
              type="date"
              name="birthday"
              value={updatedProfile.birthday}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profile.birthday}</span>
          )}
        </label>
      </div>
      <div className="profile-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
