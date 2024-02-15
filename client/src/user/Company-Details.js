import React from "react";
import { useLocation } from "react-router-dom";
import "./Company-Details.css";
const CompanyDetails = () => {
  const location = useLocation();
  const company = location.state.company;

  // Use the company data as a prop in this component

  return (
    <div className="company-details">
      {/* Render the details of the selected company */}
      <center>
        <img
          className="company-image"
          src={company.image}
          alt="No image provided"
        ></img>
      </center>
      <center>
        <h2 className="company-name">{company.name}</h2>
      </center>
      <p className="abt"> {company.about}</p>
      <p>
        <span className="sal">Salary: </span>
        {company.salary}
      </p>

      <p className="des"> About our company: {company.des}</p>
      {/* Other details */}
    </div>
  );
};

export default CompanyDetails;
