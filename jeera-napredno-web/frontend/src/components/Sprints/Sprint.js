import React, {useState} from 'react';
import {Button, Card, ListGroup} from 'react-bootstrap';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faTasks} from "@fortawesome/free-solid-svg-icons";
import {AddTask} from "../index";

function Sprint(props){
    const [taskDialog, setTaskDialog] = useState(false);

    function accentColor(status){
        if(status === "DONE") return "green";
        if(status === "TO DO") return "red";
        if(status === "IN PROGRESS") return "khaki";
    }

    console.log(props.sprint);
    return(<Card style={{maxWidth: "35vh", minWidth: "25vh", marginBottom:"1em"}}>
        <Card.Header>
            <Card.Text>{`${props.sprint.name}`} <Button disabled={props.addingTasksDisabled} onClick={()=>{setTaskDialog(true)}} style={{borderColor:"lightgray", marginLeft:"1em", marginRight:"1em"}} variant="light"><FontAwesomeIcon icon={faPlus} size="xs"/>&nbsp;<FontAwesomeIcon icon={faTasks}/></Button>{`${props.sprint.currentPoints}/${props.sprint.points}`}</Card.Text>
        </Card.Header>
        <Card.Body>
            <ListGroup>
                {props.sprint.tasks.map((task, index) =>{

                    if(index === 4){
                        return <ListGroup.Item key={0}>...</ListGroup.Item>
                    }
                    if(index < 4)
                        return <ListGroup.Item  key={task._id} style={{borderLeftColor: accentColor(task.status), borderLeftWidth: "2px"}}>{task.name}</ListGroup.Item>
                    else{return null};

                })}
            </ListGroup>
        </Card.Body>
        <Card.Footer>
            <Card.Text className="text-muted text-center text-weight-bold">{`${moment(props.sprint.startDate).format("DD.MM.YYYY")} - ${moment(props.sprint.endDate).format("DD.MM.YYYY")}`}</Card.Text>
        </Card.Footer>
        <AddTask sprint={props.sprint} token={props.token} show={taskDialog} handleHide={()=>{setTaskDialog(false); props.refetch();}}/>
    </Card>)
}

export default Sprint;