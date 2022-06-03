import React, { Component, useEffect, useState } from "react";
import authService from "../services/auth.service";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Register from "./register.element";
import ModalChangePassword from "./modal-change-password.element";
import ModalChangeUser from './modal-change-userdetails.element';
import userService from "../services/user.service";
export default function Profile(props) {
  const user = props.user;
  const { register, handleSubmit, setValue } = useForm();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);


  const handleClosePasswordModal = () => setShowPasswordModal(false);
  const handleShowPasswordModal = () => setShowPasswordModal(true);

  const handleCloseUserModal = () => setShowUserModal(false);
  const handleShowUserModal = () => setShowUserModal(true);



  useEffect(() => {
    if (!user.passwordChanged)
      toast.warn("Please change your default password!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
  }, []);

  const handleChangePassword = (data) => {
    authService.changePassword(props.user.id, data.oldPassword, data.newPassword, data.passwordRepeat);
  };

  const handleChangeUser = (data) => {
    userService.changeUser(props.user.id, data);
  };

  const changeMessage = (message, accepted) => {
    if (accepted) {
      toast.success(message);
    }
    else {
      toast.error(message)
    }

  }

  const changeMessageUser = (message, accepted) => {
    if (accepted) {
      toast.success(message);
    }
    else {
      toast.error(message)
    }

  }

  return (
    <Container>
      {user ? (
        <>
          <Row>
            <Col>
              <img
                src="/NicePng_watsapp-icon-png_9332131.png"
                className="img-fluid"
                alt="Profile"
              />
            </Col>
            <Col>
              {" "}
              <Row>
                <Col></Col>
              </Row>
              <div className="d-grid gap-2">
                <h3 className="mb-0">
                  <strong>
                    {user.firstname} {user.lastname}
                  </strong>
                </h3>
                <p>
                  <strong>Username:</strong> {user.username}
                </p>

                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Street:</strong> {user.street} {user.housenumber}
                </p>
                <p>
                  <strong>City:</strong> {user.postCode} {user.city}
                </p>
                <p>
                  <strong>Mobile:</strong> {user.mobilenumber}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phonenumber}
                </p>

                <strong>Authorities:</strong>
                <ul>
                  {user.roles &&
                    user.roles.map((role, index) => (
                      <li key={index}>{role}</li>
                    ))}
                </ul>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleShowPasswordModal}
                >
                  Change Password
                </Button>
                <Button variant="secondary" size="sm" onClick={handleShowUserModal}>
                  Change User Details
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <p>
                <strong>Token:</strong> {user.token.substring(0, 20)} ...{" "}
                {user.token.substr(user.token.length - 20)}
              </p>
            </Col>
          </Row>
        </>
      ) : (
        <h1>No user logged in</h1>
      )}
      <ToastContainer />

      <ModalChangePassword user={user} show={showPasswordModal} handleClose={handleClosePasswordModal} handleChangePassword={handleChangePassword} changeMessage={changeMessage} />
      <ModalChangeUser user={user} show={showUserModal} handleClose={handleCloseUserModal} handleChangePassword={handleChangeUser} changeMessage={changeMessageUser} />

    </Container>
  );
}
