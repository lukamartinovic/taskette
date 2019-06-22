import React, {useContext, useState, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import api from '../../api/api';
import AuthContext from '../../context/AuthContext';
import {Col, Row, Card, Table, FormControl, Button, Form, InputGroup, ListGroup, Pagination} from "react-bootstrap";
import {User, ActiveUser, AddUser, UserTable} from '../index'
import Fuse from 'fuse.js';
import {Route} from "react-router-dom";

function Users(props){

    const context = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState ("");
    const [activeUser, setActiveUserState] = useState(false);

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
        return <Card className="text-center">
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
                            <InputGroup.Text style={{cursor:"pointer"}} onClick={()=>{props.history.push("/users/createUser")}}>Add user</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </Card.Header>
            <UserTable users={returnUsers()}/>
            <Card.Footer>

            </Card.Footer>
        </Card>
    }

    return(
        <>
            <Route path="/users/createUser" component={AddUser}/>
            <Container>
                    {UsersPanel()}
            </Container>
            </>

    )
}

export default Users;