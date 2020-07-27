import React from 'react';
import { Paper, Table, TableBody, TableRow, TableCell, TableHead, Card, CardContent, makeStyles, Divider, Typography, TableFooter, TableContainer, Fab } from '@material-ui/core';
import * as Database from '../../services/datastore2';
import AddIcon from '@material-ui/icons/Add';
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

const today = Date().toString().substring(3, 15);
function Bill() {
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
    <Paper>
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
        <CardContent>
          <p>Seller Name:{purchaseRecord.sellerName}</p>
        </CardContent>
        <CardContent align="right" className={classes.cardContent}>
          <p >Invoice:{id}</p>
          <p>Date:{today}</p>
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
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
            <TableCell>{purchaseRecord.totalProducts}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
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
      <Divider />
      <p align="center">Error and Omission are accepted.</p>
    </Paper>
  )
}
function PurchaseView() {
  return (
    <div>
      <Bill></Bill>
      <ReactToPrint
        trigger={() => <Fab color="primary" aria-label="add" style={{ marginLeft: '90%' }}>
                        <AddIcon />
                      </Fab>}
        content={() => Bill}
      />

    </div>
  )
}
export default PurchaseView;