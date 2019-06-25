import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import api from '../../api/api'
import {AuthContext, ProjectContext} from '../../context/'

function AddSprint(props){
    const project_id = useContext(ProjectContext).projectContext.activeProject._id;
    const token = useContext(AuthContext).authentication.token;
    const [values, setValues] = useState({startDate: "2019-01-01", endDate: "2019-01-07", points: 20});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    function handleChange(e){
        setValues({...values, [e.target.name]:e.target.value});
    }

    useEffect(()=>{
        const startDate = values.startDate;
        const endDate = values.endDate;
        if((startDate > endDate) || (endDate < startDate)){
            setValues({startDate: endDate, endDate: startDate});}
        if(values.points <= 0){
            setValues({...values, points:1})
        }

    }, [values])

    function handleSubmit(e){
        setSubmitting(true);
        e.stopPropagation();
        e.preventDefault();
        api.addSprint(token, project_id, values.points, values.startDate, values.endDate,
            (res)=>{setSubmitting(false)
            setSuccess(true)},
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
                    <input value={values.startDate} onChange={handleChange} name="startDate" type="date" className="form-control date"/>
                </Form.Group>
                <Form.Group controlId="endDate">
                    <Form.Label>End date</Form.Label>
                    <input value={values.endDate} onChange={handleChange} name="endDate" type="date" className="form-control date"/>
                </Form.Group>
                <Form.Group controlId="endDate">
                    <Form.Label>Points</Form.Label>
                    <input value={values.points} name="points" onChange={handleChange} type="number" className="form-control"/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                {!success ? <div><Button disabled={submitting} onClick={handleSubmit} className="align-content-md-center">Submit</Button></div> : <Alert className="w-100 text-center" block variant="success">Sprint successfully created!</Alert>}
            </Modal.Footer>
        </Modal>
    )
};

export default AddSprint;
