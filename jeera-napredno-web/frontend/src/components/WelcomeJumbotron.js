import React, {useContext} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {AuthContext} from '../context'

function WelcomeJumbotron(props){

    const context = useContext(AuthContext).authentication;

    function returnWelcomeString(role){
        if(context.role === "ADMIN")
            return "Welcome to Taskette. As an administrator you can manage users, create projects and define sprints.";
        if(context.role === "MANAGER")
            return "Welcome to Taskette. As a manager you can manage tasks for you and your employess.";
        if(context.role === "EMPLOYEE")
            return "Welcome to Taskette. As an employee you can view your tasks and change their status.";
    }

    return(
        <Jumbotron>
        <h1>Hello!</h1>
        <h5>
            {returnWelcomeString(context.role)}
        </h5>
    </Jumbotron>)
};

export default WelcomeJumbotron;