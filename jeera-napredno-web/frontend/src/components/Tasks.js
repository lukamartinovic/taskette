import React, {useContext, useState, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Task from "./Task";
import AuthContext from "../context/AuthContext";
import Axios from "axios";
import api from "../api/api";
import {Col, Row} from "react-bootstrap";


function Tasks(props){

    const context = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState(null);

    function activateTask(task){
        setActiveTask(task)
    }

    console.log(activeTask);

    useEffect(() => {
        api.getTasks(
            context.authentication._id,
            context.authentication.token,
            (res) =>{
                setTasks(res.data);
            });
    }, []);
    return(

        <Container>
            <Row>
                <Col md={4}>
                    {tasks.map((task) =>
                        <Task task={task}
                              name={task.name}
                              description={task.description}
                              key={task._id}
                              activateTask={activateTask}/>)
                    }
                </Col>
                <Col md={8}>
                    <Container>
                        {activeTask ?
                            <Task
                                task={activeTask}
                                name={activeTask.name}
                                description={activeTask.description}
                                activeTask={true}/>
                            :
                            <div/>
                        }
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Tasks;