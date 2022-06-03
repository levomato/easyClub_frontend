import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import { appendErrors, Controller, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import authService from '../services/auth.service';

export default function ModalChangePassword(props) {

    const { register, handleSubmit, setValue, watch, control } = useForm();
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const handleClose = () => setShowPasswordModal(false);
    const handleShow = () => setShowPasswordModal(true);

    let currentUser = authService.getCurrentUser();

    console.log(currentUser.passwordChanged);

    const handleChangePassword = (data) => {
        console.log(data);
        authService.changePassword(props.user.id, data.oldPassword, data.newPassword, data.passwordRepeat)
            .then((response) => {


                props.changeMessage(response.data.message, true);
                currentUser.passwordChanged = true;
                console.log(currentUser)
                localStorage.setItem('user', JSON.stringify(currentUser));
                props.handleClose();
            })
            .catch((response) => {

                props.changeMessage(response.response.data, false);
            });
    };
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handleChangePassword)}>
                        <Form.Group className="mb-3" controllId="passwordForm.ControlInput1">
                            <Form.Label>Old Password</Form.Label>
                            <Controller control={control} name="oldPassword" defaultValue=""
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <Form.Control type="password" onChange={onChange} value={value} ref={ref} isInvalid={appendErrors.oldPassword} autoFocus />
                                )} />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controllId="passwordForm.ControlInput2"
                            {...register("newPassword")}
                        >
                            <Form.Label>New Password</Form.Label>
                            <Controller control={control} name="newPassword" defaultValue=""
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <Form.Control type="password" onChange={onChange} value={value} ref={ref} isInvalid={appendErrors.newPassword} autoFocus />
                                )} />

                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controllId="passwordForm.ControlInput2"
                            {...register("passwordRepeat")}
                        >
                            <Form.Label>Repeat Password</Form.Label>
                            <Controller control={control} name="passwordRepeat" defaultValue=""
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <Form.Control type="password" onChange={onChange} value={value} ref={ref} isInvalid={appendErrors.passwordRepeat} autoFocus />
                                )} />
                        </Form.Group>
                        <Button variant="secondary" size="sm" type="submit">
                            Change Password
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </>
    )
}
