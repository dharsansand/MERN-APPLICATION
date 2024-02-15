import React, { useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../user/redux/Actions";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name);

  const handleRegisterEvent = () => {
    navigate("/register");
  };

  const [data, setData] = useState({
    username: "", // Updated key from 'email' to 'username'
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/registeruser", data)
      .then((response) => {
        const { token, userId } = response.data;
        console.log(userId);
        //dispatch(setName(userId));
        // Store the token securely on the client side (e.g., in localStorage)
        localStorage.setItem("jwtToken", token);

        console.log("User registered successfully!");
        console.log("Received token:", token);
        console.log("User ID:", userId);
        dispatch(setName(userId));

        // Optionally, redirect the user to a new page after successful registration
        navigate("/user/dash");
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
      });
  };

  return (
    <div className="login-body">
      <div className="contents">
        <h3 className="wel">Welcome 👋</h3>
        <h5 className="en">Register now to get started 😊</h5>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="input-field"
            placeholder="Enter your username"
            value={data.username}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="Enter your password"
            value={data.password}
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
