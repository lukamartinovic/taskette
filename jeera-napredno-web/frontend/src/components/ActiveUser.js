import React from 'react';
import {Card, ListGroup} from "react-bootstrap";
import moment from 'moment';

function ActiveUser(props){

    return(
        <Card>
            <Card.Header>
                {props.user.email}
            </Card.Header>
            <Card.Body>
                <Card.Text align="left">
                    Role: {props.user.role.charAt(0).toUpperCase() + props.user.role.substring(1).toLowerCase()}<br/>
                    Full name: {`${props.user.firstName} ${props.user.lastName}`}<br/>
                    Created on: {moment(props.user.created).format('DD.MM.YYYY HH:mm:ss')}
                </Card.Text>

            </Card.Body>
        </Card>
    )
};

export default ActiveUser;