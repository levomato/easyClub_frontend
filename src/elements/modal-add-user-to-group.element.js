import React, { useEffect, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import { appendErrors, Controller, useForm } from 'react-hook-form';
import groupsService from '../services/groups.service';

export default function ModalAddUserToGroup(props) {

    const { register, handleSubmit, setValue, watch, control } = useForm();
    const [showAddUserToGroupModal, setShowAddUserToGroupModal] = useState(false);
    const [users, setUsers] = useState([]);

    const handleClose = () => setShowAddUserToGroupModal(false);
    const handleShow = () => setShowAddUserToGroupModal(true);

    const handleAddUserToGroup = (data) => {

        groupsService.addUser(data.id, props.group.id)
            .then((response) => {
                props.changeMessage('Successfully Add User To Group!', true);
                props.handleClose(response.data);
            })
            .catch((response) => {
                props.changeMessage(response.response.data, false);
            });
    };

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User To Group: {props.group.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                        {props.users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td><Button onClick={() => handleAddUserToGroup(user)}>Add</Button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>

        </>
    )
}
