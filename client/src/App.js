import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Home } from "./pages/Home";
import "./components/SideNav.css";
import Companies from "./user/Companies";
import CompanyDetails from "./user/Company-Details";
import UserRoutes from "./Routers/UserRoutes";
import UserForm from "./user/UserForm";
import RegsiterCom from "./admin/RegisterCom";
import { AdminHome } from "./admin/AdminHome";
import "./App.css";
import { MyCompanies } from "./admin/MyCompanies";
import { RegisteredStudents } from "./admin/RegisteredStudents";
import CodeEditor from "./user/CodeEditor";
import Chat from "./user/chatroom/Chat";
import { Dash } from "./user/dashboard/Dash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserProvider } from "./Usercontext";
import SideNav from "./components/SideNav";
import ChatEngine from "./user/chatroom/ChatEngine2";
import { AdminDash } from "./admin/AdminDash";
import { BsAmd } from "react-icons/bs";
import { Provider } from "react-redux";
import AdminCalendar from "./admin/AdminCalendar";
import Profile from "./user/profile/Profile";
import Store from "./user/redux/Store";
axios.defaults.baseURL = "https://localhost:8000";
axios.defaults.withCredentials = true;
export const App = () => {
  return (
    <div className="app">
      <Provider store={Store}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="admin/dash" element={<AdminDash />} />
            <Route path="admin/calendar" element={<AdminCalendar />} />
            <Route path="admin/Added-companies" element={<MyCompanies />} />
            <Route path="/admin/reg-company" element={<RegsiterCom />} />
            <Route path="/admin/Students" element={<RegisteredStudents />} />
          </Routes>
          <div className="d-none d-md-block">
            <Routes>
              <Route path="/user/*" element={<SideNav />} />
            </Routes>
          </div>

          <div>
            <Routes>
              <Route path="/admin/*" element={<AdminHome />} />
            </Routes>
          </div>
          <div className="main-content">
            <Routes>
              {/* Use UserRoutes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="user/profile/" element={<Profile />} />
              <Route path="/user/*" element={<UserRoutes />} />
              <Route path="/user/dash" element={<Dash />} />
              <Route
                path="/user/company-details"
                element={<CompanyDetails />}
              />
              <Route path="/user/companies" element={<Companies />} />
              <Route path="/user/user-form" element={<UserForm />} />
              <Route path="/user/editor" element={<CodeEditor />} />
              <Route path="/user/chat" element={<Chat />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    </div>
  );
};
