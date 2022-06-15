import React, { Component, useEffect, useState } from "react";
import authService from "../services/auth.service";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Button, Modal, Form } from "react-bootstrap";
import GroupsService from "../services/groups.service";
import ModalWriteMessage from "./modal-write-message.element";

export default function Groups(props) {
  const user = props.user;
  const [groups, setGroups] = useState([]);
  const [content, setContent] = useState([]);
  const [to, setTo] = useState(user);

  const [showMessageModal, setShowMessageModal] = useState(false);


  const handleCloseMessageModal = () => setShowMessageModal(false);
  const handleShowMessageModal = (e) => {
    setTo(e);
    setShowMessageModal(true);
  };


  useEffect(() => {

    GroupsService.getGroupsOfUser(user.id).then(
      (response) => {
        setGroups(response.data);
        
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

  const changeMessage = (message, accepted) => {
    if (accepted) {
      toast.success(message);
    }
    else {
      toast.error(message)
    }

  }

  return (
      <Container>
        {groups.map((group)=>(
          <div key={group.id}>
          <h1>{group.name}</h1>
          <Button onClick={() => handleShowMessageModal(group)}>Send Group Message</Button>
          <table>
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Username</th>
                <th>Email</th>
                <th> </th>
              </tr>
              </thead>
              <tbody>
          {group.users.map((_user) => (
            <tr key={_user.id}>
              <td>{_user.firstName}</td>
              <td>{_user.lastName}</td>
              <td>{_user.userName}</td>
              <td>{_user.email}</td>
              <td><Button onClick={() => handleShowMessageModal(_user)}>Send Message</Button></td>
            </tr>
          ))}
          </tbody>
          </table>
          </div>
        ))}
      
      <ToastContainer />

      <ModalWriteMessage to={to} user={user} show={showMessageModal} handleClose={handleCloseMessageModal} changeMessage={changeMessage} />
       
    </Container>
  
    );
}
