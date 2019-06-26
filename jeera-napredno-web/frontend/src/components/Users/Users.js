import React, {useContext, useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import api from '../../api/api';
import AuthContext from '../../context/AuthContext';
import {Card, Pagination} from "react-bootstrap";
import {AddUser, UserSearch, UserTable} from '../index'
import {Route} from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

function Users(props){

    const authContext = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState();
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);

    const pageSize = 12;
    const delay = 300;

    useEffect(
        () => {
            //didCancel flag prevents memory leaks by canceling async functions if the component is unmounted before they are finished executing
            let didCancel = false;
            !didCancel && setLoading(true);
            !searching && !didCancel && api.getUsers(authContext.authentication.token, pageSize, page,
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
        }, [authContext.authentication.token, page, pageSize, searching]
    );

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

    function UsersPanel(){
        return(
        <Card size="sm" className="text-center" >
            <Card.Header>{props.search &&
            <UserSearch addUserButton history={props.history} searching={searching} setSearching={(s)=>{setSearching(s); console.log(searching, s)}} setUsers={(users)=>{setUsers(users)}} pageSize={pageSize} setLoading={(l)=>{setLoading(l)}}/>}
            </Card.Header>
            <Card.Body style={{height:`${pageSize*2.33}rem`, padding:"0"}}>
                {loading ? <LoadingSpinner delay={delay} loading={loading}/> : <UserTable checkedUsers={props.checkedUsers} handleChangeUsers={props.handleChangeUsers} selectUsers={props.selectUsers} users={users}/>}
            </Card.Body >
            <Card.Footer>
               { renderPagination()}
            </Card.Footer>
        </Card>)
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