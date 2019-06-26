import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext'
import {LinkContainer} from 'react-router-bootstrap';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

function Navigation(props){
    const context = useContext(AuthContext);
    function signOut(){
        props.history.push("/");
        context.authenticate("");
        sessionStorage.clear();
    };

    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Taskette</Navbar.Brand>
            <Nav className="mr-auto">
                <LinkContainer to={"/"}>
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                {context.authentication.role === "ADMIN" &&
                    <>
                    <LinkContainer to={"/users"}>
                        <Nav.Link>Users</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={"/projects"}>
                        <Nav.Link>Projects</Nav.Link>
                    </LinkContainer>
                    </>
                }
                {context.authentication.role === "MANAGER" &&
                    <>
                        <LinkContainer to={"/mytasks"}>
                            <Nav.Link>Tasks</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/projects"}>
                            <Nav.Link>Projects</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/sprints"}>
                            <Nav.Link>Sprints</Nav.Link>
                        </LinkContainer>
                    </>
                }
                {context.authentication.role === "EMPLOYEE" &&
                <>
                    <LinkContainer to={"/mytasks"}>
                        <Nav.Link>Tasks</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={"/projects"}>
                        <Nav.Link>Projects</Nav.Link>
                    </LinkContainer>
                </>
                }
            </Nav>
            <Nav className="ml-auto">
                <NavDropdown title={context.authentication.email}>
                    <NavDropdown.Item onClick={signOut}>Sign out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>)
}

export default Navigation;

