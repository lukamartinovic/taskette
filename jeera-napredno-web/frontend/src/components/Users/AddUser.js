import React, {useState, useContext} from 'react';
import {Modal, Button, Form, Row, Col} from "react-bootstrap";
import api from '../../api/api';
import AuthContext from '../../context/AuthContext';

function AddUser(props){

    const defaultUserInput = {firstName: "", lastName: "", email: "", password: "", level: 1, role:"EMPLOYEE"};
    const [userInput, setUserInput] = useState(defaultUserInput);
    const [validated, setValidate] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const authContext = useContext(AuthContext);

    function handleChange(e){
        setUserInput({...userInput, [e.target.id]:e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        e.persist()

        function callback(res){
            setValidationErrors({});
            setValidate(false);
            setUserInput(defaultUserInput)
            console.log(res)
        }

        function errCallback(err){
            let errors = {};
            console.log(err)
            if((err.errors !== undefined)&& err.errors.password.name  === "ValidatorError")
                errors.password = "Password does not meet requirements";
            if(err.code === 11000)
                errors.email = "User with this email already exists";
            setValidationErrors(errors);
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
                    <input value={userInput.level} className="form-control" type="number" defaultValue="1" id="level"/>
                </Form.Group>
            :
            <></>
        )
    }

    return(
        <Modal onHide={()=>{props.history.push('/users/')}} show>
            <Modal.Header closeButton>
                <Modal.Title>Create user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} noValidate validated={validated}>
                    <Form.Row>
                        <Form.Group  as={Col} controlId="firstName" onChange={handleChange}>
                            <Form.Label>First name</Form.Label>
                            <Form.Control value={userInput.firstName} required type="text" placeholder="First name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="lastName" onChange={handleChange}>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control value={userInput.lastName} required type="text" placeholder="Last name" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="email" onChange={handleChange}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={userInput.email} isInvalid={!!validationErrors.email} required type="email" placeholder="Enter email"/>
                        <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="password" onChange={handleChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={userInput.password} isInvalid={!!validationErrors.password} required placeholder="Password"/>
                        <Form.Control.Feedback type="invalid">{validationErrors.password}</Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            Must contain at least 8 letters and 1 number
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="role" onChange={handleChange}>
                        <Form.Label>Role</Form.Label>
                        <Form.Control required value={userInput.role}  defaultValue="EMPLOYEE" as="select" >
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