import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../user/redux/Actions";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import axios from "./axiosConfig";
import { useEffect } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(false);

  const dispatch = useDispatch();
  const name = useSelector((state) => state.name);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user");
    }
  }, [isAuthenticated, navigate]);

  const [data, setData] = useState({
    username: "",
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

    // Access the username and password from the 'data' state
    const { username, password } = data;

    // Use the values for further processing (e.g., send to the server)
    console.log("Username:", username);
    console.log("Password:", password);
    // Example: Send the login data to the server using axios
    // After receiving the token in your login response
    axios
      .post("http://localhost:8000/api/loginuser", { username, password })
      .then((response) => {
        const { token, userId } = response.data;

        // Store the token and username in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("pass", password);
        dispatch(setName(username));
        console.log(name);
        // Optionally, you may store the userId as well
        localStorage.setItem("userId", userId);
        // After successful login
        setAuthenticated(true);

        // Perform any other actions after successful login
        navigate("/user/", { state: { username } });
      })
      .catch((error) => {
        window.alert("Wrong credentials");
      });
  };

  return (
    <div className="login-body">
      <div className="contents">
        <h3 className="wel">Welcome 👋</h3>
        <h5 className="en">Enter your details to get started</h5>
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
          <Link to="/register" className="reg">
            Create an account now!
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
