import React, {useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {Alert, Button, Card, Container, Form} from 'react-bootstrap';
import api from '../api/api';

function SignIn(props){
    const context = useContext(AuthContext);
    const [authState, setAuth] = useState({email:"", password:"", error: false});
    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        const newState = e.target.id === "email" ? {email: e.target.value}:{password: e.target.value};
        setAuth(Object.assign(authState, newState));
    };

    const handleLogin = (e) => {
        setLoading(true);
        api.login(
            authState.email,
            authState.password,
            (res) => {
                const {level, _id, email, role, token} = res.data;
                context.authenticate(true, token, email, level, _id, role);
            },
            (err) => {
                setAuth({...authState, error:true});
                setLoading(false);
            }
        );
    };
    if(!context.loggedIn)
    return(
        <Container style={{ width: '22rem', marginTop: '3em'}}>
        <Card style={{padding:"1em"}}>
            <Form>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={handleInput} id="email" type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleInput} id="password" type="password" placeholder="Password" />
                </Form.Group>
                {authState.error &&
                    <Alert variant="danger">
                    Incorrect email or password
                    </Alert>}
                <Button disabled={loading} block onClick={handleLogin} variant="primary">
                    Sign in
                </Button>
            </Form>
        </Card>
        </Container>
    );
    return(
        <Redirect to="/"/>
    )
}

export default SignIn;

