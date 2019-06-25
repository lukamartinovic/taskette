import React, {useContext, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Users} from "../";
import _ from 'lodash';
import CheckedUsers from '../../context/CheckedUsers';
import api from '../../api/api'
import AuthContext from '../../context/AuthContext'

function AddUserToProject(props){

    const [checkedUsers, setCheckedUsers] = useState({users:props.project.users, changed: false});
    const token = useContext(AuthContext).authentication.token;

    const contextValue = {
        projectUsers: props.project.users,
        checkedUsers,
        setCheckedUsers: (user, addOrRemove) => {
            let newCheckedUsers = addOrRemove ? _.union(checkedUsers.users, [user]) : _.pull(checkedUsers.users, user);
            setCheckedUsers({users: newCheckedUsers, changed:!checkedUsers.changed});
        }
    };

    function handleSubmit(e){
        e.stopPropagation();
        e.preventDefault();
        api.editProjectUsers(token, props.project._id, checkedUsers.users,
            (res)=>{console.log(res)},
            (err)=>{console.log(err)})
        props.handleClose(false);

    }

    return(<>
        <CheckedUsers.Provider value={contextValue}>
        <Modal style={{padding:"0"}} size="xl" show={props.show} onHide={()=>{props.handleClose(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>Add users to project</Modal.Title>
            </Modal.Header>
            <Users selectUsers history={props.history} search/>
            <Modal.Footer className="d-flex justify-content-center">
                <div><Button onClick={handleSubmit} className="align-content-md-center">Submit</Button></div>
            </Modal.Footer>
        </Modal>
        </CheckedUsers.Provider>
    </>)
}

export default AddUserToProject;