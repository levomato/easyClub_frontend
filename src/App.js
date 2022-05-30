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
import Home from "./elements/home.element";

function App() {
  const { showModeratorBoard, setShowModeratorBoard } = useState(false);
  const { showAdminBoard, setShowAdminBoard } = useState(false);
  const { currentUser, setCurrentUser } = useState(undefined);
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.include("ROLE_MODERATOR"));
      showAdminBoard(user.roles.include("ROLE_ADMIN"));
    }
  });

  const logOut = () => {
    authService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          bezKoder
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={this.logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path={"/home"} element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
