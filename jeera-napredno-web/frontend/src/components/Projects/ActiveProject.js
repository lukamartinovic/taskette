import {Button, Card, Nav} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import api from "../../api/api";
import {UserTable} from '../index'
import moment from 'moment';
import Markdown from 'markdown-to-jsx';
import AddUserToProject from "./AddUserToProject";
import ProjectContext from "../../context/ProjectContext";

function ActiveProject(props){
    const [users, setUsers] = useState();
    const [tab, setTab] = useState("project");
    const [addUserDialog, setAddUserDialog] = useState(false);

    const project = useContext(ProjectContext).projectContext.activeProject;

    function changeTab(tab){
        setTab(tab);
    }

    function returnContent(tab){
        if(tab === "project"){
            return(<>
                <Card.Subtitle className="text-muted mb-3 font-weight-normal">
                    {moment(project.created).format('DD.MM.YYYY')}
                </Card.Subtitle>
                    <div className="overflow-auto" style={{maxHeight:"60vh"}}>
                        <Markdown>{project.description}</Markdown>
                    </div>
                </>)
        }
        if(tab === "users"){
            return(
                <><Button onClick={()=>{setAddUserDialog(true)}}>Add users</Button>{users && <UserTable users={users}/>}</>
            )
        }
    };

    useEffect(() =>{
       api.getUsersById(props.token, project.users,
           (res)=>{setUsers(res.data)},
           (err) => {console.log(err.response.data)})
    },[tab, props.token, project, addUserDialog]);

    return(<>
    <Card>
        <Card.Header>
            <Nav onSelect={changeTab} fill variant="tabs" activeKey={tab} defaultActiveKey="project">
                <Nav.Item>
                    <Nav.Link style={{color:"inherit"}} active={tab === "project"} eventKey="project">Project</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{color:"inherit"}} active={tab === "users"} eventKey="users">Users</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{color:"inherit"}} active={tab === "sprints"} eventKey="sprints">Sprints</Nav.Link>
                </Nav.Item>
            </Nav>
        </Card.Header>
        <Card.Body>
            <Card.Title>
                {project.name}
            </Card.Title>
            {returnContent(tab)}
        </Card.Body>
    </Card>
            <AddUserToProject show={addUserDialog} handleClose={()=>{setAddUserDialog(!addUserDialog)}}/>
    </>

    )
}

export default ActiveProject;
