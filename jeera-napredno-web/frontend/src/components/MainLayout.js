import React from 'react';
import {Container} from 'react-bootstrap'
import {MyTasks, NotFound, Projects, Sprints, Tasks, Users, WelcomeJumbotron} from './'
import {Route, Switch} from 'react-router-dom'


function MainLayout(){
    return(
        <Container style={{height:"1000px", marginTop:"1em"}}>
            <Switch>
                <Route exact path="/" render={(props)=>{return <WelcomeJumbotron {...props} search/>}}/>
                <Route path="/tasks" component={Tasks}>
                    <Switch>
                    <Route exact path="/tasks/" component={Tasks}/>
                    <Route exact path="/tasks/:id" component={Tasks}/>
                    <Route path="/tasks/*" render={()=>{return <NotFound error={404}/>}}/>
                    </Switch>
                </Route>
                <Route path="/users" render={(props)=>{return <Users {...props} search/>}}/>
                <Route path="/mytasks" render={(props)=>{return <MyTasks {...props} search/>}}/>
                <Route path="/sprints" render={(props)=>{return <Sprints {...props} search/>}}/>
                <Route path="/projects" render={(props)=>{return <Projects {...props} search/>}}/>
                <Route render={()=>{return <NotFound error={404}/>}}/>
            </Switch>
        </Container>
    )
}

export default MainLayout;