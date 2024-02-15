import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./UserProfilePage.css";

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const username = useSelector((state) => state.name);

  useEffect(() => {
    // Fetch user profile data from the backend API
    axios
      .get(`http://localhost:8000/api/user/profile/${username}`) // Adjust the API endpoint as per your backend route
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile data:", error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>
      {userData ? (
        <div className="user-profile-data">
          <p>
            <span>Name:</span> {userData.name}
          </p>
          <p>
            <span>User ID:</span> {userData.userId}
          </p>
          <p>
            <span>Gender:</span> {userData.gender}
          </p>
          <p>
            <span>Percentage 10th:</span> {userData.percentage10th}
          </p>
          <p>
            <span>Percentage 12th:</span> {userData.percentage12th}
          </p>
          <p>
            <span>CGPA:</span> {userData.cgpa}
          </p>
          <p>
            <span>Email:</span> {userData.email}
          </p>
          <p>
            <span>Phone Number:</span> {userData.phoneNumber}
          </p>
          <p>
            <span>Skills:</span> {userData.skills}
          </p>
          <button>Update</button>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
};

export default UserProfilePage;
