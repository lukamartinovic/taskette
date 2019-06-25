import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Users} from "../";
import _ from 'lodash';

function AddUserToProject(props){

    const [users, setUsers] = useState([]);
    console.log(users);
    function handleChangeUsers(user, addOrRemove){
        console.log(user, addOrRemove)
        addOrRemove ? setUsers(_.union(users, [user])) : setUsers(_.pull(users, user));
    }

    return(<>
        <Modal style={{padding:"0"}} size="xl" show>
            <Modal.Header>
                <Modal.Title>Add users to project</Modal.Title>
            </Modal.Header>
            <Users checkedUsers={users} handleChangeUsers={handleChangeUsers} selectUsers history={props.history} search/>
            <Modal.Footer className="d-flex justify-content-center">
                <div><Button className="align-content-md-center">Submit</Button></div>
            </Modal.Footer>
        </Modal>
    </>)
}

export default AddUserToProject;