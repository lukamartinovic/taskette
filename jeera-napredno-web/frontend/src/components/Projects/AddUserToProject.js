import React, {useContext, useState} from 'react';
import {Alert, Button, Modal} from 'react-bootstrap';
import {Users} from "../";
import api from '../../api/api'
import AuthContext from '../../context/AuthContext'
import ProjectContext from "../../context/ProjectContext";

function AddUserToProject(props){
    const token = useContext(AuthContext).authentication.token;
    const projectContext = useContext(ProjectContext);

    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    function handleSubmit(e){
        setSubmitting(true);
        e.stopPropagation();
        e.preventDefault();
        api.editProjectUsers(token, projectContext.projectContext.activeProject._id, projectContext.projectContext.newUsersList,
            (res)=>{setSuccess(true); setSubmitting(false);},
            (err)=>{console.log(err)})

    }

    return(<>
        <Modal style={{padding:"0"}} size="xl" show={props.show} onHide={()=>{props.handleClose()}}>
            <Modal.Header closeButton>
                <Modal.Title>Project users</Modal.Title>
            </Modal.Header>
            <Users selectUsers history={props.history} search/>
            <Modal.Footer className="d-flex justify-content-center">
               {success ? <Alert variant="success">User list successfully edited!</Alert> :
                <div><Button disabled={submitting} onClick={handleSubmit} className="align-content-md-center">Submit</Button></div>}
            </Modal.Footer>
        </Modal>
    </>)
}

export default AddUserToProject;