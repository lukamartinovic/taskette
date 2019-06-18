import React, {useContext, useEffect, useState} from 'react';

import './App.css';
import SignIn from './components/SignIn'
import Users from './components/Users'
import {BrowserRouter as Router, Route} from "react-router-dom";
import AuthContext from './context/AuthContext'
import Navigation from './components/Navigation'

function App() {

    const context = useContext(AuthContext);
    const [authentication, setAuth] = useState({
        loggedIn: false,
        token: ""
    });
    useEffect(() => console.log('mounted or updated'));
  return (
      <AuthContext.Provider
          value={{authentication,
          authenticate: (loggedIn, token, email) => {
          setAuth({loggedIn: loggedIn, token: token, email: email})
      }}}>
          <Router>
              <div className="App">
                  <Navigation/>
                  <Route path="/users" component={Users}/>
                  <Route path="/login" component={SignIn}/>
              </div>
          </Router>
      </AuthContext.Provider>

  );
}

export default App;
