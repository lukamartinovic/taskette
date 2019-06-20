import React, {useContext, useState, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import api from '../api/api';
import AuthContext from '../context/AuthContext';
import {Col, Row, Card, FormControl, Button, Form, InputGroup} from "react-bootstrap";
import {User} from './'
import Fuse from 'fuse.js';

function Users(props){

    const context = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState ("");
    const [activeUser, setActiveUser] = useState("");

    useEffect(
        ()=>{
            api.getUsers(context.authentication.token,
                (res) => {
                    setUsers(res.data)
                })
        }
    );

    function userSearch(searchTerm){
        let fuse = new Fuse
        (users, {keys:["email"]});
        return(fuse.search(searchTerm));
    }

    function returnUsers() {
        if(search === ""){
            return(
                users.map(user => <User user={user} key={user._id}/>)
            )
        }
        else{
            return(
                userSearch(search).map(user => <User user={user} key={user._id}/>)
            )
        }
    }

    return(

        <Container>
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Header>
                            <Form inline>
                                <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>🔍</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) => {setSearch(e.target.value)}}
                                />
                                </InputGroup>
                            </Form>
                        </Card.Header>
                        <Card.Body>
                            {returnUsers()}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                   2
                </Col>
            </Row>
        </Container>
    )
}

export default Users;