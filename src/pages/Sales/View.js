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

function SalesView() {
  const { id } = useParams();
  let history = useHistory();
  const [saleReceipt, setsaleReceipt] = useState([]);
  const [saleRecord, setsaleRecord] = useState([]);
  useEffect(() => {
    async function initDB() {
      const db = await Database.get();
      const srData = await db.salesreceipt.find({
        selector: {
          receiptID: { $eq: id }
        }
      }).exec();
      const sData = await db.sales.findOne({
        selector: {
          receiptID: { $eq: id }
        }
      }).exec();
      if (sData == null || srData == null) {
        alert("Record doesn't exist. it might because record is delete");
        history.push('/sales');
      }
      // const pData = await db.salesreceipt.find().exec();
      // console.log(sData);
      setsaleReceipt(srData);
      setsaleRecord(sData);
    }

    initDB();
  }, [id,history]);
  return (
    <Paper>
      <ShopInfo />
      <Divider />

      <Typography align="center" variant="h5" component="h5"><i>Invoice</i></Typography>
      <CustomerInformation saleRecord={saleRecord} />
      <BillInformation saleRecord={saleRecord} saleReceipt={saleReceipt}/>
      <PaymentDetail saleRecord={saleRecord} />
      <Divider />
      <p align="center">Error and Omission are accepted.</p>
    </Paper>
  )
}

function ShopInfo() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <img src={logo} alt="RayyanCCTV" className={classes.image} />
      <CardContent align="right" className={classes.cardContent}>
        <h3>Rayyan CCTV</h3>
        <p >Totalai khudukhel buner</p>
        <p>Phone No:03456092099</p>
        <p>Email:mohsinibrar2010@gmail.com</p>
      </CardContent>
    </Card>
  )
}

function CustomerInformation({ saleRecord}) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <p>Customer Name:{saleRecord.customerID}</p>
        <p>Address:{saleRecord.customerID}</p>
        <p>Cell Number:{saleRecord.customerID}</p>
      </CardContent>
      <CardContent align="right" className={classes.cardContent}>
        <p >Invoice:{saleRecord.receiptID}</p>
        <p>Date:{saleRecord.Date}</p>
      </CardContent>
    </Card>
  )
}

function BillInformation({saleReceipt,saleRecord}){
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
            saleReceipt.map((item, idx) =>
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.total}</TableCell>
              </TableRow>
            )
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
            <TableCell>{saleRecord.totalProducts}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
  )
}

function PaymentDetail({ saleRecord }) {
  return (
    <TableContainer >
      <Table style={{ maxWidth: '300px', float: 'right' }}>
        <TableBody>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>{saleRecord.bill}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Paid</TableCell>
            <TableCell>{saleRecord.paid}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Discount</TableCell>
            <TableCell>{saleRecord.discount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Outstandings</TableCell>
            <TableCell>{saleRecord.balance}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SalesView;