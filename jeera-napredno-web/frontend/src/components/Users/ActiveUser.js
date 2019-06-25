import React from 'react';
import {Card} from "react-bootstrap";
import moment from 'moment';

function ActiveUser(props){

    const {created, role, email, lastName, firstName} = props.user;

    return(
        <Card>
            <Card.Header>
                {email}
            </Card.Header>
            <Card.Body>
                <Card.Text align="left">
                    Full name: {`${firstName} ${lastName}`}<br/>
                    Role: {role.charAt(0).toUpperCase() + role.substring(1).toLowerCase()}<br/>
                    Created on: {moment(created).format('DD.MM.YYYY HH:mm:ss')}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ActiveUser;