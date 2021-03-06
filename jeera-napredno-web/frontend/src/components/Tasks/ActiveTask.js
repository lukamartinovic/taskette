import {Card, Form} from "react-bootstrap";
import React, {useContext} from "react";
import api from "../../api/api";
import AuthContext from "../../context/AuthContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

function ActiveTask(props){
    const authContext = useContext(AuthContext);
    const {status, name, description, points} = props.task;
    function handleStatusUpdate(e){
        api.changeTaskStatus(props.task._id, e.target.value, authContext.authentication.token,
            () =>{
                props.refetch();
            })
    }

    return(
        <Card bg="light">
            <Card.Body style={{textAlign:"left"}}>
                <Card.Title>{name}{" "}{status === "DONE" && <FontAwesomeIcon size="sm" icon={faCheck}></FontAwesomeIcon>}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{`${points} Points`}</Card.Subtitle>
                <Card.Text>
                    {description}
                </Card.Text>
                <Form.Group controlId="formGridState">
                    <Form.Label>Task status</Form.Label>
                    <Form.Control onChange={handleStatusUpdate} value={status} as="select">
                        <option value={"TO DO"}>To do</option>
                        <option value={"DONE"}>Done</option>
                        <option value={"IN PROGRESS"}>In progress</option>
                    </Form.Control>
                </Form.Group>
            </Card.Body>
        </Card>)
}

export default ActiveTask;