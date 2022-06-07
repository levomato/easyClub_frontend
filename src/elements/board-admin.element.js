import React, { Component, useEffect, useState } from "react";
import { Col, Container, Row, Table, Dropdown, Form } from "react-bootstrap";
import userService from "../services/user.service";
import UserService from "../services/user.service";
export default function BoardAdmin(props) {
  const [content, setContent] = useState([]);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [sortType, setSortType] = useState("firstName");

  const testUsers = [
    {
      id: 1,
      username: "lekeit00",
      email: "levinkerschberger@gmail.com",
      password: "$2a$12$zHvRBTG8Ls3BJxcX.sWT/uB4/9vPDPVYmmk7xTuCG4NxFg4zG8vCW",
      phoneNumber: "0742651406",
      mobileNumber: "01576354821",
      street: "Cottastraße",
      housenumber: "6",
      city: "Stuttgart",
      postCode: "70176",
      customPassword: false,
      locked: true,
      groups: [],
      roles: [
        {
          id: 3,
          name: "Admin",
        },
        {
          id: 1,
          name: "User",
        },
      ],
      firstName: "Levin",
      lastName: "Kerschberger",
      birthDate: "2000-05-25T22:00:00.000+00:00",
    },
    {
      id: 2,
      username: "leukos00",
      email: "lösch@gmail.com",
      password: "$2a$12$zHvRBTG8Ls3BJxcX.sWT/uB4/9vPDPVYmmk7xTuCG4NxFg4zG8vCW",
      phoneNumber: "0742651406",
      mobileNumber: "01576354821",
      street: "Cottastraße",
      housenumber: "6",
      city: "Stuttgart",
      postCode: "70176",
      customPassword: false,
      locked: true,
      groups: [],
      roles: [
        {
          id: 3,
          name: "Admin",
        },
        {
          id: 1,
          name: "User",
        },
      ],
      firstName: "Lukas",
      lastName: "Lösch",
      birthDate: "2000-05-25T22:00:00.000+00:00",
    },
    {
      id: 3,
      username: "AnSor00",
      email: "gdgsdgsd@gdsfsd.de",
      password: "$2a$10$HJ/02I/jZnRz/uuEM7RRReihrCymQuP7pwph6s4r98z2BEMe0p0F2",
      phoneNumber: "1561564151",
      mobileNumber: "156161616",
      street: "fsdfdsf",
      housenumber: null,
      city: "fgsdgsdg",
      postCode: null,
      customPassword: false,
      locked: false,
      groups: [],
      roles: [
        {
          id: 1,
          name: "User",
        },
      ],
      firstName: "Annabell",
      lastName: "Sortiererin",
      birthDate: "2022-06-16T00:00:00.000+00:00",
    },
  ];

  const movies = [
    {
      id: 1,
      name: "Matrix",
      country: 9,
      collection: 300, //in CRs
      releasedOn: 1999,
    },
    {
      id: 2,
      name: "Tere Nam",
      country: 3,
      collection: 101,
      releasedOn: 2004,
    },
    {
      id: 3,
      name: "Bahubali",
      country: 4,
      collection: 500,
      releasedOn: 1987,
    },
  ];

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
    const sortUsers = (type) => {
      const types = {
        id: "id",
        firstName: "firstName",
        lastName: "lastName",
        username: "username",
        country: "country",
        collection: "collection",
        releasedOn: "releasedOn",
      };
      const sortProperty = types[type];

      const sorted = [...testUsers].sort((a, b) =>
        a[sortProperty].localeCompare(b[sortProperty])
      );

      setContent(sorted);
      console.log(sorted);
    };

    sortUsers(sortType);
  }, [sortType]);

  // useEffect(() => {
  //   UserService.getAllUsers().then(
  //     (response) => {
  //       setUsers(response.data);
  //       setSortType("username");
  //     },
  //     (error) => {
  //       setContent(
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //           error.message ||
  //           error.toString()
  //       );
  //     }
  //   );
  // }, []);

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
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sort
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSortType("firstName")}>
                Firstname
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setSortType("lastName")}
                href="#/action-2"
              >
                Lastname
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setSortType("username")}
                href="#/action-3"
              >
                Username
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <span>Current Sort-Property: {sortType}</span>
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
                <tr key={user.id}>
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
