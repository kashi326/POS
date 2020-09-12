import React, { useState, useEffect } from 'react';
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
import Backup from './pages/Setting/Backup';
import Setup from './pages/Setup';
import RestoreBackup from './pages/Setting/RestoreBackup';
import * as Database from './services/datastore2';
import Expense from './pages/expenses/Expense';
import AddExpense from './pages/expenses/add';


function App() {
  async function initDB() {
    const db = await Database.get();
    const setting = await db.setting.findOne().exec();
    const user = await db.user.findOne().exec();
    if (setting === null || user === null)
      setisAppSetuped(false);
  }
  useEffect(() => {
    initDB();
  }, []);
  const [isAppSetuped, setisAppSetuped] = useState(true);
  const navigation = [
    {
      component: <Login />,
      path: "/login"
    },
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
    },
    {
      component: <Backup />,
      path: '/backup'
    },
    {
      component: <RestoreBackup />,
      path: '/restorebackup'
    },
    {
      component:<Expense />,
      path:'/expense'
    },{
      component:<AddExpense />,
      path:'/expense/add'
    }
  ]
  return (
    <Router>
      {isAppSetuped ?
        <Switch>
          <Route path="/" exact component={Login} />
          {navigation.map((ele, idx) =>
            <Route path={ele.path} exact key={idx}><Sidebar component={ele.component} /></Route>
          )}
        </Switch>
        :
        <Switch>
          <Route path="/" exact component={Setup} />
        </Switch>
      }
    </Router>
  );
}

export default App;
