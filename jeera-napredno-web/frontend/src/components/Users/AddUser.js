import React, {useState, useContext} from 'react';
import {Modal, Button, Form, Row, Col} from "react-bootstrap";
import api from '../../api/api';
import AuthContext from '../../context/AuthContext';

function AddUser(props){

    const [userInput, setUserInput] = useState({firstName: "", lastName: "", email: "", password: "", level: 1, role:"EMPLOYEE"});
    const [validated, setValidate] = useState(false);

    const authContext = useContext(AuthContext);

    function handleChange(e){
        setUserInput({...userInput, [e.target.id]:e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        e.persist()

        function callback(res){
            console.log(res)
        }

        function errCallback(err){
            console.log(err)
        }

        api.addUser(
            userInput.email,
            userInput.firstName,
            userInput.lastName,
            userInput.password,
            userInput.role,
            authContext.authentication.token,
            callback,
            errCallback)

        setValidate(true);

    }

    function renderAuthorizationLevel(){
        return(
            userInput.role === "MANAGER" ?
                <Form.Group required controlId="level" onChange={handleChange}>
                    <Form.Label>Level</Form.Label>
                    <input className="form-control" type="number" defaultValue="1" id="level"/>
                </Form.Group>
            :
            <></>
        )
    }

    return(
        <Modal onHide={()=>{props.history.push('/users/')}} show={true}>
            <Modal.Header closeButton>
                <Modal.Title>Create user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} noValidate validated={validated}>
                    <Form.Row>
                        <Form.Group  as={Col} controlId="firstName" onChange={handleChange}>
                            <Form.Label>First name</Form.Label>
                            <Form.Control required type="text" placeholder="First name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="lastName" onChange={handleChange}>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control required type="text" placeholder="Last name" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="email" onChange={handleChange}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email"/>
                    </Form.Group>
                    <Form.Group controlId="password" onChange={handleChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control required placeholder="Password"/>
                        <Form.Text className="text-muted">
                            Must contain at least 8 letters and 1 number
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="role" onChange={handleChange}>
                        <Form.Label>Role</Form.Label>
                        <Form.Control required  defaultValue="EMPLOYEE" as="select" >
                            <option value="EMPLOYEE">Employee</option>
                            <option value="MANAGER">Manager</option>
                            <option value="ADMIN">Administrator</option>
                        </Form.Control>
                    </Form.Group>
                    {renderAuthorizationLevel()}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>)
}


export default AddUser;