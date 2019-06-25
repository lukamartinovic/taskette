import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import api from '../../api/api'
import {AuthContext, ProjectContext} from '../../context/'

function AddSprint(props){
    const project_id = useContext(ProjectContext).projectContext.activeProject._id;
    const token = useContext(AuthContext).authentication.token;
    const [values, setValues] = useState({});
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e){
        setValues({...values, [e.target.name]:e.target.value});
        console.log(values)
    }

    function handleSubmit(e){
        setSubmitting(true);
        e.stopPropagation();
        e.preventDefault();
        api.addSprint(token, project_id, values.points, values.startDate, values.endDate,
            (res)=>{setSubmitting(false)},
            (err)=>{console.log(err)})

    }

    return (
        <Modal show={props.show} onHide={()=>{props.handleClose()}}>
            <Modal.Header closeButton >
                <Modal.Title>Add a sprint to project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="startDate">
                    <Form.Label>Start date</Form.Label>
                    <input onChange={handleChange} name="startDate" type="date" className="form-control date"/>
                </Form.Group>
                <Form.Group controlId="endDate">
                    <Form.Label>End date</Form.Label>
                    <input onChange={handleChange} name="endDate" type="date" className="form-control date"/>
                </Form.Group>
                <Form.Group controlId="endDate">
                    <Form.Label>Points</Form.Label>
                    <input name="points" onChange={handleChange} type="number" className="form-control"/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                <div><Button disabled={submitting} onClick={handleSubmit} className="align-content-md-center">Submit</Button></div>
            </Modal.Footer>
        </Modal>
    )
};

export default AddSprint;
