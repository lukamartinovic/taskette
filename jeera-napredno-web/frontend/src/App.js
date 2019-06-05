import React from 'react';
import './App.css';
import SignIn from './components/SignIn'
import Users from './components/Users'
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
      <Router>
          <div className="App">
              <Route path="/users" component={Users}/>
              <Route path="/login" component={SignIn}/>
          </div>
      </Router>

  );
}

export default App;
