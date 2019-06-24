import React, {useContext, useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import api from '../../api/api';
import AuthContext from '../../context/AuthContext';
import {Card, Form, InputGroup, Pagination} from "react-bootstrap";
import {AddUser, UserTable} from '../index'
import Fuse from 'fuse.js';
import {Route} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../LoadingSpinner";

function Users(props){

    const authContext = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState ("");
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState();
    const [loading, setLoading] = useState(false);

    const pageSize = 12;
    const delay = 300;

    function renderPagination(){
        return(
            <div style={{width:"100%"}}>
            <Pagination style={{margin:"auto", width:"fit-content"}}>
                <Pagination.First onClick={()=>{setPage(1)}}></Pagination.First>
                <Pagination.Prev onClick={()=>{page > 1 && setPage(page-1)}}></Pagination.Prev>
                <Pagination.Item active>{page} / {pages || "..."}</Pagination.Item>
                <Pagination.Next onClick={()=>{page < pages && setPage(page+1)}}/>
                <Pagination.Last onClick={()=>{setPage(pages)}}></Pagination.Last>

            </Pagination>
            </div>
        )
    }

    useEffect(
        () => {
            let didCancel = false;
            setLoading(true);
            api.getUsers(authContext.authentication.token, pageSize, page,
                ({data: {users, count}}) => {
                    let fetchedUsers = users;
                    fetchedUsers.forEach((user, index) =>
                        user.index = index+1 + 10*(page-1)
                    );
                    !didCancel && setUsers(fetchedUsers);
                    !didCancel && setPages(Math.ceil(count/10));
                    !didCancel && setLoading(false);
                },
                (err) => {
                    console.log(err)
                })
            return () => {didCancel = true}
        }, [authContext.authentication.token, page, pageSize]
    );

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
        return <Card size="sm" className="text-center" >
            <Card.Header>
                <Form inline>
                    <InputGroup style={{width: "100%"}}>
                        <InputGroup.Prepend>
                            <InputGroup.Text><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text style={{cursor: "pointer"}} onClick={() => {
                                props.history.push("/users/createUser")
                            }}><FontAwesomeIcon icon={faUserPlus}/></InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </Card.Header>
            <Card.Body style={{height:`${pageSize*2.33}rem`, padding:"0"}}>
                {loading ? <LoadingSpinner delay={delay} loading={loading}/> : <UserTable users={returnUsers()}/>}
            </Card.Body >
            <Card.Footer>
               { renderPagination()}
            </Card.Footer>
        </Card>
    }

    return(
        <>
            <Route path="/users/createUser" render={(props)=>{return <AddUser {...props} setPage={()=>{setPage(1)}} authContext={authContext}/>}}/>
            <Container>
                    {UsersPanel()}
            </Container>
        </>

    )
}

export default Users;