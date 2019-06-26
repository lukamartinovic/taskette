import React, {useContext} from 'react';
import {Container} from 'react-bootstrap'
import {MyTasks, Projects, Sprints, Tasks, Users, WelcomeJumbotron} from './'
import {Route, Switch} from 'react-router-dom'
import {AuthContext} from '../context';
import ErrorScreen from "./ErrorScreen";
import ProjectsAdministration from "./Projects/ProjectsAdministration";

//TODO: remake all routing and authorization related code

function MainLayout(){
    const role = useContext(AuthContext).authentication.role;

    return(
        <Container style={{height:"1000px", marginTop:"1em"}}>
            <Switch>
                <Route exact path="/" render={(props)=>{return <WelcomeJumbotron {...props} search/>}}/>
                <Route path="/tasks" component={Tasks}>
                    <Switch>
                    <Route exact path="/tasks/" component={Tasks}/>
                    <Route exact path="/tasks/:id" component={Tasks}/>
                    <Route path="/tasks/*" render={()=>{return <ErrorScreen error={404}/>}}/>
                    </Switch>
                </Route>
                <Route path="/users" render={(props)=>{return role === "ADMIN" ? <Users {...props} search/> : <ErrorScreen error={401}/>}}/>
                <Route path="/mytasks" render={(props)=>{return <MyTasks {...props} search/>}}/>
                <Route path="/sprints" render={(props)=>{return role === "MANAGER" ? <Sprints {...props} search/> : <ErrorScreen error={401}/>}}/>
                <Route path="/projects" render={(props)=>{
                    if(role === "ADMIN"){
                    return <ProjectsAdministration {...props} search/>}
                    if(role === "MANAGER")
                    return <Projects {...props} search/>
                    if(role === "EMPLOYEE")
                        return <Projects {...props} search/>}}/>
                <Route render={()=>{return <ErrorScreen error={404}/>}}/>
            </Switch>
        </Container>
    )
}

export default MainLayout;