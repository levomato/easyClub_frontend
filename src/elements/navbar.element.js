import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
export const NavBar = (props) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [showGroupsManager, setShowGroupsManager] = useState(false);

  const navigate = useNavigate();

  const logOut = (e) => {
    authService.logout();
    setShowLogin(true);
    setShowLogout(false);
    setShowProfile(false);
    setShowRegister(false);
    setShowAdmin(false);
    setShowGroups(false);
    setShowGroupsManager(false);
    navigate("/logout");
  };

  useEffect(() => {
    if (props.user) {
      setShowLogin(false);
      setShowProfile(true);
      setShowLogout(true);
      setShowGroups(true);
      const roles = props.user.roles;
      if (roles.includes("Admin")) {
        setShowRegister(true);
        setShowAdmin(true);
        setShowGroupsManager(true);
      }
    }
  }, [props.user]);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Home</Navbar.Brand>
          <Nav className="me-auto">
            {showProfile && <Nav.Link href="/profile">Profile</Nav.Link>}
            {showGroups && <Nav.Link href="/groups">Groups</Nav.Link>}
            {showLogin && <Nav.Link href="/login">Login</Nav.Link>}
            {showLogout && (
              <Nav.Link href="#" onClick={logOut}>
                Logout
              </Nav.Link>
            )}
            {showAdmin && <Nav.Link href="/admin">Admin Board</Nav.Link>}
            {showRegister && <Nav.Link href="/register">Register</Nav.Link>}
            {showGroupsManager && <Nav.Link href="/manageGroups">Manage Groups</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
