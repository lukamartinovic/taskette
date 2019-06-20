import React, {useContext, useState, useEffect} from 'react';
import {Card, Form, Col} from "react-bootstrap";
import api from '../api/api'
import AuthContext from "../context/AuthContext";


function Task(props){
    const authContext = useContext(AuthContext);
    const [task, setTask] = useState(props.task);

    return(
                <Card bg="light"
                      style={{ marginBottom: "0.5em" }}
                      onClick={() => {props.activateTask(props.task._id); console.log("clicked", props.task._id)}}>
                    <Card.Body style={{textAlign:"left"}}>
                        <Card.Title>{`${props.task.name} ${props.task.status === "DONE" ? " ✔" : ""}`}</Card.Title>
                        <Card.Text className={"text-truncate"}>
                            {props.task.description}
                        </Card.Text>
                    </Card.Body>
                </Card>

    )
};

export default Task;