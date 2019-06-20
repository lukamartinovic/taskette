import React from 'react';
import {Card, ListGroup} from "react-bootstrap";

function User(props){
    return(
        <ListGroup.Item>{(props.user.email)}</ListGroup.Item>
    )
};

export default User;