import React from 'react';
import {ListGroup} from "react-bootstrap";


function User(props){
    return(
        <ListGroup.Item active={props.active}
                        action onClick={()=>{props.setActiveUser(props.user._id)}}>
            {(props.user.email)}
        </ListGroup.Item>
    )
}

export default User;