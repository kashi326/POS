import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import * as Database from '../services/datastore2';
import { useEffect } from 'react';
const useStyles = makeStyles({
  root: {

  },
  card: {
    maxWidth: 400,
    margin: '10px',
  },
  media: {
    height: 140,
  },
  table: {
    maxWidth: '800px'
  }
});
function Home() {
  const classes = useStyles();
  const [sales, setsales] = useState([]);
  const data = [
    {
      name: 'Total Sale',
      value: 0.0,
      Link: '/'
    },
    {
      name: 'Monthly Sale',
      value: 0.0,
      Link: '/'
    },
    {
      name: 'Customer Debt',
      value: 0.0,
      Link: '/'
    },
    {
      name: 'Monthly Expense',
      value: 0.0,
      Link: '/'
    },
    {
      name: 'Purchases',
      value: 0.0,
      Link: '/'
    },
  ];

  async function initDB() {
    const db = await Database.get();
    const sData = await db.sales.find().exec();
    setsales(sData);
  }
  useEffect(() => { initDB() });
  return (
    <div className={classes.root}>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        {data.map((ele, idx) =>
          <Grid item xs={12} sm={6} md={8} lg={3} key={idx} >
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {ele.name}
                  </Typography>
                  <h5>{ele.value}</h5>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link to={ele.Link}>Learn More</Link>
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>
      <Divider style={{ marginBottom: '10px' }} />
      <TableContainer component={Paper}>
        <Table size="small" component='table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Cell Number</TableCell>
              <TableCell>Sale Date</TableCell>
              <TableCell align="center">Paid</TableCell>
              <TableCell align="center">Remainings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              sales.map((ele, idx) =>
                <CustomerInfo id={ele.customerID} ele={ele} idx={idx} key={idx} />
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function CustomerInfo({ id, ele, idx }) {
  const [updateCustomer, setupdateCustomer] = useState([]);
  async function initDB() {
    const db = await Database.get();
    const customer = await db.customers.findOne({
      selector: {
        _id: { $eq: id }
      }
    }).exec();
    if (customer != null)
      setupdateCustomer(customer);
    else
      setupdateCustomer({ customerName: 'not found', customerPhone: 'not found' });
  }
  useEffect(() => { initDB() });
  return (
    <TableRow key={idx}>
      <TableCell>{ele.receiptID}</TableCell>
      <TableCell >{updateCustomer.customerName}</TableCell>
      <TableCell>{updateCustomer.customerPhone}</TableCell>
      <TableCell>{ele.Date}</TableCell>
      <TableCell align="center">{ele.paid}</TableCell>
      <TableCell align="center">{ele.balance}</TableCell>
    </TableRow>
  );
}
export default Home;
