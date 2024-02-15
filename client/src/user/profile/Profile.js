import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfileForm from "./UserProfileForm"; // Assuming you have a component for the profile form
import UserProfilePage from "./UserProfilePage"; // Assuming you have a component for the profile page
import { useSelector } from "react-redux";
import "./Profile.css";
const Profile = () => {
  const [isProfiled, setIsProfiled] = useState(false);
  const username = useSelector((state) => state.name);

  useEffect(() => {
    // Check if the user is already profiled
    axios
      .get(`http://localhost:8000/api/user/isProfiled/${username}`)
      .then((response) => {
        setIsProfiled(response.data.isProfiled);
      })
      .catch((error) => {
        console.error("Error checking if user is profiled:", error);
      });
  }); // Empty dependency array ensures useEffect runs only once on component mount

  console.log(isProfiled);
  return (
    <div className="hi">
      {isProfiled ? <UserProfilePage /> : <UserProfileForm />}
    </div>
  );
};

export default Profile;
