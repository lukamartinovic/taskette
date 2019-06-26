import React from 'react';
import {Button, Card, ListGroup} from 'react-bootstrap';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faTasks} from "@fortawesome/free-solid-svg-icons";

function Sprint(props){
    function accentColor(status){
        if(status === "DONE") return "green";
        if(status === "TO DO") return "red";
        if(status === "IN PROGRESS") return "khaki";
    }

    console.log(props.sprint);
    return(<Card style={{maxWidth: "35vh", minWidth: "25vh"}}>
        <Card.Header>
            <Card.Text>{props.sprint.name} <Button  style={{borderColor:"lightgray", marginLeft:"1em"}} variant="light"><FontAwesomeIcon icon={faPlus} size="xs"/>&nbsp;<FontAwesomeIcon icon={faTasks}/></Button></Card.Text>
        </Card.Header>
        <Card.Body>
            <ListGroup>
                {props.sprint.tasks.map((task, index) =>{

                    if(index === 4){
                        return <ListGroup.Item>...</ListGroup.Item>
                    }
                    if(index < 4)
                        return <ListGroup.Item style={{borderLeftColor: accentColor(task.status), borderLeftWidth: "2px"}}>{task.name}</ListGroup.Item>
                    else return;

                })}
            </ListGroup>
        </Card.Body>
        <Card.Footer>
            <Card.Text className="text-muted text-center text-weight-bold">{`${moment(props.sprint.startDate).format("DD.MM.YYYY")} - ${moment(props.sprint.endDate).format("DD.MM.YYYY")}`}</Card.Text>
        </Card.Footer>
    </Card>)
}

export default Sprint;