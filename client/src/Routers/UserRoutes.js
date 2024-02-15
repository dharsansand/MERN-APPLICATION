import React from "react";
import { Route, Routes } from "react-router-dom"; // Import Route directly

import Companies from "../user/Companies";
import CompanyDetails from "../user/Company-Details";

const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/companies" element={<Companies />} />
        <Route path="/user/company-details" element={<CompanyDetails />} />
      </Routes>
    </div>
  );
};

export default UserRoutes;
