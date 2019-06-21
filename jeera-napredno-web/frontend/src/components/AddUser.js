import React from 'react';
import {Modal, Button, Form, Row, Col} from "react-bootstrap";


function AddUser(props){
    return(
        <Modal onHide={props.handleClose} show={props.show}>
        <Modal.Header closeButton >
            <Modal.Title>Add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="email">
                    <Form.Label>User email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder="Password" />
                </Form.Group>

                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Control defaultValue="EMPLOYEE" as="select" onChange={(e)=>{console.log(e.target.value)}}>
                            <option value="EMPLOYEE">Employee</option>
                            <option value="MANAGER">Manager</option>
                            <option value="ADMINISTRATOR">Administrator</option>
                        </Form.Control>
                    </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Modal.Body>
    </Modal>)
}


export default AddUser;