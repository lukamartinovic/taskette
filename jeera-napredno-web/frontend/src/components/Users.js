import React, {useContext, useState, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import api from '../api/api';
import AuthContext from '../context/AuthContext';
import {Col, Row, Card, FormControl, Button, Form, InputGroup, ListGroup} from "react-bootstrap";
import {User, ActiveUser, AddUser} from './'
import Fuse from 'fuse.js';

function Users(props){

    const context = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState ("");
    const [activeUser, setActiveUserState] = useState(false);
    const [addUser, setAddUser] = useState(false);

    useEffect(
        ()=>{
            api.getUsers(context.authentication.token,
                (res) => {
                    setUsers(res.data)
                })
        }, []
    );

    function handleShowAddUser(){
        setAddUser(true);
    }

    function handleCloseAddUser(){
        setAddUser(false);
    }


    function setActiveUser(_id){
        setActiveUserState(_id)
    }

    function returnActiveUser(){
        const user = users.find((user) => {return user._id === activeUser});
        return user;
    }

    function userSearch(searchTerm){
        let fuse = new Fuse
        (users, {keys:["email"]});
        return(fuse.search(searchTerm));
    }

    function returnUsers() {
        let userList = [];
        userList = search === "" ? users : userSearch(search);
        return(
            userList.map(
            user => {
                return user._id === activeUser ?
                    <User active setActiveUser={setActiveUser} user={user} key={user._id}/>
                    :
                    <User setActiveUser={setActiveUser} user={user} key={user._id}/>})
        )
    }

    function UsersPanel(){
        return <Card>
            <Card.Header>
                <Form inline>
                    <InputGroup style={{width:"100%"}}>
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
                    <ListGroup.Item style={{backgroundColor:"#f7f7f7"}} action onClick={()=>{setAddUser(true)}}>
                        Add user
                    </ListGroup.Item>
                {returnUsers()}
            </Card.Body>
        </Card>
    }

    return(
        <>
            <AddUser show={addUser} handleClose={handleCloseAddUser}/>
            <Container>
            <Row>
                <Col md={4}>
                    {UsersPanel()}
                </Col>
                <Col md={8}>
                    {activeUser ?
                        <ActiveUser user={returnActiveUser()}/>
                        :
                        <></>}
                </Col>
            </Row>
        </Container>
        </>

    )
}

export default Users;