import React, {useContext, useEffect, useState} from 'react';
import {Col, ListGroup, Row, Tab} from 'react-bootstrap'
import api from '../../api/api';
import AuthContext from "../../context/AuthContext";
import ActiveProject from './ActiveProject';
import {Route} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilRuler} from "@fortawesome/free-solid-svg-icons";
import {AddProject} from "../index";


function Projects(props){
    const context = useContext(AuthContext).authentication;
    const [projects, setProjects] = useState([]);
    const [activeProject, setActiveProject] = useState(null);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        api.getProjects(context.token,
            (res) => {
                setProjects(res.data.projects);
            },
            (err) => {
                console.log(err)
            })
    }, [activeProject, refetch]);

    return(projects.length !== 0 && <>
        <Tab.Container id="list-group-tabs-example">
        <Row>
        <Col sm={4}>
            <ListGroup.Item onClick={()=>{props.history.push("/projects/AddProject")}} action variant="primary" className="text-center">
                Add project&nbsp;&nbsp;&nbsp;<FontAwesomeIcon size="lg" icon={faPencilRuler}/>
            </ListGroup.Item>
            <ListGroup>
                {projects.map(project => {
                    return <ListGroup.Item eventKey={project._id} key={project._id} action onClick={()=>{setActiveProject(project); props.history.push(`/projects/${project._id}`)}}>{project.name}</ListGroup.Item>
                })}
            </ListGroup>
        </Col>
        <Col sm={8}>
                {activeProject && <Route path={`/projects/${activeProject._id}`} render={
                    (props) => {return <ActiveProject {...props} project={activeProject} token={context.token}/>}
                }/>}
        </Col>
        </Row>
        </Tab.Container>
        <Route path="/projects/addProject" render={(props)=>{return <AddProject {...props} token={context.token} refetch={()=>{setRefetch(!refetch)}}/>}}/>
    </>)
}

export default Projects;