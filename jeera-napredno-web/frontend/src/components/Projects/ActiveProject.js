import {Card, Nav} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import api from "../../api/api";
import {UserTable} from '../index'
import moment from 'moment';

function ActiveProject(props){

    const [users, setUsers] = useState();
    const [tab, setTab] = useState("project");

    function changeTab(tab){
        setTab(tab);
    }

    function returnContent(tab){
        if(tab === "project"){
            return(<>
                <Card.Subtitle className="text-muted mb-3 font-weight-normal">
                    {moment(props.project.created).format('DD.MM.YYYY')}
                </Card.Subtitle>
                    <Card.Text>
                        {props.project.description}
                    </Card.Text>
                </>)
        }
        if(tab === "users"){
            return(
                users && <UserTable users={users}/>
            )
        }
    };

    useEffect(() =>{
       api.getUsersById(props.token, props.project.users,
           (res)=>{setUsers(res.data)},
           (err) => {console.log(err)})
    },[props.project, tab]);

    return(
    <Card>
        <Card.Header>
            <Nav onSelect={changeTab} fill variant="tabs" activeKey={tab} defaultActiveKey="project">
                <Nav.Item>
                    <Nav.Link active={tab === "project"} eventKey="project">Project</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link active={tab === "users"} eventKey="users">Users</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link active={tab === "sprints"} eventKey="sprints">Sprints</Nav.Link>
                </Nav.Item>
            </Nav>
        </Card.Header>
        <Card.Body>
            <Card.Title>
                {props.project.name}
            </Card.Title>
            {returnContent(tab)}
        </Card.Body>
    </Card>

    )
}

export default ActiveProject;
