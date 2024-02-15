import React from "react";
import "./Home.css";
import Myimg from "../assests/mylogo.ico";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate("/login");
  };

  return (
    <div className="page-main">
      <div>
        <nav class="navbar navbar-expand-lg navbar-light ">
          <div class="container-fluid">
            <img className="header-img" src={Myimg} />
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              class="collapse navbar-collapse d-flex justify-content-center"
              id="navbarNavAltMarkup"
            >
              <div class="navbar-nav">
                <button class="btn nav-link ">Explore</button>
                <button class="btn nav-link" href="#">
                  Why Choose This
                </button>
                <button class="btn nav-link" href="#">
                  Benefits{" "}
                </button>
              </div>
            </div>
          </div>
        </nav>
        <center>
          <div className="Header">Welcome To Placement portal of DRNGPIT</div>

          <div className="para">
            Are you ready to embark on a journey that leads to exciting career
            opportunities? Our Placement Portal is your gateway to a world of
            possibilities. We are committed to assisting you in your
            professional growth by offering a range of placement activities and
            resources that empower you to reach your career goals.
          </div>
        </center>
      </div>

      <center>
        <button className=" btn login-btn" onClick={handleclick}>
          Login
        </button>
      </center>
    </div>
  );
};
