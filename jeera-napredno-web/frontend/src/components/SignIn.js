import React, {useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import {Form, Button, Card, Container} from 'react-bootstrap';
import api from '../api/api';

function SignIn(props){
    const context = useContext(AuthContext);
    const [authState, setAuth] = useState({email:"", password:"", error: false});

    const handleInput = (e) => {
        const newState = e.target.id === "email" ? {email: e.target.value}:{password: e.target.value};
        setAuth(Object.assign(authState, newState));
    };

    const handleLogin = (e) => {
        api.login(
            authState.email,
            authState.password,
            (res) => {context.authenticate(true, res.data.token, res.data.email, res.data.level, res.data._id)}
        );
    };
    if(!context.loggedIn)
    return(
        <Container style={{ width: '22rem', marginTop: '3em'}}>
        <Card style={{padding:"1em"}}>
            <Form>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handleInput} id="email" type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group>
                    <Form.Label >Password</Form.Label>
                    <Form.Control onChange={handleInput} id="password" type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={handleLogin} variant="primary">
                    Submit
                </Button>
            </Form>
        </Card>
        </Container>
    )
    return(
        <Redirect to="/"/>
    )
}

export default SignIn;

