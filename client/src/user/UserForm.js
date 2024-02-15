// UserForm.js
import React, { useState, useEffect } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import {
  CForm,
  CCol,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CButton,
} from "@coreui/react";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UserForm = () => {
  const location = useLocation();
  const company = location.state.companyId;
  const [select, setSelect] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate an API call or data submission
    // Replace this with your actual logic to save the data
    //setFormData(data); // Update formData with the new form data
    

    setTimeout(() => {
      toast.success("Data successfully added", {
        autoClose: 3000, // Close the toast message after 3 seconds
      });
      // Reset the form fields manually using setValue
      Object.keys(data).forEach((field) => {
        setValue(field, "");
      });
    }, 1000);

    axios
      .post(`http://localhost:8000/api/register/${company}`, data) // Use `formData` here
      .then(() => {
        // Handle the registration success or error
        console.log("User registered successfully!");
      });
  };

  const handleSelect = () => {
    setSelect(true);
  };

  return (
    <div style={{marginLeft:"0.6%"}} className="reg-form">
      <ToastContainer />
      <CForm className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        <CCol md={6}>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <CFormInput
                {...field}
                type="text"
                id="inputName"
                label="Name"
                invalid={!!errors.name}
              />
            )}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </CCol>
        <CCol md={6}>
          <Controller
            control={control}
            name="gender"
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <CFormSelect
                {...field}
                id="inputGender"
                label="Gender"
                invalid={!!errors.gender}
              >
                <option value="">Choose...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </CFormSelect>
            )}
          />
          {errors.gender && (
            <div className="invalid-feedback">{errors.gender.message}</div>
          )}
        </CCol>
        <CCol xs={12}>
          <Controller
            control={control}
            name="percentage10th"
            rules={{ required: "10th percentage is required" }}
            render={({ field }) => (
              <CFormInput
                {...field}
                id="input10thPercentage"
                label="10th %"
                invalid={!!errors.percentage10th}
              />
            )}
          />
          {errors.percentage10th && (
            <div className="invalid-feedback">
              {errors.percentage10th.message}
            </div>
          )}
        </CCol>
        <CCol xs={12}>
          <Controller
            control={control}
            name="percentage12th"
            rules={{ required: "12th percentage is required" }}
            render={({ field }) => (
              <CFormInput
                {...field}
                id="input12thPercentage"
                label="12th %"
                invalid={!!errors.percentage12th}
              />
            )}
          />
          {errors.percentage12th && (
            <div className="invalid-feedback">
              {errors.percentage12th.message}
            </div>
          )}
        </CCol>
        <CCol md={6}>
          <Controller
            control={control}
            name="cgpa"
            rules={{ required: "CGPA is required" }}
            render={({ field }) => (
              <CFormInput
                {...field}
                id="inputCGPA"
                label="CGPA"
                invalid={!!errors.cgpa}
              />
            )}
          />
          {errors.cgpa && (
            <div className="invalid-feedback">{errors.cgpa.message}</div>
          )}
        </CCol>
        <CCol md={6}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <CFormInput
                {...field}
                type="email"
                id="inputEmail"
                label="Email ID"
                invalid={!!errors.email}
              />
            )}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </CCol>
        <CCol xs={12}>
          <Controller
            control={control}
            name="phoneNumber"
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <CFormInput
                {...field}
                type="tel"
                id="inputPhoneNumber"
                label="Phone Number"
                invalid={!!errors.phoneNumber}
              />
            )}
          />
          {errors.phoneNumber && (
            <div className="invalid-feedback">{errors.phoneNumber.message}</div>
          )}
        </CCol>
        <CCol xs={12}>
          <Controller
            control={control}
            name="skills"
            rules={{ required: "Known skills are required" }}
            render={({ field }) => (
              <CFormInput
                {...field}
                id="inputSkills"
                label="Known Skills"
                invalid={!!errors.knownSkills}
              />
            )}
          />
          {errors.knownSkills && (
            <div className="invalid-feedback">{errors.knownSkills.message}</div>
          )}
        </CCol>

        <input type="file"/>
        
        {select && (
          <CCol xs={12}>
            <CButton type="submit">Register</CButton>
          </CCol>
        )}
      </CForm>
    </div>
  );
};

export default UserForm;
