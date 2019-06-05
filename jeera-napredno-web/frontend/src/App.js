import React, {useContext, useState}  from 'react';

import './App.css';
import SignIn from './components/SignIn'
import Users from './components/Users'
import {BrowserRouter as Router, Route} from "react-router-dom";
import AuthContext from './context/AuthContext'

function App() {

    const context = useContext(AuthContext);
    const [authentication, setAuth] = useState({
        loggedIn: false,
        token: "",
        authenticate: (loggedIn, token) => {
            setAuth(
                Object.assign(authentication, {loggedIn: loggedIn, token: token})
            )
        }
    });

  return (
      <AuthContext.Provider value={authentication}>
          <Router>
              <div className="App">
                  <Route path="/users" component={Users}/>
                  <Route path="/login" component={SignIn}/>
                  <button onClick={() => {console.log(context)}}>F</button>
              </div>
          </Router>
      </AuthContext.Provider>

  );
}

export default App;
