import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './component/Login';
import Home from './component/Home';
import About from './component/About';
import Sidebar from './component/Layout/Sidebar';
function App() {
  return (

    <Router>
      <Switch>
        <Route path="/" exact component={Login} />

        <Route path="/home"><Sidebar component={<Home />} /></Route>
        <Route path="/about"><Sidebar component={<About />} /></Route>
      </Switch>
    </Router>
  );
}

export default App;
