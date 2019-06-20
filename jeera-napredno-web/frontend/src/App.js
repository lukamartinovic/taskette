import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Navigation, MainLayout, SignIn} from "./components";
import AuthContext from './context/AuthContext'

function App() {
    const [authentication, setAuth] = useState({
        loggedIn: false,
        token: ""
    });

    return (
        <AuthContext.Provider
            value={{
                authentication,
                authenticate: (loggedIn, token, email, level, _id, role) => {
                    setAuth({loggedIn: loggedIn, token: token, email: email, level: level, _id: _id, role: role})
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
