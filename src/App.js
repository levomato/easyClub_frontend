import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import authService from "./services/auth.service";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardUser from "./elements/board-user.element";
import BoardAdmin from "./elements/board-admin.element";
import BoardModerator from "./elements/board-moderator.element";
import { Link } from "react-router-dom";
import Login from "./elements/login.element";
import Register from "./elements/register.element";
import Profile from "./elements/profile.element";
import Groups from "./elements/groups.element";
import ManageGroups from "./elements/manage-groups.element";
import Home from "./elements/home.element";
import { NavBar } from "./elements/navbar.element";
import Logout from "./elements/logout.element";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPassword from "./elements/forgot-password";
import RequestForgotPassword from "./elements/request-forgot-password";

function App() {
  const user = authService.getCurrentUser();

  return (
    <div>
      <NavBar user={user} />
      <div className="container mt-3 d-flex justify-content-center">
        <Routes>
          <Route path={"/home"} element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/groups" element={<Groups user={user} />} />
          <Route path="/manageGroups" element={<ManageGroups user={user}/>}/>
          <Route path="/user" element={<BoardUser user={user} />} />
          <Route path="/mod" element={<BoardModerator user={user} />} />
          {user && <Route path="/admin" element={<BoardAdmin user={user} />} />}
          <Route path="/logout" element={<Logout user={user} />} />
          <Route
            path="/forgot-password"
            element={<ForgotPassword user={user} />}
          />
          <Route
            path="/request-forgot-password"
            element={<RequestForgotPassword />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
