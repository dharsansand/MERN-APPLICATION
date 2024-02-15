import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import "./MyCompanies.css"
import { useEffect, useState } from "react";
import axios from "axios";
export const MyCompanies = () => {
  const navigate = useNavigate();
  const [tempArray, setTempArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/send");
        setTempArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(tempArray);

  const handleCardClick = (company) => {
    navigate("/admin/Students", { state: { company } });
  };

  return (
    <div className="card-container">
      {tempArray.map((company, index) => (
        <div
          key={index}
          className="card hehe"
          onClick={() => handleCardClick(company.id)}
        >
          <img
            className="card-img-top"
            src={company.image}
            alt="No image provided"
          />
          <div className="card-body hehe">
            <h5 className="card-title hehe" style={{color:"white" } }>{company.name}</h5>
            <p className="card-text hehe" style={{color:"white" } }>{company.about}</p>
          </div>
          <ul className="list-group list-group-flush hehe">
            <li className="list-group-item hehe" style={{color:"white" ,borderColor:"black"} }>Skills: {company.skills}</li>
            <li className="list-group-item hehe" style={{color:"white" ,borderColor:"black"} }>Salary: {company.salary}</li>
            <li className="list-group-item hehe" style={{color:"white" ,borderColor:"black"} }>Position: {company.position}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};
export default MyCompanies;
