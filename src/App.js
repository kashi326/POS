import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import Sidebar from './layouts/Sidebar';
import Inventory from './pages/Inventory/Inventory';
import AddtoInventory from './pages/Inventory/AddtoInventory';
import Sales from './pages/Sales/Sales';
import AddSales from './pages/Sales/Add';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home"><Sidebar component={<Home />} /></Route>
        <Route path="/about"><Sidebar component={<About />} /></Route>
        <Route path="/inventory" exact><Sidebar component={<Inventory />} /></Route>
        <Route path="/inventory/add"><Sidebar component={<AddtoInventory />} /></Route>
        <Route path="/sales" exact><Sidebar component={<Sales />} /></Route>
        <Route path="/sales/add" exact><Sidebar component={<AddSales />} /></Route>
      </Switch>
    </Router>
  );
}

export default App;
