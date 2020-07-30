import React, { useState, useEffect } from 'react';
import { makeStyles, Button, Toolbar, Paper } from '@material-ui/core';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Textfield from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import TitleHead from '../../component/TitleHead';
import * as Database from '../../services/datastore2';
import Editable from '../../component/Editable';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  toolbarSearch: {
    flex: '1 1 100%'
  },
  toolbarActions: {
    whiteSpace: 'nowrap'
  }
}));

function Inventory() {
  async function initDB() {
    const db = await Database.get();
    const invenData = await db.inventory.find().exec();
    setFilteredData(invenData);
    setrowsData(invenData);
  };
  useEffect(() => {
    initDB();
  }, []);
  async function removeCustomer(_id) {
    const db = await Database.get();
    const doc = await db.inventory.findOne({
      selector: {
        _id: { $eq: _id }
      }
    }).exec();
    console.log(doc);
    doc.remove();
    const invenData = await db.inventory.find().exec();
    setrowsData(invenData);
    setFilteredData(invenData);
  }

  function searchHandler(e) {
    let value = e.target.value;
    setSearchValue(value);
    setFilteredData(rowsData.filter(v => v.productName.toLowerCase().includes(value.toLowerCase())));
  }

  function clearHandler() {
    setFilteredData(rowsData);
  }
  async function updateQuantity(id, changedValue) {
    const db = await Database.get();
    const toUpdate = await db.inventory.findOne({
      selector: {
        _id: { $eq: id }
      }
    }).exec();
    setTimeout(() => {
      if (toUpdate !== null) {
        toUpdate.update({
          $inc: {
            quantity: changedValue
          }
        });
        initDB();
        setupdateSuccess(true);
      } else {
        alert('cannot update value');
      }
    }, 100);

  }
  async function updateSalePrice(id, changedValue) {
    const db = await Database.get();
    const toUpdate = await db.inventory.findOne({
      selector: {
        _id: { $eq: id }
      }
    }).exec();
    console.log(toUpdate)
    setTimeout(() => {
      if (toUpdate !== null) {
        toUpdate.update({
          $inc: {
            salePrice: changedValue
          }
        });
        initDB();
        setupdateSuccess(true);
      } else {
        alert('cannot update value');
      }
    }, 100);

  }
  const [rowsData, setrowsData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(rowsData);
  const [updateSuccess, setupdateSuccess] = useState(false);
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <TitleHead name="Inventory" />
      {
        updateSuccess ? <Typography align="center" variant="h6" component="h6" style={{ color: 'green' }}>Update successfull</Typography>
          : ''
      }
      <Toolbar>
        <div className={classes.toolbarSearch}>
          <Textfield
            label="search"
            variant="standard"
            value={searchValue}
            onChange={searchHandler}
          />
          <Button onClick={clearHandler} size="medium" variant="contained" color="primary" >
            Clear
                    </Button>
        </div>
        <div className={classes.toolbarActions}>
          <Link to="/inventory/add">
            <Button variant="contained" color="primary">Add to Inventory</Button>
          </Link>
        </div>
      </Toolbar>
      <TableContainer>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="center">Serial Number</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="center">Retail Price</TableCell>
              <TableCell align="center">Sale Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="center">{row.productName}</TableCell>
                <TableCell align="center">{row.serialNumber}</TableCell>
                <Editable id={row._id} value={row.quantity} updateData={updateQuantity} />
                <TableCell align="center">{row.retailPrice}</TableCell>
                <Editable id={row._id} value={row.salePrice} updateData={updateSalePrice} />
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
export default Inventory;