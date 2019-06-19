import React, {useContext, useEffect, useState} from 'react';

import './App.css';
import SignIn from './components/SignIn'
import Users from './components/Users'
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import AuthContext from './context/AuthContext'
import Navigation from './components/Navigation'
import MainLayout from './components/MainLayout'


function App() {

    const context = useContext(AuthContext);
    const [authentication, setAuth] = useState({
        loggedIn: false,
        token: ""
    });

    function PrivateRoute({component: Component, ...rest}) {
        return (
            <Route
                {...rest}
                render={props =>
                    authentication.loggedIn ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {from: props.location}
                            }}
                        />
                    )
                }
            />

        )
    }

    return (
        <AuthContext.Provider
            value={{
                authentication,
                authenticate: (loggedIn, token, email, level, _id) => {
                    setAuth({loggedIn: loggedIn, token: token, email: email, level: level, _id: _id})
                }
            }}>
            <Router>
                {authentication.loggedIn ?
                    <div className="App">
                        <Navigation/>
                        <Route path="/" component={MainLayout}/>
                    </div>
                    :
                    <SignIn/>
                }
            </Router>
        </AuthContext.Provider>

    );
}

export default App;
