import React from "react";
import { CForm, CCol, CFormInput, CButton, CFormTextarea } from "@coreui/react";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Register.css"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const RegsiterCom = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Simulate an API call or data submission
      // Replace this with your actual logic to save the data
      console.log(data);

      // Use await to make sure the API call is completed before showing the toast

      const response = await axios.post(
        "http://localhost:8000/api/submit",
        data
      );
      console.log(response.data);
      toast.success("Data successfully added", {
        autoClose: 3000, // Close the toast message after 3 seconds
        onClose: () => {
          // Replace 'desired-component-path' with the actual path of the component you want to navigate to
          navigate("/admin");
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="reg-form">
      <ToastContainer />
      <CForm className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        <CCol md={6}>
          <Controller
            control={control}
            name="companyName"
            rules={{ required: "Company Name is required" }}
            render={({ field }) => (
              <CFormInput
                {...field}
                type="text"
                label="Company Name"
                invalid={!!errors.companyName}
              />
            )}
          />
          {errors.companyName && (
            <div className="invalid-feedback">{errors.companyName.message}</div>
          )}
        </CCol>
        <CCol md={6}>
          <Controller
            control={control}
            name="companyId"
            rules={{ required: "Company ID is required" }}
            render={({ field }) => (
              <CFormInput
                {...field}
                type="text"
                label="Company ID"
                invalid={!!errors.companyId}
              />
            )}
          />
          {errors.companyId && (
            <div className="invalid-feedback">{errors.companyId.message}</div>
          )}
        </CCol>
        <CCol md={6}>   
          <Controller
            control={control}
            name="companyImageUrl"
            rules={{ required: "Company Image URL is required" }}
            render={({ field }) => (
              <CFormInput
                {...field}
                type="text"
                label="Company Image URL"
                invalid={!!errors.companyImageUrl}
              />
            )}
          />
          {errors.companyImageUrl && (
            <div className="invalid-feedback">
              {errors.companyImageUrl.message}
            </div>
          )}
        </CCol>
        <CCol md={6}>
          <Controller
            control={control}
            name="companySalary"
            rules={{ required: "Company Salary is required" }}
            render={({ field }) => (
              <CFormInput
                {...field}
                type="text"
                label="Company Salary"
                invalid={!!errors.companySalary}
              />
            )}
          />
          {errors.companySalary && (
            <div className="invalid-feedback">
              {errors.companySalary.message}
            </div>
          )}
        </CCol>
        <CCol md={6}>
          <Controller
            control={control}
            name="skillsExpected"
            rules={{ required: "Skills Expected are required" }}
            render={({ field }) => (
              <CFormInput
                {...field}
                type="text"
                label="Skills Expected"
                invalid={!!errors.skillsExpected}
              />
            )}
          />
          {errors.skillsExpected && (
            <div className="invalid-feedback">
              {errors.skillsExpected.message}
            </div>
          )}
        </CCol>
        <CCol md={6}>
          <Controller
            control={control}
            name="position"
            rules={{ required: "Position is required" }}
            render={({ field }) => (
              <CFormInput
                {...field}
                type="text"
                label="Position"
                invalid={!!errors.position}
              />
            )}
          />
          {errors.position && (
            <div className="invalid-feedback">{errors.position.message}</div>
          )}
        </CCol>
        <CCol xs={12}>
          <Controller
            control={control}
            name="aboutCompany"
            rules={{ required: "About the Company is required" }}
            render={({ field }) => (
              <CFormInput
                {...field}
                type="text"
                label="About the Company"
                invalid={!!errors.aboutCompany}
              />
            )}
          />
          {errors.aboutCompany && (
            <div className="invalid-feedback">
              {errors.aboutCompany.message}
            </div>
          )}
        </CCol>
        <CCol xs={12}>
          <Controller
            control={control}
            name="description"
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <CFormTextarea
                {...field}
                label="Description"
                invalid={!!errors.description}
              />
            )}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </CCol>
        <CCol xs={12}>
          <CButton type="submit">Submit</CButton>
        </CCol>
      </CForm>
    </div>
  );
};

export default RegsiterCom;
