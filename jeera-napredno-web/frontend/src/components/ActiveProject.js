import {Card} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import api from "../api/api";
import {UserTable} from './'

function ActiveProject(props){

    const [users, setUsers] = useState();

    useEffect(() =>{
       api.getUsersById(props.token, props.project.users,
           (res)=>{setUsers(res.data)},
           (err) => {console.log(err)})
    },[props.project]);

    return(
    <Card>
        <Card.Body>
            <Card.Title>
                {props.project.name}
            </Card.Title>
            <Card.Text>
                {props.project.description}
            </Card.Text>
                {users && <UserTable users={users}/>}
        </Card.Body>
    </Card>
    )
}

export default ActiveProject;
