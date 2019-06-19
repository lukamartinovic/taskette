import React, {useContext, useState, useEffect} from 'react';
import {Card} from "react-bootstrap";

function Task(props){
    return(
        props.activeTask ?
                <Card>
                    <Card.Body style={{textAlign:"left"}}>
                        <Card.Title>{props.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{`${props.task.points} Points`}</Card.Subtitle>
                        <Card.Text>
                            {props.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
        :
                <Card
                      style={{ width: '22rem', marginBottom: "0.5em" }}
                      onClick={() => {props.activateTask(props.task)}}>
                    <Card.Body style={{textAlign:"left"}}>
                        <Card.Title>{props.name}</Card.Title>
                        <Card.Text className={"text-truncate"}>
                            {props.description}
                        </Card.Text>
                    </Card.Body>
                </Card>

    )
};

export default Task;