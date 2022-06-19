import React, { Component, useEffect, useState } from "react";
import authService from "../services/auth.service";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Button, Modal, Form } from "react-bootstrap";
import GroupsService from "../services/groups.service";
import ModalCreateGroup from "./modal-create-group.element";
import ModalEditGroup from "./modal-edit-group.element";

export default function ManageGroups(props) {
  const user = props.user;
  const [groups, setGroups] = useState([]);
  const [content, setContent] = useState([]);
  const [to, setTo] = useState(user);
  const [group, setGroup] = useState(user);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCloseEditModal = (e) =>{ 
    setShowEditModal(false);
    setGroups(e);
  };
  const handleShowEditModal = (e) => {
    setGroup(e);
    setShowEditModal(true);
  };

  const handleCloseCreateModal = (e) => {
    setShowCreateModal(false);
    setGroups(e);
  }
  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  }

  useEffect(() => {

    GroupsService.getAllGroups().then(
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

  const deleteGroup = (e) => {
    GroupsService.deleteGroup(e.id)
    .then((response) => {
      changeMessage('Successfully Delete Group!', true);
      setGroups(response.data);
      
  })
  .catch((response) => {
      changeMessage(response.response.data, false);
  });
  }

  const removeUser = (eUser, eGroup) => {
    GroupsService.removeUser(eUser.id, eGroup.id)
    .then((response) => {
      changeMessage('Successfully Remove User!', true);
      setGroups(response.data);
      
  })
  .catch((response) => {
      changeMessage(response.response.data, false);
  });
  }

  return (
      <Container>
        <Button onClick={handleShowCreateModal}>Create Group</Button>
        {groups.map((group)=>(
          <div key={group.id}>
          <h1>{group.name}</h1>
          <h2>{group.description}</h2>
          <Button onClick={() => deleteGroup(group)}>Delete Group</Button>
          <Button onClick={() => handleShowEditModal(group)}>Edit Group</Button>
          <Button>Add User</Button>
          {(group.users.length != 0) ?
          (<table>
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
              <td>{_user.username}</td>
              <td>{_user.email}</td>
              <td><Button onClick={() => removeUser(_user, group)}>Remove</Button></td>
            </tr>
          ))}
          </tbody>
          </table>)
          : ("")}
          </div>
        ))}
      
      <ToastContainer />
      <ModalEditGroup group={group} show={showEditModal} handleClose={handleCloseEditModal} changeMessage={changeMessage} />
      <ModalCreateGroup show={showCreateModal} handleClose={handleCloseCreateModal} changeMessage={changeMessage} />
       
    </Container>
  
    );
}
