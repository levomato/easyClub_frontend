import React, { Component, useEffect, useState } from "react";
import authService from "../services/auth.service";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Button, Modal, Form } from "react-bootstrap";
import GroupsService from "../services/groups.service";
export default function Groups(props) {
  const user = props.user;
  const [groups, setGroups] = useState([]);
  const [content, setContent] = useState([]);
  console.dir(user);



  useEffect(() => {

    GroupsService.getGroupsOfUser(user.id).then(
      (response) => {
        setGroups(response.data);
        console.dir(response.data);
        
      },
      (error) => {
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );
      }
    );
    
  }, []);


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
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <h1>No user logged in</h1>
      )}
      <ToastContainer />
    </Container>
  );
}
