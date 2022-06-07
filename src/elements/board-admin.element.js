import React, { Component, useEffect, useState } from "react";
import { Col, Container, Row, Table, Dropdown, Form } from "react-bootstrap";
import userService from "../services/user.service";
import UserService from "../services/user.service";
export default function BoardAdmin(props) {
  const [content, setContent] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleSelect = (e) => {
    if (!selected.includes(e.target.value))
      setSelected((selected) => [...selected, e.target.value]);
    else {
      let index = selected.indexOf(e.target.value);
      setSelected([
        ...selected.slice(0, index),
        ...selected.slice(index + 1, selected.length),
      ]);
    }
  };

  const handleDelete = () => {
    userService
      .deleteUsers(selected)
      .then((response) => setContent(response.data));
  };

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
      <Row className="mb-2">
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Action
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Select</th>
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
                  <td>
                    <Form>
                      <div key={"default-checkbox"}>
                        <Form.Check
                          type="checkbox"
                          id={user.id}
                          value={user.id}
                          onChange={handleSelect}
                        ></Form.Check>
                      </div>
                    </Form>
                  </td>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
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
