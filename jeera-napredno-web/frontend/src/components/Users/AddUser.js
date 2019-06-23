import React, {useState, useContext} from 'react';
import {Modal, Button, Form, Row, Col} from "react-bootstrap";
import api from '../../api/api';
import AuthContext from '../../context/AuthContext';
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

function handleSubmit(values, {resetForm, setErrors, setSubmitting}){
    console.log(values)}


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
    handleSubmit,
    validationSchema
})(AddUser);


function AddUser({values, errors, handleChange, handleSubmit, validationSchema, touched, ...props}){
    function errorString(error){
        return(error.substr(error.indexOf(" ") + 1));
    };

    return(
        <Modal onHide={()=>{props.history.push('/users/')}} show>
            <Modal.Header closeButton>
                <Modal.Title>Create user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group controlId="firstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control value={values.firstName} onChange={handleChange} type="text" placeholder="First name" />
                            {touched.firstName && errors.firstName && <Form.Text className="text-danger">{errors.firstName}</Form.Text>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="lastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control value={values.lastName} onChange={handleChange} type="text" placeholder="Last name" />
                            {touched.lastName && errors.lastName && <Form.Text className="text-danger">{errors.lastName}</Form.Text>}
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={values.email} onChange={handleChange} type="email" placeholder="Enter email"/>
                        {touched.email && errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={values.password} onChange={handleChange} placeholder="Password"/>
                        {touched.password && errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Control value={values.role} onChange={handleChange} as="select" >
                            <option value="EMPLOYEE">Employee</option>
                            <option value="MANAGER">Manager</option>
                            <option value="ADMIN">Administrator</option>
                        </Form.Control>
                        {touched.role && errors.role && <Form.Text className="text-danger">{errors.role}</Form.Text>}
                    </Form.Group>
                    {values.role === "MANAGER" &&
                        <Form.Group controlId="level">
                            <Form.Label>Level</Form.Label>
                            <input value={values.level} onChange={handleChange} className="form-control" type="number" name="level"/>
                            {touched.level && errors.level && <Form.Text className="text-danger">{errors.level}</Form.Text>}
                        </Form.Group>}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>)
}


export default FormikForm;