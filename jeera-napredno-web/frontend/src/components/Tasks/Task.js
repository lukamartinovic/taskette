import React, {useContext} from 'react';
import {Col, Form, Modal} from "react-bootstrap";
import Markdown from 'markdown-to-jsx';
import api from "../../api/api";
import AuthContext from "../../context/AuthContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClock, faExclamationCircle} from "@fortawesome/free-solid-svg-icons";


function Task(props){
    const authContext = useContext(AuthContext);
    function handleStatusUpdate(e){
        api.changeTaskStatus(props.task._id, e.target.value, authContext.authentication.token,
            (res) =>{props.setTask(res.data)})
    }

    function accentColor(status){
        if(status === "DONE") return "green";
        if(status === "TO DO") return "red";
        if(status === "IN PROGRESS") return "khaki";
    }

    function statusIcon(status){
        if(status === "DONE") return <FontAwesomeIcon icon={faCheck}/>;
        if(status === "TO DO") return <FontAwesomeIcon icon={faExclamationCircle}/>;
        if(status === "IN PROGRESS") return <FontAwesomeIcon icon={faClock}/>;
    }

    return(
        <Modal size="xl" show={props.show} onHide={props.handleHide}>
            <Modal.Header style={{borderTop: `3px solid ${accentColor(props.task.status)}`}} closeButton>
                <Modal.Title>{props.task.name}&nbsp;{statusIcon(props.task.status)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="overflow-auto" style={{maxHeight:"70vh"}}><Markdown>{props.task.description}</Markdown></div>
            </Modal.Body>
            <Modal.Footer>
                <Form.Group style={{width:"100%"}} controlId="formGridState">
                    <Form.Label as={Col} md={2}>Task status</Form.Label>
                    <Form.Control onChange={handleStatusUpdate} as="select">
                        <option value={"TO DO"}>To do</option>
                        <option value={"DONE"}>Done</option>
                        <option value={"IN PROGRESS"}>In progress</option>
                    </Form.Control>
                </Form.Group>
            </Modal.Footer>
        </Modal>

    )
}

export default Task;