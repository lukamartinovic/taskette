import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import FormControl from 'react-bootstrap/FormControl'

function Navigation(props){
    const context = useContext(AuthContext);
    const [auth, setAuth] = useState(context);
    function searchBar(){
        if(context.loggedIn)
            return(
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                    <span>{context.email}</span>
                </Form>
            )
    }

    return(
        <Navbar sticky="top" bg="light" variant="light">
        <Navbar.Brand href="#home">Jeera</Navbar.Brand>
            {context.authentication.email}
        <Nav className="mr-auto">
        </Nav>

    </Navbar>)
}

export default Navigation;

