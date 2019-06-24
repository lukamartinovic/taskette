import React, {useContext, useEffect, useState} from 'react';
import {Col, ListGroup, Row, Tab} from 'react-bootstrap'
import api from '../api/api';
import AuthContext from "../context/AuthContext";
import ActiveProject from './ActiveProject';
import {Route} from 'react-router-dom';

function Projects(props){
    const context = useContext(AuthContext).authentication;
    const [projects, setProjects] = useState([]);
    const [activeProject, setActiveProject] = useState(null);

    useEffect(() => {
        api.getProjects(context.token,
            (res) => {
                setProjects(res.data.projects);
            },
            (err) => {
                console.log(err)
            })
    }, [activeProject]);

    return(projects.length !== 0 && <>
        <Tab.Container id="list-group-tabs-example">
        <Row>
        <Col sm={4}>
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
    </>)
}

export default Projects;