import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import { appendErrors, Controller, useForm } from 'react-hook-form';
import groupsService from '../services/groups.service';

export default function ModalCreateGroup(props) {

    const { register, handleSubmit, setValue, watch, control } = useForm();
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleClose = () => setShowCreateModal(false);
    const handleShow = () => setShowCreateModal(true);

    const handleCreateGroup = (data) => {

        if(data.name.length == 0 || data.description.length == 0)
            return;

        groupsService.createGroup(data)
            .then((response) => {
                props.changeMessage('Successfully Create Group!', true);
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
                    <Modal.Title>Create Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handleCreateGroup)}>
                        <Form.Group className="mb-3" controllid="editForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Controller control={control} name="name" defaultValue=""
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <Form.Control type="text" onChange={onChange} value={value}  autoFocus />
                                )} />
                            <Form.Label>Description</Form.Label>
                            <Controller control={control} name="description" defaultValue=""
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <Form.Control as="textarea" rows={2} onChange={onChange} value={value} />
                                )} />
                        </Form.Group>                        
                        <Button variant="secondary" size="sm" type="submit">
                            Create Group
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    )
}
