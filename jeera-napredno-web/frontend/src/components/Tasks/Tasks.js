import React, {useContext, useEffect, useState} from 'react';
import {ActiveTask, Task} from "../index";
import {Alert, Col, Container, Row} from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import api from "../../api/api";
import {Route} from 'react-router-dom'

function Tasks(props){
    console.log(props.match.params.id)
    const authContext = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState("");
    const [fetch, refetch] = useState(false);

    useEffect(() => {
        let didCancel = false;
        api.getTasks(
            authContext.authentication._id,
            authContext.authentication.token,
            (res) =>{
                !didCancel && setTasks(res.data);
            })
        return () => {didCancel = true}
    }, [fetch, activeTask, authContext.authentication.token, authContext.authentication._id]);

    function findActiveTask(){
        return tasks.find(
            task => {return task._id === activeTask;}
        )
    }

    function activateTask(task_id){
        setActiveTask(task_id);
        props.history.push(`/tasks/${task_id}`)
    }

    return(
        <Container>
            <Row>
                <Col md={4}>
                    {tasks.map((task) =>
                        <Task task={task}
                              key={task._id}
                              activateTask={activateTask}/>)
                    }
                </Col>
                <Col md={8}>
                    <Container>
                        {activeTask ?
                            <Route path={`/tasks/${findActiveTask()._id}`}
                            render={() =>
                                <ActiveTask
                                task={findActiveTask()}
                                refetch={() => {refetch(!fetch)}}
                                />
                            }
                            />
                            :
                            <Alert variant="info">Pick a task from the list to view its details</Alert>
                        }
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Tasks;