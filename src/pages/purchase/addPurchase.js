import React, { useState } from 'react';
import { TextField, Button, Table, Paper, makeStyles, TableContainer, TableHead, TableBody, TableRow, TableCell, Toolbar } from '@material-ui/core';
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
  paymentTable: {
    maxWidth: '300px',
    float: 'inline-end',
    marginTop: '10px'
  }
}));
const uniqueReceiptID = Date.now();
function Addpurchase() {
  const classes = useStyles();
  const [itemsInList, setItemsInList] = useState([]);
  const [ButtonDisabled, setButtonDisabled] = useState(false);
  const [sellerName, setsellerName] = useState("");
  const [paid, setpaid] = useState(0);
  let history = useHistory();
  let List = itemsInList;
  function AddInListHandler() {
    List.push({ productName: '', serialNumber: '', quantity: 0, retailPrice: 0, salePrice: 0 });
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
    if (key === 'quantity' || key === 'retailPrice' || key === 'salePrice') {
      bItems[index][key] = Number(e.target.value);
    }
    else
      bItems[index][key] = e.target.value;
    setItemsInList(bItems);
  }
  async function submitForm() {
    const db = await Database.get();
    let totalProducts = 0;
    let Bill = 0; 
    itemsInList.forEach(async item => {
      if (item.productName !== '' && item.quantity !== 0 && item.retailPrice !== 0 && item.salePrice !== 0) {
        totalProducts = totalProducts + Number(item.quantity);
        Bill += (Number(item.quantity) * Number(item.retailPrice));
        console.log(totalProducts);
        const invenProduct = await db.inventory.findOne({
          selector: {
            productName: { $eq: item.productName },
          }
        }).exec();
        if (invenProduct) {
          invenProduct.update({
            $inc: {
              quantity: item.quantity
            },
            $set: {
              retailPrice: item.retailPrice,
              salePrice: item.salePrice
            },
          });
        }
        else
          db.inventory.insert(item)
        const purchaseItem = {
          'receiptID': uniqueReceiptID,
          'productName': item.productName,
          'quantity': item.quantity,
          'retailPrice': Number(item.retailPrice),
        };
        await db.purchasereceipt.insert(purchaseItem);
      }
      else
        console.log('item is empty, not added')
      return;
    });
    const purchasereceipt = {
      'receiptID': uniqueReceiptID,
      'sellerName': sellerName,
      'totalProducts': totalProducts,
      'bill':Bill,
      'paid': paid,
      'remainingBalance':(Bill - paid)
    }
    console.log(purchasereceipt);
    await db.purchase.insert(purchasereceipt);
    history.push('/purchase');
  }
  return (
    <Paper>
      <TitleHead name="New Purchase"></TitleHead>
      <Toolbar>
        <TextField name="Seller/Company Name" onChange={(e) => setsellerName(e.target.value)}></TextField>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell colSpan="3">Item Name</TableCell>
            <TableCell colSpan="3">Serial Number</TableCell>
            <TableCell colSpan="3">Quantity</TableCell>
            <TableCell colSpan="3">Retail Price</TableCell>
            <TableCell colSpan="3">Sale Price</TableCell>
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
              <TableCell colSpan="3">
                <input type="number" label="retailPrice" onChange={(e) => onChange(e, 'retailPrice', index)} value={item.serailNumber} />
              </TableCell>
              <TableCell colSpan="3">
                <input type="number" label="salePrice" onChange={(e) => onChange(e, 'salePrice', index)} value={item.serailNumber} />
              </TableCell>
              <TableCell><DeleteOutlineRounded onClick={() => removeItem(index)} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableContainer>
        <Table className={classes.paymentTable}>
          <TableBody>
            <TableRow>
              <TableCell>Paid</TableCell>
              <TableCell><input type="number" value={paid} onChange={(e) => setpaid(Number(e.target.value))} /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
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
export default Addpurchase;