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
import Purchase from './pages/purchase/purchase';
import Addpurchase from './pages/purchase/addPurchase';
import PurchaseView from './pages/purchase/View';
import CustomersList from './pages/customers/index';
import AddCustomer from './pages/customers/add';
import ExpenseList from './pages/expenses/index';
import AddExpense from './pages/expenses/add';


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
        <Route path="/purchase" exact><Sidebar component={<Purchase />} /></Route>
        <Route path="/purchase/view/:id" exact><Sidebar component={<PurchaseView />} /></Route>
        <Route path="/purchase/add" exact><Sidebar component={<Addpurchase />} /></Route>
        <Route path="/customers" exact><Sidebar component={<CustomersList />} /></Route>
        <Route path="/customers/add" exact><Sidebar component={<AddCustomer />} /></Route>
        <Route path="/expenses" exact><Sidebar component={<ExpenseList />} /></Route>
        <Route path="/expenses/add" exact><Sidebar component={<AddExpense />} /></Route>
      </Switch>
    </Router>
  );
}

export default App;
