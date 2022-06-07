import React, { Component, useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import UserService from "../services/user.service";
export default function BoardAdmin(props) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    UserService.getAllUsers().then(
      (response) => {
        setContent(response.data);
        console.log(response.data);
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

  return (
    <Container>
      {" "}
      <Row>
        <Col>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Birthdate</th>
                <th>Street</th>
                <th>Postcode</th>
                <th>City</th>
                <th>Phone Number</th>
                <th>Mobile Number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {content.map((user) => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>
                    {new Date(user.birthDate).toLocaleDateString("en-US")}
                  </td>
                  <td>
                    {user.street} {user.housenumber}
                  </td>
                  <td>{user.postCode}</td>
                  <td>{user.city}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.mobileNumber}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
