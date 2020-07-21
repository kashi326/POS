import React, { useState } from 'react';
import { TextField, Button, Table, Paper, makeStyles, TableHead, TableBody, TableRow, TableCell, TableFooter } from '@material-ui/core';
import { DeleteOutlineRounded, VisibilityOffSharp } from '@material-ui/icons';
import TitleHead from '../../component/TitleHead';
import * as Database from '../../services/datastore2';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  input: {
    width: '50%',
    marginLeft: '25%',
    marginBottom: '5px'
  }
}));
function AddtoInventory() {
  const classes = useStyles();
  const [itemsInList, setItemsInList] = useState([]);
  const [ItemName, setItemName] = useState("");
  const [ItemSerailNumber, setItemSerialNumber] = useState("");
  let List = itemsInList;
  function AddInListHandler() {
    if (ItemName === "") {
      alert("Item Name is Empty");
    } else if (ItemSerailNumber === "") {
      alert("Item Serial Number is Empty");
    } else {
      List.push({ 'productName': ItemName, 'serialNumber': ItemSerailNumber });
      setItemsInList(List);
      setItemName("");
      setItemSerialNumber("");
    }
    console.log(itemsInList);
  }
  function removeItem(index) {
    let bList = [...List];
    bList.splice(index, 1);
    console.log(bList);
    setItemsInList(bList);
  }
  function cancelList() {
    setItemsInList([]);
  }
  function onChange(e, key, index) {
    let bItems = [...List];
    bItems[index][key] = e.target.value;
    setItemsInList(bItems);
  }
  async function submitForm() {
    const db = await Database.get();
    itemsInList.map(item => (
      db.inventory.insert(item)
    ));
  }

  return (
    <Paper className={classes.root}>
      <TitleHead name="Add to Inventory"></TitleHead>
      <Table size="dense">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Serial Number</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {List.map((item, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <TextField value={item.productName} onChange={(e) => onChange(e, 'itemName', index)}></TextField>
              </TableCell>
              <TableCell>
                <TextField value={item.serialNumber} onChange={(e) => onChange(e, 'serialNumber', index)} />
              </TableCell>
              <TableCell><DeleteOutlineRounded onClick={() => removeItem(index)} /></TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>{List.length + 1}</TableCell>
            <TableCell>
              <TextField label="Item Name" type="text" onChange={(e) => setItemName(e.target.value)} value={ItemName} />
            </TableCell>
            <TableCell>
              <TextField label="Serial Number" onChange={(e) => setItemSerialNumber(e.target.value)} value={ItemSerailNumber} />
            </TableCell>
            <TableCell><VisibilityOffSharp /></TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan="12">
              <Button variant="contained" color="primary" onClick={AddInListHandler}>Add Item</Button>
              <Button variant="contained" href="/inventory" onClick={cancelList} style={{ backgroundColor: "#dc3545", marginLeft: "70%" }}>Cancel</Button>
              <Button variant="contained" onClick={submitForm} style={{ backgroundColor: "#28a745", marginLeft: "10px" }}>Submit</Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>

  )
}
export default AddtoInventory;