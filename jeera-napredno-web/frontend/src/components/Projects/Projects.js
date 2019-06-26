import React, {useContext, useEffect, useState} from 'react';
import api from "../../api/api";
import {AuthContext, ProjectContext} from "../../context/";
import {Card, CardGroup} from 'react-bootstrap';
import Markdown from 'markdown-to-jsx'

function Projects(){
    console.log("f")
    const authContext = useContext(AuthContext).authentication;
    const [projects, setProjects] = useState([]);

    const contextValue={
        projects,
        updateContext(newContext){
            setProjects(newContext)
        }
    }

    useEffect(()=>{
       //api.getSubEmployees(authContext.token, (res)=>{console.log(res)}, (err) => {console.log(err)})
        api.getProjects(authContext.token, 1, 100, (res) => {setProjects(res.data.projects)}, (err) => {console.log(err)})
    }, []);
    return(<>
        <ProjectContext.Provider value={contextValue}>
            <CardGroup>
                {projects.map(
                    project => {
                        return <Card style={{minWidth:"25vh", marginBottom:"1em"}}>
                            <Card.Header>
                                <Card.Title>{project.name}</Card.Title>
                            </Card.Header>
                            <Card.Body className="overflow-auto">
                                <Markdown>{project.description}</Markdown>
                            </Card.Body>
                        </Card>
                    }
                )
                }
            </CardGroup>
        </ProjectContext.Provider>
    </>)
}

export default Projects;