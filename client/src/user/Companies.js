import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import "./Companies.css";
import axios from "axios";

const Companies = () => {
  const navigate = useNavigate();
  const [tempArray, setTempArray] = useState([]);
  const [isAvail, setAvail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/send");
        setTempArray(response.data);
        setAvail(response.data.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (company) => {
    navigate("/user/company-details", { state: { company } });
  };

  const handleButtonClick = (event, companyId) => {
    event.stopPropagation();
    console.log(companyId);
    navigate("/user/user-form", { state: { companyId } });
  };

  const renderCompanies = () => {
    if (isAvail === null) {
      return <div>Loading...</div>;
    } else if (isAvail === false) {
      return <div>No companies available.</div>;
    } else {
      return tempArray.map((company, index) => (
        <div
          key={index}
          className="card hehe"
          onClick={() => handleCardClick(company)}
        >
          <img
            className="card-img-top"
            src={company.image}
            alt="No image provided"
          />
          <div className="card-body hehe">
            <h5 className="card-title hehe" style={{ color: "white" }}>
              {company.name}
            </h5>
            <p className="card-text hehe">{company.aboutCompany}</p>
          </div>
          <ul
            className="list-group list-group-flush "
            style={{ borderColor: "black" }}
          >
            <li
              className="list-group-item hehe"
              style={{ color: "white", borderColor: "black" }}
            >
              Skills: {company.skills}
            </li>
            <li
              className="list-group-item hehe"
              style={{ color: "white", borderColor: "black" }}
            >
              Salary: {company.salary}
            </li>
            <li
              className="list-group-item hehe"
              style={{ color: "white", borderColor: "black" }}
            >
              Position: {company.position}
            </li>
          </ul>
          <button
            className="reg-btn"
            onClick={(event) => handleButtonClick(event, company.id)}
          >
            Register
          </button>
        </div>
      ));
    }
  };

  return <div className="card-container">{renderCompanies()}</div>;
};

export default Companies;
