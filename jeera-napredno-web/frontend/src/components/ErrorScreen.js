import React from 'react';
import {Container, Jumbotron} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";

function ErrorScreen(props){
    return <Jumbotron>
        <Container className="text-center">
            <h1>{props.error} <span><FontAwesomeIcon size="sm" icon={faExclamationCircle}/></span></h1>
            <p>
                {props.error === 404 && "Not found"}
                {props.error === 401 && "Unauthorized"}
            </p>
        </Container>
    </Jumbotron>
}

export default ErrorScreen;