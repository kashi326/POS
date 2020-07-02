import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './component/Login';
import Home from './component/Home';
import About from './component/About';
import Sidebar from './component/Layout/Sidebar';
import Inventory from './component/Inventory/Inventory';
import AddinInventory from './component/Inventory/AddinInventory';
import Sales from './component/Sales/Sales';
function App() {
  return (

    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home"><Sidebar component={<Home />} /></Route>
        <Route path="/about"><Sidebar component={<About />} /></Route>
        <Route path="/inventory" exact><Sidebar component={<Inventory />} /></Route>
        <Route path="/inventory/add"><Sidebar component={<AddinInventory />} /></Route>
        <Route path="/sales" exact><Sidebar component={<Sales />} /></Route>
      </Switch>
    </Router>
  );
}

export default App;
