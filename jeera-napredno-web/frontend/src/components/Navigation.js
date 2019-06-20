import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext'
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button, Navbar, Nav, FormControl, NavDropdown} from "react-bootstrap";
import {Link} from 'react-router-dom'
import NavItem from "react-bootstrap/NavItem";

function Navigation(props){
    const context = useContext(AuthContext);
    const [auth, setAuth] = useState(context);

    return(
        <Navbar bg="light" variant="light">
            <Navbar.Brand>Jeera</Navbar.Brand>
            <Nav className="mr-auto">
                <LinkContainer to={"/"}>
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/tasks"}>
                    <Nav.Link>Tasks</Nav.Link>
                </LinkContainer>
            </Nav>
            <Nav className="ml-auto">
                <NavDropdown title={context.authentication.email}>
                    <LinkContainer to={"/signout"}>
                        <NavDropdown.Item>Sign out</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider /><LinkContainer to={"/settings"}>
                    <NavDropdown.Item>Settings</NavDropdown.Item>
                </LinkContainer>
                </NavDropdown>
            </Nav>
        </Navbar>)
}

export default Navigation;

