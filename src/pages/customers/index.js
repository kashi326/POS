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
  }
});

export default function SimpleTable() {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);

  async function initDB() {
    const db = await Database.get();
    // await db.remove();
    // db.heroes.insert({ name: 'test hero' + Math.random(), color: 'red' });
    // db.customers.insert({ customerName: 'Zulfiqar' });
    const cData = await db.customers.find().exec();
    setCustomers(cData);
    setFilteredData(cData);
  };
  useEffect(() => {
    initDB();
  }, []);

  async function removeCustomer(_id) {
    const db = await Database.get();
    const doc = await db.customers.findOne({
      selector: {
        _id: { $eq: _id }
      }
    }).exec();
    doc.remove();
    const cData = await db.customers.find().exec();
    setCustomers(cData);
    setFilteredData(cData);
  }
  function searchHandler(e) {
    let value = e.target.value;
    setSearchValue(value);
    setFilteredData(customers.filter(v => v.customerName.toLowerCase().includes(value.toLowerCase())));
  }

  function clearHandler(e) {
    setSearchValue("");
    setFilteredData(customers);
  }
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(customers);

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
          <Link to="/customers/add">
            <Button variant="contained" color="primary">Add Customer</Button>
          </Link>
        </div>
      </Toolbar>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right">Starting Balance</TableCell>
              <TableCell align="right">Credit</TableCell>
              <TableCell align="right">Debit</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.customerAddress}</TableCell>
                <TableCell>{row.customerPhone}</TableCell>
                <TableCell align="right">{row.startingBalance}</TableCell>
                <TableCell align="right">{row.creditAmount}</TableCell>
                <TableCell align="right">{row.debitAmount}</TableCell>
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