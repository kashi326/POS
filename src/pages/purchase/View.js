import React from 'react';
import { Paper, Table, TableBody, TableRow, TableCell, TableHead, Card, CardContent, makeStyles, Divider, Typography, TableFooter, TableContainer } from '@material-ui/core';
import * as Database from '../../services/datastore2';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../../logo.jpeg';
const useStyles = makeStyles({
  root: {
    height: '100vh'
  },
  card: {
    display: 'block ruby',
    boxShadow: 'none',
    padding: '0'
  },
  image: {
    maxWidth: '150px'
  },
  cardContent: {
    float: 'right',
    lineHeight: '5px'
  }
});

function PurchaseView() {
  const { id } = useParams();
  let history = useHistory();
  const [purchaseReceipt, setpurchaseReceipt] = useState([]);
  const [purchaseRecord, setpurchaseRecord] = useState([]);
  useEffect(() => {
    async function initDB() {
      const db = await Database.get();
      const prData = await db.purchasereceipt.find({
        selector: {
          receiptID: { $eq: id }
        }
      }).exec();
      const pData = await db.purchase.findOne({
        selector: {
          receiptID: { $eq: id }
        }
      }).exec();
      console.log(pData);
      console.log(prData);
      if (pData == null || prData == null) {
        alert("Record doesn't exist. it might because record is delete");
        history.push('/purchase');
      }
      // const pData = await db.purchasereceipt.find().exec();
      // console.log(pData);
      setpurchaseReceipt(prData);
      setpurchaseRecord(pData);
    }

    initDB();
  }, [id, history]);
  return (
    <Paper>
      <ShopInfo />
      <Divider />

      <Typography align="center" variant="h5" component="h5"><i>Invoice</i></Typography>
      <SellerInformation purchaseRecord={purchaseRecord} id={id} />
      <BillInformation purchaseRecord={purchaseRecord} purchaseReceipt={purchaseReceipt} />
      <PaymentInformation purchaseRecord={purchaseRecord} />
      <Divider />
      <p align="center">Error and Omission are accepted.</p>
    </Paper>
  )
}
function ShopInfo() {
  const classes = useStyles();
  const [shopInfo, setshopInfo] = useState([]);
  async function getShopInfo() {
    const db = await Database.get();
    const tempShopInfo = await db.setting.findOne().exec();
    if (tempShopInfo !== null) {
      setshopInfo(tempShopInfo);
    }
  }
  useEffect(() => { getShopInfo() })
  return (
    <Card className={classes.card}>
      <img src={logo} alt="" className={classes.image} />
      <p style={{marginLeft:'auto'}}>Personal use only</p>
      <CardContent align="right" className={classes.cardContent}>
        <h3>{shopInfo.shopName}</h3>
        <p >{shopInfo.shopAddress}</p>
        <p>Phone No: {shopInfo.shopOwnerPhone}</p>
        <p>Email: {shopInfo.shopOwnerEmail}</p>
      </CardContent>
    </Card>

  )
}
function SellerInformation({ purchaseRecord, id }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <p>Seller Name:{purchaseRecord.sellerName}</p>
      </CardContent>
      <CardContent align="right" className={classes.cardContent}>
        <p >Invoice:{id.substring(0, 8)}</p>
        <p>Date:{purchaseRecord.Date}</p>
      </CardContent>
    </Card>
  )
}
function BillInformation({ purchaseReceipt, purchaseRecord }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Retail Price</TableCell>
          <TableCell>Total per item</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          purchaseReceipt.map((item, idx) =>
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.retailPrice}</TableCell>
              <TableCell>{item.quantity * item.retailPrice}</TableCell>
            </TableRow>
          )
        }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell></TableCell>
          <TableCell>{purchaseRecord.totalProducts}</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
function PaymentInformation({ purchaseRecord }) {
  return (
    <TableContainer >
      <Table style={{ maxWidth: '300px', float: 'right' }}>
        <TableBody>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>{purchaseRecord.bill}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Paid</TableCell>
            <TableCell>{purchaseRecord.paid}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Outstandings</TableCell>
            <TableCell>{purchaseRecord.remainingBalance}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default PurchaseView;
