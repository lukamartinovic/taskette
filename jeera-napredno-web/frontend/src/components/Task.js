import React from 'react';
import {Card} from "react-bootstrap";


function Task(props){
    function borderColor(status){
        switch(status){
            case "DONE":
                return "border-success";
            case "TO DO":
                return "border-info";
            case "IN PROGRESS":
                return "border-primary";
            default:
                return ""
        }
    }

    return(
                <Card bg="light"
                      style={{ marginBottom: "0.5em" }}
                      onClick={() => {props.activateTask(props.task._id)}}

                      >
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