import React from 'react';
import { Paper, Table, TableBody, TableRow, TableCell, TableHead, Card, CardContent, makeStyles, Divider, Typography, TableFooter } from '@material-ui/core';
import * as Database from '../../services/datastore2';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const classes = useStyles();
  const { id } = useParams();
  const [purchaseReceipt, setpurchaseReceipt] = useState([]);
  const [purchaseRecord, setpurchaseRecord] = useState([]);
  useEffect(() => {
    async function initDB() {
      const db = await Database.get();
      const prData = await db.purchasereceipt.find({
        selector: {
          receiptID: { $eq: Number(id) }
        }
      }).exec();
      const pData = await db.purchase.findOne({
        selector: {
          receiptID: { $eq: Number(id) }
        }
      }).exec();
      // const pData = await db.purchasereceipt.find().exec();
      // console.log(pData);
      setpurchaseReceipt(prData);
      setpurchaseRecord(pData);
    }

    initDB();
  }, [id]);
  return (
    <Paper className={classes.root}>
      <Card className={classes.card}>
        <img src={logo} alt="" className={classes.image} />
        <CardContent align="right" className={classes.cardContent}>
          <h3>Rayyan CCTV</h3>
          <p >Totalai khudukhel buner</p>
          <p>Phone No:03456092099</p>
          <p>Email:mohsinibrar2010@gmail.com</p>
        </CardContent>
      </Card>
      <Divider />
      <Typography align="center" variant="h5" component="h5"><i>Invoice</i></Typography>
      <Card className={classes.card}>
        <CardContent className={classes.image}>
          <p>Seller Name:{purchaseRecord.sellerName}</p>
        </CardContent>
        <CardContent align="right" className={classes.cardContent}>
          <p >Invoice:{id}</p>
          <p>Date:</p>
        </CardContent>
      </Card>
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
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>{purchaseRecord.totalProducts}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Table style={{ maxWidth: '300px', float: 'inline-end' }}>
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
      <Divider/>
    </Paper>
  )
}
export default PurchaseView;