import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Users} from "../";
import _ from 'lodash';
import CheckedUsers from '../../context/CheckedUsers';

function AddUserToProject(props){

    const [checkedUsers, setCheckedUsers] = useState({users:[], changed: false});

    const contextValue = {
        checkedUsers,
        setCheckedUsers: (user, addOrRemove) => {
            let newCheckedUsers = addOrRemove ? _.union(checkedUsers.users, [user]) : _.pull(checkedUsers.users, user);
            setCheckedUsers({users: newCheckedUsers, changed:!checkedUsers.changed});
            console.log(checkedUsers.users);
        }
    };

    return(<>
        <CheckedUsers.Provider value={contextValue}>
        <Modal style={{padding:"0"}} size="xl" show>
            <Modal.Header>
                <Modal.Title>Add users to project</Modal.Title>
            </Modal.Header>
            <Users selectUsers history={props.history} search/>
            <Modal.Footer className="d-flex justify-content-center">
                <div><Button className="align-content-md-center">Submit</Button></div>
            </Modal.Footer>
        </Modal>
        </CheckedUsers.Provider>
    </>)
}

export default AddUserToProject;