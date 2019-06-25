import React, {useContext, useEffect, useState} from 'react';
import {Col, ListGroup, Pagination, Row, Tab} from 'react-bootstrap'
import api from '../../api/api';
import AuthContext from "../../context/AuthContext";
import ActiveProject from './ActiveProject';
import {Route} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilRuler} from "@fortawesome/free-solid-svg-icons";
import {AddProject} from "../index";
import ProjectContext from '../../context/ProjectContext'
import {pull} from 'lodash';

function Projects(props){
    const context = useContext(AuthContext).authentication;
    const [projectContext, setProjectContext] = useState({projects:[], activeProject: {}, newUsersList: []});
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(5);
    const [loading, setLoading] = useState(true);

    function setContextValue(context){
        setProjectContext(context);
    }

    function setNewUserList(id){
        let currentUsersArray = projectContext.newUsersList;
        let newUsersArray = currentUsersArray.includes(id) ? pull(currentUsersArray, id) : currentUsersArray.push(id);
        setProjectContext({...projectContext, newUserList: newUsersArray})
    }

    const contextValue = {
        projectContext,
        setContextValue,
        setNewUserList
    };

    const pageSize = Math.round(window.innerHeight/80);

    useEffect(() => {
        let didCancel = false;
        !didCancel && setLoading(true);
        !didCancel && api.getProjects(context.token, page, pageSize,
            (res) => {
                !didCancel && setProjectContext({...projectContext, projects: res.data.projects});
                !didCancel && setPages(Math.ceil(res.data.count / pageSize));
                !didCancel && setLoading(false);
            },
            (err) => {
                console.log(err)
            });
        return () => {didCancel = true}
        // eslint-disable-next-line
    }, [page, pages, pageSize, context.token]);

    function renderPagination(){
        return(
            <ListGroup.Item>
                <Pagination style={{margin:"auto", width:"fit-content"}}>
                    <Pagination.First onClick={()=>{setPage(1)}}/>
                    <Pagination.Prev onClick={()=>{page > 1 && setPage(page-1)}}/>
                    <Pagination.Item active>{page} / {pages || "..."}</Pagination.Item>
                    <Pagination.Next onClick={()=>{page < pages && setPage(page+1)}}/>
                    <Pagination.Last onClick={()=>{setPage(pages)}}/>
                </Pagination>
            </ListGroup.Item>
        )

    }
    return(<ProjectContext.Provider value={contextValue}>
        <Tab.Container id="list-group-tabs-example">
        <Row>
        <Col sm={4}>
            <ListGroup.Item onClick={()=>{props.history.push("/projects/AddProject")}} action variant="primary" className="text-center">
                Add project&nbsp;&nbsp;&nbsp;<FontAwesomeIcon size="lg" icon={faPencilRuler}/>
            </ListGroup.Item>
            <ListGroup>
                {!loading && projectContext.projects.length !== 0 &&  projectContext.projects.map(project => {
                    return <ListGroup.Item eventKey={project._id} key={project._id} action onClick={()=>{setProjectContext({...projectContext, activeProject: project, newUsersList: project.users}); props.history.push(`/projects/${project._id}`)}}>{project.name}</ListGroup.Item>
                })}
                {renderPagination()}
            </ListGroup>
        </Col>
        <Col sm={8}>
                {projectContext.activeProject &&
                <Route path={`/projects/${projectContext.activeProject._id}`} render={
                    (props) => {return <ActiveProject {...props} token={context.token}/>}
                }/>}
        </Col>
        </Row>
        </Tab.Container>
        <Route path="/projects/addProject" render={(props)=>{return <AddProject {...props} token={context.token}/>}}/>
    </ProjectContext.Provider>)
}

export default Projects;