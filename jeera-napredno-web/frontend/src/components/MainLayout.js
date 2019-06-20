import React from 'react';
import {Container} from 'react-bootstrap'
import {Tasks, Users} from './'
import {Route} from 'react-router-dom'

function MainLayout(){
    return(
        <Container style={{height:"1000px", marginTop:"1em"}}>
            <Route path={"/tasks"} component={Tasks}/>
            <Route path={"/users"} component={Users}/>
        </Container>
    )
}

export default MainLayout;