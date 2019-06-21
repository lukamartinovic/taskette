import React from 'react';
import {Card, ListGroup} from "react-bootstrap";

function ActiveUser(props){

    return(
        <Card>
            <Card.Header>
                {props.user.email}
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    Role: {props.user.role.charAt(0).toUpperCase() + props.user.role.substring(1).toLowerCase()}
                </Card.Text>
            </Card.Body>
        </Card>
    )
};

export default ActiveUser;