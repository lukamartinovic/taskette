import React, {useContext, useState} from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

function SignIn(props){
    const context = useContext(AuthContext);
    const [authState, setAuth] = useState({email:"", password:"", error: false});

    const handleInput = (e) => {
        const newState = e.target.id === "email" ? {email: e.target.value}:{password: e.target.value};
        setAuth(Object.assign(authState, newState));
    };

    const handleLogin = (e) => {
        axios.post('http://localhost:3000/user/login', {email: authState.email, password: authState.password})
            .then((res) => {
                context.authenticate(true, res.data, authState.email);
                console.log(res, context)
                props.history.push('/')
            })
            .catch((err) => {console.log(err)})
    };

    return(<div>
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
    </div>)
}

export default SignIn;

