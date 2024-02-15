import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./RegisteredStudents.css"; // Import the CSS file for styling

export const RegisteredStudents = () => {
  // ... Rest of the code remains the same
  const location = useLocation();
  const companyId = location.state.company;
  const ID = companyId;
  const [TempArray, setTempArray] = useState([]);

  console.log("ID:", ID);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/${ID}`
        );
        setTempArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ID]);

  if (TempArray.length === 0) {
    return <div className="errr">No students have registered for this company </div>;
  }
  return (
    <div className="table-container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">12th %</th>
            <th scope="col">10th %</th>
            <th scope="col">cgpa</th>
          </tr>
        </thead>
        <tbody>
          {TempArray.map((user, index) => {
            console.log(user); // Logging the entire 'user' object
            return (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.percentage10th}</td>
                <td>{user.percentage12th}</td>
                <td>{user.cgpa}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
