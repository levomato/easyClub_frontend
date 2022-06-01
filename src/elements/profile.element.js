import React, { Component, useEffect, useState } from "react";
import authService from "../services/auth.service";
import AuthService from "../services/auth.service";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Register from "./register.element";
export default function Profile(props) {
  const user = props.user;
  const { register, handleSubmit, setValue } = useForm();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleClosePasswordModal = () => setShowPasswordModal(false);
  const handleShowPasswordModal = () => setShowPasswordModal(true);

  const userDetails = {
    fistname: "Levin",
    lastname: "Kerschberger",
    birthdate: new Date("2000-05-26"),
  };

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

  const handleChangePassword = (data) => {};

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
                    {userDetails.fistname} {userDetails.lastname}
                  </strong>
                </h3>
                <p>
                  <strong>Username:</strong> {user.username}
                </p>

                <p>
                  <strong>Email:</strong> {user.email}
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
                <Button variant="secondary" size="sm">
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
      <Modal show={showPasswordModal} onHide={handleClosePasswordModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleChangePassword)}>
            <Form.Group
              className="mb-3"
              controllId="passwordForm.ControlInput1"
              {...register("oldPassword")}
            >
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="password" autoFocus />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controllId="passwordForm.ControlInput2"
              {...register("newPassword")}
            >
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" autoFocus />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controllId="passwordForm.ControlInput2"
              {...register("passwordRepeat")}
            >
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control type="password" autoFocus />
            </Form.Group>
            <Button variant="secondary" size="sm" type="submit">
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
