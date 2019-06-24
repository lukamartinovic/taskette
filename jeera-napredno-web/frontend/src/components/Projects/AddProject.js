import React, {useEffect} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import api from '../../api/api';
import {withFormik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Project name is required").max(50, "Cannot be longer than 50 characters"),
    description: Yup.string().max(1000, "Cannot be longer than 1000 characters").required("Description is required")
});

function handleSubmit(values, {resetForm, setSubmitting, props, setStatus}){
    const token = props.token;
    function callback(res){
        resetForm();
        setStatus({success:true});
        setSubmitting(false);
        props.refetch()
    }
    function errorCallback(err){
        console.log(err);
    }
    api.addProject(token, [], values.description, values.name, callback, errorCallback)
}


const AddProjectFormik = withFormik({
    mapPropsToValues(){
        return{
            name: "",
            description: ""
        }
    },
    mapPropsToStatus(){
        return{
            success: false
        }
    },
    handleSubmit,
    validationSchema
})(AddProject);


function AddProject({values, errors, handleChange, handleSubmit, validationSchema, touched, isSubmitting, status, setStatus, ...props}){
    const {name, description} = values;
    useEffect(() => {setStatus({success:false})}, [values, touched, setStatus]);

    return(
        <Modal onHide={()=>{props.history.push('/projects/')}} show>
            <Modal.Header closeButton>
                <Modal.Title>Create project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label >Project name</Form.Label>
                        <Form.Control value={name} onChange={handleChange} as="input"/>
                        {touched.name && errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label >Project description</Form.Label>
                        <Form.Control value={description} onChange={handleChange} as="textarea"/>
                        {touched.description && errors.description && <Form.Text className="text-danger">{errors.description}</Form.Text>}
                    </Form.Group>
                    {status.success ?
                        <Alert variant="success">Project successfully created!</Alert>:
                        <Button block disabled={isSubmitting} variant="primary" type="submit">
                            Submit
                        </Button>}
                </Form>
            </Modal.Body>
        </Modal>)
}


export default AddProjectFormik;