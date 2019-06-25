import React, {useContext} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Users} from "../";
import api from '../../api/api'
import AuthContext from '../../context/AuthContext'
import ProjectContext from "../../context/ProjectContext";

function AddUserToProject(props){
    const token = useContext(AuthContext).authentication.token;
    const projectContext = useContext(ProjectContext);
    const users = projectContext.projectContext.activeProject.users;

    function handleSubmit(e){
        e.stopPropagation();
        e.preventDefault();
        api.editProjectUsers(token, projectContext.projectContext.activeProject._id, projectContext.projectContext.newUsersList,
            (res)=>{console.log(res)},
            (err)=>{console.log(err)})
        props.handleClose(false);

    }

    return(<>
        <Modal style={{padding:"0"}} size="xl" show={props.show} onHide={()=>{props.handleClose()}}>
            <Modal.Header closeButton>
                <Modal.Title>Add users to project</Modal.Title>
            </Modal.Header>
            <Users selectUsers history={props.history} search/>
            <Modal.Footer className="d-flex justify-content-center">
                <div><Button onClick={handleSubmit} className="align-content-md-center">Submit</Button></div>
            </Modal.Footer>
        </Modal>
    </>)
}

export default AddUserToProject;