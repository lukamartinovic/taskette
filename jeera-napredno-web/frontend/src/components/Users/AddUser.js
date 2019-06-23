import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Form, InputGroup, Modal} from "react-bootstrap";
import api from '../../api/api';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {withFormik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Must be a valid email").required("Email is required"),
    firstName: Yup.string().max(15, "Cannot be longer than 15 characters").required("First name is required"),
    lastName: Yup.string().max(20, "Cannot be longer than 20 characters").required("Last name is required"),
    password: Yup.string().matches(api.passwordStrength, {message: "Password must contain at least 8 characters and one number", excludeEmptyString:true}).required("Password is required"),
    role: Yup.string().required(),
    level: Yup.number().required("Level is required")
});

function handleSubmit(values, {resetForm, setErrors, setSubmitting, props, setStatus}){
    const token = props.authContext.authentication.token;
    function callback(res){
        console.log(res);
        resetForm();
        setStatus({success:true});
        setSubmitting(false);
    }
    function errorCallback(err){
        if(err.code === 11000)
            setErrors({email: "That email is already taken"});
        setSubmitting(false);
    }
    api.addUser(values.email, values.firstName, values.lastName, values.password, values.role, token, callback, errorCallback)
}


const FormikForm = withFormik({
    mapPropsToValues(){
        return{
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            role: "EMPLOYEE",
            level: 1
        }
    },
    mapPropsToStatus(){
        return{
            success: false
        }
    },
    handleSubmit,
    validationSchema
})(AddUser);


function AddUser({values, errors, handleChange, handleSubmit, validationSchema, touched, isSubmitting, status, setStatus, ...props}){
    useEffect(() => {setStatus({success:false})}, [values, touched, setStatus]);
    const [hidePassword, setHidePassword] = useState(false);
    const {lastName, role, password, email, firstName, level} = values;

    return(
        <Modal onHide={()=>{props.history.push('/users/')}} show>
            <Modal.Header closeButton>
                <Modal.Title>Create user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control value={firstName} onChange={handleChange} type="text" placeholder="First name" />
                            {touched.firstName && errors.firstName && <Form.Text className="text-danger">{errors.firstName}</Form.Text>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="lastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control value={lastName} onChange={handleChange} type="text" placeholder="Last name" />
                            {touched.lastName && errors.lastName && <Form.Text className="text-danger">{errors.lastName}</Form.Text>}
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={email} onChange={handleChange} type="email" placeholder="Enter email"/>
                        {touched.email && errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                        <Form.Control type={hidePassword ? "password" : "text"} value={password} onChange={handleChange} placeholder="Password"/>
                            <InputGroup.Append>
                                <InputGroup.Text style={{cursor:"pointer"}} onClick={()=>{setHidePassword(!hidePassword)}}>
                                    <FontAwesomeIcon style={{width: "1em"}} icon={hidePassword ? faEyeSlash : faEye} />
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        {touched.password && errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="role">
                        <Form.Label>Role</Form.Label>
                            <Form.Control value={role} onChange={handleChange} as="select" >
                                <option value="EMPLOYEE">Employee</option>
                                <option value="MANAGER">Manager</option>
                                <option value="ADMIN">Administrator</option>
                            </Form.Control>
                        {touched.role && errors.role && <Form.Text className="text-danger">{errors.role}</Form.Text>}
                    </Form.Group>
                    {role === "MANAGER" &&
                        <Form.Group controlId="level">
                            <Form.Label>Level</Form.Label>
                            <input value={level} onChange={handleChange} className="form-control" type="number" name="level"/>
                            {touched.level && errors.level && <Form.Text className="text-danger">{errors.level}</Form.Text>}
                        </Form.Group>}
                    {status.success ?
                        <Alert variant="success">User successfully created!</Alert>:
                        <Button block disabled={isSubmitting} variant="primary" type="submit">
                        Submit
                    </Button>}
                </Form>
            </Modal.Body>
        </Modal>)
}


export default FormikForm;