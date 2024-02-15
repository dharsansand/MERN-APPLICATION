/* Add this in your SideNav.js file */
import React from "react";
import { Link } from "react-router-dom";
import "./SideNav.css";
import { useSelector, useDispatch } from 'react-redux';
import "bootstrap/dist/css/bootstrap.css";
import eximg from "../assests/download (1).png";
import { useLocation } from "react-router-dom";
const SideNav = () => {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.name);

  return (
    <div className="sidenav">
      <div className="d-flex">
        <div className="sidebar-wrapper d-md-block border-right">
          <div className="sidebar-heading text-center py-4">
            <img src={eximg} alt="User Profile" className="rounded-circle " />
            <h4>{name}</h4>
            <small>Student</small>
          </div>
          <div className="list-group list-group-flush">
            <Link to="/user/dash" className="list-group-item custom-list-item">
              <i className="bi bi-house-door"></i> Dashboard
            </Link>
            <Link
              to="/user/profile"
              className="list-group-item custom-list-item"
            >
              <i className="bi bi-house-door"></i> Profile
            </Link>
            <Link
              to="/user/companies"
              className="list-group-item custom-list-item"
            >
              <i className="bi bi-house-door"></i> Companies
            </Link>
            <Link
              to="/user/editor"
              className="list-group-item custom-list-item"
            >
              <i className="bi bi-code"></i> Code Editor
            </Link>
            <a href="#" className="list-group-item custom-list-item">
              <i className="bi bi-file-earmark-text"></i> Registered
            </a>
            <div className="accordion" id="subMenu">
              <a
                href="#"
                className="list-group-item custom-list-item"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <i className="bi bi-gear"></i> Emails
              </a>
              <div
                id="collapseOne"
                className="collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#subMenu"
              ></div>
            </div>
            <Link to="/user/chat" className="list-group-item custom-list-item">
              <i className="bi bi-envelope"></i> Chat Room
            </Link>
            <a href="#" className="list-group-item custom-list-item">
              <i className="bi bi-person"></i> Practice
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
