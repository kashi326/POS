import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './component/Login';
import Home from './component/Home';


function App() {
  
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login}/> 
        <Route path="/home" component={Home}/> 
      </Switch>
    </Router>
  );
}

export default App;
