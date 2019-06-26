import React, {useContext, useEffect, useState} from 'react';
import api from "../../api/api";
import {AuthContext} from "../../context";
import {Task} from "../"
import {Table} from 'react-bootstrap';
import moment from "moment";
import lodash from 'lodash';

function MyTasks(props){
    console.log("rendered")
    const context = useContext(AuthContext).authentication;
    const [projects, setProjects] = useState([])
    const [task, setTask] = useState({});
    const [taskModal, setTaskModal] = useState(false);

    useEffect(()=>{
        api.getProjects(context.token, 1, 100,
        (res) => {setProjects(res.data.projects);},
        (err) => {console.log(err)});
    },[taskModal, task])

    const sprints = projects.flatMap( project => {
        return project.sprints
    });

    const tasks = sprints.flatMap( sprint => sprint.tasks )

    function accentColor(status){
        if(status === "DONE") return "green";
        if(status === "TO DO") return "red";
        if(status === "IN PROGRESS") return "khaki";
    }

    return (<>
        <Table bordered striped hover style={{cursor: "pointer", borderLeftWidth: "2px"}}>
            <thead>
            <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Points</th>
                <th className="text-left">Due</th>
                <th className="text-left">Status</th>
            </tr>
            </thead>
            <tbody className="text-left">
            {tasks.map(
                (task) => {
                    const {name, due, points, status, _id} = task;
                    return (
                        <tr style={{borderLeft:"2px solid black", borderLeftColor: accentColor(task.status)}} key={_id} onClick={()=>{setTask(task); setTaskModal(true)}}>
                            <td style={{width:"25%"}} >{name}</td>
                            <td style={{width:"25%"}} >{points}</td>
                            <td style={{width:"25%"}} >{moment(due).format("DD.MM.YYYY")}</td>
                            <td style={{width:"25%"}} >{lodash.capitalize(status)}</td>
                        </tr>
                    )
                })}
            </tbody>
    </Table>
            <Task setTask={(newTask)=>{setTask(newTask)}} show={taskModal} task={task} handleHide={()=>{setTaskModal(false)}}/>
        </>
    )
}

export default MyTasks;