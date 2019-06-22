import {Card, Form} from "react-bootstrap";
import React, {useContext} from "react";
import api from "../../api/api";
import AuthContext from "../../context/AuthContext";
import {Router} from 'react-router-dom';

function ActiveTask(props){
    const authContext = useContext(AuthContext);

    function handleStatusUpdate(e){
        api.changeTaskStatus(props.task._id, e.target.value, authContext.authentication.token,
            (res) =>{
                props.refetch();
            })
    }

    return(
        <Card bg="light">
            <Card.Body style={{textAlign:"left"}}>
                <Card.Title>{`${props.task.name} ${props.task.status === "DONE" ? " ✔" : ""}`}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{`${props.task.points} Points`}</Card.Subtitle>
                <Card.Text>
                    {props.task.description}
                </Card.Text>
                <Form.Group controlId="formGridState">
                    <Form.Label>Task status</Form.Label>
                    <Form.Control onChange={handleStatusUpdate} value={props.task.status} as="select">
                        <option value={"TO DO"}>To do</option>
                        <option value={"DONE"}>Done</option>
                        <option value={"IN PROGRESS"}>In progress</option>
                    </Form.Control>
                </Form.Group>
            </Card.Body>
        </Card>)
}

export default ActiveTask;