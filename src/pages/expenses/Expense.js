import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as Database from '../../services/datastore2';
import { Toolbar, Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import Textfield from '@material-ui/core/TextField';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  toolbarSearch: {
    flex: '1 1 100%'
  },
  toolbarActions: {
    whiteSpace: 'nowrap'
  },
  TableHead: {
    fontWeight: '600 '
  }
  
});

export default function Expense() {
  const classes = useStyles();
  const [expenses, setExpenses] = useState([]);

  async function initDB() {
    const db = await Database.get();
    // not include
    // await db.remove();
    // db.heroes.insert({ name: 'test hero' + Math.random(), color: 'red' });
    // db.customers.insert({ customerName: 'Zulfiqar' });
    // not include
    const eData = await db.expenses.find().exec();
    setExpenses(eData);
    setFilteredData(eData);
  };
  useEffect(() => {
    initDB();
  }, []);

  async function removeCustomer(_id) {
    const db = await Database.get();
    const doc = await db.expenses.findOne({
      selector: {
        _id: { $eq: _id }
      }
    }).exec();
    console.log(doc);
    doc.remove();
    const cData = await db.expenses.find().exec();
    setExpenses(cData);
    setFilteredData(cData);
  }
  function searchHandler(e) {
    let value = e.target.value;
    setSearchValue(value);
    setFilteredData(expenses.filter(v => v.ExpenseName.toLowerCase().includes(value.toLowerCase())));
  }

  function clearHandler(e) {
    console.log('called');
    setSearchValue("");
    setFilteredData(expenses);
  }
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(expenses);

  return (
    <Paper>
      <Toolbar>
        <div className={classes.toolbarSearch}>
          <Textfield
            label="search"
            variant="standard"
            value={searchValue}
            onChange={searchHandler}
          />
          <Button onClick={clearHandler} variant="contained" color="primary" >
            Clear
                </Button>
        </div>
        <div className={classes.toolbarActions}>
          <Link to="/expenses/add">
            <Button variant="contained" color="primary">Add Expense</Button>
          </Link>
        </div>
      </Toolbar>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Expense name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Expense Date</TableCell>
              <TableCell align="right">Paid to</TableCell>
              {/* <TableCell align="right">Credit</TableCell>
              <TableCell align="right">Debit</TableCell> */}
              {/* <TableCell></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.ExpenseName}</TableCell>
                <TableCell>{row.Amount}</TableCell>
                <TableCell>{row.ExpenseDate}</TableCell>
                <TableCell align="right">{row.PaidTo}</TableCell>
                {/* <TableCell align="right">{row.creditAmount}</TableCell>
                <TableCell align="right">{row.debitAmount}</TableCell> */}
                <TableCell>
                  <IconButton onClick={() => removeCustomer(row._id)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
} 