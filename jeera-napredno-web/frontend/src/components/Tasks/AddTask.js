import React, {useEffect} from 'react';
import {Alert, Button, Form, FormGroup, Modal} from 'react-bootstrap';
import api from '../../api/api';
import {withFormik} from 'formik';
import * as Yup from 'yup';
import Markdown from 'markdown-to-jsx';

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Task name is required").max(30, "Cannot be longer than 30 characters"),
  description: Yup.string().max(5000, "Cannot be longer than 5000 characters").required("Description is required"),
  points: Yup.number().min(1, "Task must be worth at least 1 point").required("Points are required"),
  user: Yup.string().email().required("User is required")
});

function handleSubmit(values, {resetForm, setErrors, setSubmitting, props, setStatus}){
  const sprint = props.sprint;
  console.log(sprint);
  const token = props.token;
  function callback(res){
    setStatus({success:true});
    setSubmitting(false);
  }
  function errorCallback(err){
      console.log(err)
    if(err.errors.points){
      setErrors({points: `Points remaining in sprint ${props.sprint.points - props.sprint.currentPoints}`})
    }
    setSubmitting(false);
  }
  api.addTask(token, undefined, values.user, values.name, values.description, values.points, props.sprint._id, callback, errorCallback)
}

const AddTaskFormik = withFormik({
  mapPropsToValues(){
    return{
      name: "",
      description: "",
      points: 0,
      user: "",
      preview: false
    }
  },
  mapPropsToStatus(){
    return{
      success: false
    }
  },
  handleSubmit,
  validationSchema
})(AddTask);

function AddTask({values, errors, handleChange, handleSubmit, validationSchema, touched, isSubmitting, status, setStatus, ...props}){
  const {name, description, points, user, preview} = values;
  useEffect(() => {setStatus({success:false}); console.log(values)}, [values, touched, setStatus]);
  return(
      <Modal onHide={props.handleHide} size="xl" show={props.show}>
        <Modal.Header closeButton><Modal.Title>{`Create task in ${props.sprint.name}`}</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <FormGroup controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Name" value={name} onChange={handleChange} as="input"/>
              {touched.name && errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
            </FormGroup>
            <FormGroup controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control placeholder="Description" value={description} onChange={handleChange} as="textarea"/>
              {touched.description && errors.description && <Form.Text className="text-danger">{errors.description}</Form.Text>}
            </FormGroup>
            <FormGroup controlId="preview">
              <Form.Check onChange={handleChange} value={preview} label="Markdown preview"/>
            </FormGroup>
            <Form.Group  className="overflow-auto" style={{maxHeight:"40vh"}}>
              {values.preview && values.description !== "" && <Markdown className="p-2">{values.description}</Markdown>}
            </Form.Group>
            <FormGroup >
              <Form.Label>Points</Form.Label>
              <input min={1} value={points} onChange={handleChange} name="points" className="form-control" type="number"/>
              {touched.points && errors.points && <Form.Text className="text-danger">{errors.points}</Form.Text>}
            </FormGroup>
            <FormGroup controlId="user">
              <Form.Label>User</Form.Label>
              <Form.Control placeholder="User email" value={user} onChange={handleChange} as="input"/>
              {touched.user && errors.user && <Form.Text className="text-danger">{errors.user}</Form.Text>}
            </FormGroup>
            {status.success ?
                <Alert variant="success" className="w-100 text-center">Task successfully created!</Alert>:
                <Button block disabled={isSubmitting} variant="primary" type="submit">
                  Submit
                </Button>}
          </Form>
        </Modal.Body>
        <Modal.Footer className="">
        </Modal.Footer>
  </Modal>
  )
}

export default AddTaskFormik;