import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext'
import { LinkContainer } from 'react-router-bootstrap';
import {Navbar, Nav, NavDropdown} from "react-bootstrap";

function Navigation(props){
    const context = useContext(AuthContext);

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
                {context.authentication.role === "ADMIN" ?
                    <LinkContainer to={"/users"}>
                        <Nav.Link>Users</Nav.Link>
                    </LinkContainer>:
                    <></>
                }
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

