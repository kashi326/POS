import React, { useState } from 'react';
import { TextField, Button, Table, Paper, makeStyles, TableHead, TableBody, TableRow, TableCell, Toolbar } from '@material-ui/core';
import { DeleteOutlineRounded } from '@material-ui/icons';
import TitleHead from '../../component/TitleHead';
import * as Database from '../../services/datastore2';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  input: {
    width: '50%',
    marginLeft: '25%',
    marginBottom: '5px'
  },
  addSection: {
    flex: '1 1 80%'
  },
  submitSection: {
    whiteSpace: 'nowrap'
  },
}));
function AddtoInventory() {
  const classes = useStyles();
  const [itemsInList, setItemsInList] = useState([]);
  const [ButtonDisabled, setButtonDisabled] = useState(false);
  let history = useHistory();
  let List = itemsInList;
  function AddInListHandler() {
    List.push({ productName: '', serialNumber: '', quantity: 0 });
    setItemsInList(List);
    setButtonDisabled(true);
  }
  function removeItem(index) {
    setButtonDisabled(false)
    let bList = [...List];
    bList.splice(index, 1);
    console.log(bList);
    setItemsInList(bList);
  }
  function cancelList() {
    setItemsInList([]);
  }
  function onChange(e, key, index) {
    setButtonDisabled(false)
    let bItems = [...List];
    if (key === 'quantity') {
      bItems[index][key] = Number(e.target.value);
    }
    else
      bItems[index][key] = e.target.value;
    setItemsInList(bItems);
  }
  async function submitForm() {
    if (validate()) {
      return;
    }
    const db = await Database.get();
    itemsInList.forEach(async item => {
      let invenProduct = await db.inventory.findOne({
        selector: {
          productName: { $eq: item.productName },
        }
      }).exec();
      if (invenProduct) {
        invenProduct.update({
          $inc: {
            quantity: item.quantity
          },
        });
      }
      else
        db.inventory.insert(item)
      invenProduct = "";  
    });
    history.push('/inventory');
  }
  function validate() {
    if (itemsInList.length === 0) {
      alert('Please add a product');
      return true;
    }
    let error = false;
    itemsInList.forEach((item, idx) => {
      if (item.productName === "") {
        alert('Product ' + (idx + 1) + ' Product Name is Empty')
        error = true;
      }
      else if (item.serialNumber === "") {
        alert('Product ' + (idx + 1) + ' Serial Number is Empty')
        error = true;
      }
      else if (item.quantity === 0) {
        alert('Product ' + (idx + 1) + ' Qauntity is Zero')
        error = true;
      }
    });
    return error;
  }
  return (
    <Paper className={classes.root}>
      <TitleHead name="Add to Inventory"></TitleHead>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell colSpan="3">Item Name</TableCell>
            <TableCell colSpan="3">Serial Number</TableCell>
            <TableCell colSpan="3">Quantity</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {List.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell colSpan="3">
                <TextField label="Item Name" type="text" onChange={(e) => onChange(e, 'productName', index)} value={item.productName} />
              </TableCell>
              <TableCell colSpan="3">
                <TextField label="Serial Number" onChange={(e) => onChange(e, 'serialNumber', index)} value={item.serailNumber} />
              </TableCell>
              <TableCell colSpan="3">
                <input type="number" label="quantity" onChange={(e) => onChange(e, 'quantity', index)} value={item.serailNumber} />
              </TableCell>
              <TableCell><DeleteOutlineRounded onClick={() => removeItem(index)} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Toolbar>
        <div className={classes.addSection}>
          <Button variant="contained" color="primary" onClick={AddInListHandler} disabled={ButtonDisabled}>Add Item</Button>
        </div>
        <div className={classes.submitSection}>
          <Button variant="contained" href="/inventory" onClick={cancelList} style={{ backgroundColor: "#dc3545" }}>Cancel</Button>
          <Button variant="contained" onClick={submitForm} style={{ backgroundColor: "#28a745", marginLeft: "10px" }}>Submit</Button>
        </div>
      </Toolbar>
    </Paper>

  )
}
export default AddtoInventory;