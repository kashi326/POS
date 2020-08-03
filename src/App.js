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
import SalesView from './pages/Sales/View';
import Setting from './pages/Setting/Setting';
import ViewAdmin from './pages/Setting/ViewAdmin';

function App() {
  const navigation = [
    {
      component: <Home />,
      path: "/home"
    },
    {
      component: <About />,
      path: "/about"
    },
    {
      component: <Inventory />,
      path: "/inventory"
    },
    {
      component: <AddtoInventory />,
      path: '/inventory/add'
    },
    {
      component: <Purchase />,
      path: '/purchase'
    },
    {
      component: <Addpurchase />,
      path: '/purchase/add'
    },
    {
      component: <PurchaseView />,
      path: '/purchase/view/:id'
    },
    {
      component: <Sales />,
      path: '/sales'
    },
    {
      component: <AddSales />,
      path: '/sales/add'
    },
    {
      component: <SalesView />,
      path: '/sales/view/:id'
    },
    {
      component: <CustomersList />,
      path: '/customers'
    },
    {
      component: <AddCustomer />,
      path: '/customers/add'
    },
    {
      component: <Setting />,
      path: '/setting'
    },
    {
      component: <ViewAdmin />,
      path: '/admin'
    }
  ]
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        {navigation.map((ele,idx) =>
          <Route path={ele.path} exact key={idx}><Sidebar component={ele.component} /></Route>
        )}
      </Switch>
    </Router>
  );
}

export default App;
