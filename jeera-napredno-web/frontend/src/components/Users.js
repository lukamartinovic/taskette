import React, {useContext, useState, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import api from '../api/api';
import AuthContext from '../context/AuthContext';
import {Col, Row, Card, Table, FormControl, Button, Form, InputGroup, ListGroup} from "react-bootstrap";
import {User, ActiveUser, AddUser, UserTable} from './'
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
                    let fetchedUsers = res.data;
                    fetchedUsers.forEach((user, index) => user.index = index);
                    setUsers(fetchedUsers)
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
        return userList
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
                        <InputGroup.Append>
                            <InputGroup.Text style={{cursor:"pointer"}} onClick={()=>{setAddUser(true)}}>Add user</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </Card.Header>
            <UserTable users={returnUsers()}/>
        </Card>
    }

    return(
        <>
            <AddUser show={addUser} handleClose={handleCloseAddUser}/>
            <Container>
                    {UsersPanel()}
        </Container>
        </>

    )
}

export default Users;