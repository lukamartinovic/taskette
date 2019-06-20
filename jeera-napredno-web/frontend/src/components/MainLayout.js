import React, {useContext, useState, useEffect} from 'react';
import AuthContext from '../context/AuthContext'
import {Container, Row, Col} from 'react-bootstrap'
import Tasks from "./Tasks";
import {Route} from 'react-router-dom'

function MainLayout(){
    const context = useContext(AuthContext);
    return(
        <Container style={{height:"1000px", marginTop:"1em"}}>
            <Route path={"/tasks"} component={Tasks}/>
        </Container>
    )
}

export default MainLayout;