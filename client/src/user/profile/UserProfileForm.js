import React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { CForm, CCol, CFormInput, CFormSelect, CButton } from "@coreui/react";

const UserProfileForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/profiling",
        data
      );
      console.log(response.data);
      toast.success("Data successfully added", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ marginLeft: "0.6%" }} className="reg-form">
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
            name="id"
            rules={{ required: "id is required" }}
            render={({ field }) => (
              <CFormInput
                {...field}
                type="text"
                id="id"
                label="UserID"
                invalid={!!errors.name}
              />
            )}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.id.message}</div>
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
                invalid={!!errors.skills}
              />
            )}
          />
          {errors.skills && (
            <div className="invalid-feedback">{errors.skills.message}</div>
          )}
        </CCol>
        <CButton type="submit">Submit</CButton>
      </CForm>
    </div>
  );
};

export default UserProfileForm;
