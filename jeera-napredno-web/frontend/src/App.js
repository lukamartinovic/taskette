import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {MainLayout, Navigation, SignIn} from "./components";
import AuthContext from './context/AuthContext'
import api from './api/api';
import LoadingSpinner from "./components/LoadingSpinner";


function App() {
    const [authentication, setAuth] = useState("");

    const contextValue = {
        authentication,
        authenticate: (loggedIn, token, email, level, _id, role) => {
            const authentication = {loggedIn: loggedIn, token: token, email: email, level: level, _id: _id, role: role}
            setAuth(authentication);
            sessionStorage.setItem("JWT", JSON.stringify(authentication.token))
        }
    };

    useEffect(()=>{
        const storedToken = JSON.parse(sessionStorage.getItem("JWT"))
        storedToken ? api.validateToken(
            storedToken,
            (res) => {
                const {level, role, email, id} = res.data;
                setAuth({loggedIn: true, token: storedToken, email: email, level: level, _id: id, role:role})
            },
            (err) => {setAuth(true)}
        ) : setAuth(true);

    }, []);



    return (authentication ?
        <AuthContext.Provider value={contextValue}>
            <Router>
                    <Route path="/"
                    render={routeProps=>{
                        return authentication.loggedIn ? <><Navigation {...routeProps}/><MainLayout {...routeProps}/></> : <SignIn/>
                    }}
                />
            </Router>
        </AuthContext.Provider>
            :
            <div style={{position:"absolute", left:"50%", top: "50%", transform:"translate(-50%,-50%)"}}><LoadingSpinner cog size="5x" delay={0} loading={authentication}/></div>
    );
}

export default App;
