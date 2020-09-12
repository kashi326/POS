import React, { useState } from 'react';
import { TextField, Button, Paper, makeStyles, Grid, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import * as Database from '../../services/datastore2'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  form: {
    paddingLeft: '24px',
    paddingRight: '24px'
  },
  actionButton: {
    marginRight: '20px'
  }
}));

function AddCustomer() {
    const classes = useStyles();
    let [customerForm, setCustomerForm] = useState({
      customerName: '',
      customerAddress: '',
      customerPhone: '',
      startingBalance: 0
    });
    let history = useHistory();

    function handleChange(event){
      const name = event.target.name;
      const value = event.target.value;
      customerForm[name] = value;
      setCustomerForm(customerForm);
    };

    async function submitCustomerForm(){
      
      if(!customerForm.customerName){
        return alert('Customer name is requried');
      }
      if(!customerForm.customerAddress){
        return alert('Customer address is requried');
      }
      if(!customerForm.customerPhone){
        alert('Customer phone is requried');
      }
      customerForm.startingBalance = parseFloat(customerForm.startingBalance);
      if(!customerForm.startingBalance){
        customerForm.startingBalance = 0;
      }
      const db = await Database.get();
      await db.customers.insert(customerForm);
      history.push('/customers');
    };

    return (
      <div>
        <Paper className={classes.root}>
          <Toolbar>
            <Typography variant="h6">Add New Customer</Typography>
          </Toolbar>
          <form className={classes.form} noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField id="customer-name" label="Customer Name" name="customerName" onChange={handleChange} InputLabelProps={{shrink:true}} fullWidth></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField id="customer-address" label="Address" name="customerAddress" onChange={handleChange} InputLabelProps={{shrink:true}} fullWidth></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField id="customer-phone" label="Phone" name="customerPhone" onChange={handleChange} InputLabelProps={{shrink:true}} fullWidth></TextField>
              </Grid>  
              <Grid item xs={12}>
                <TextField id="customer-opening-balance" type="number" name="startingBalance" onChange={handleChange} InputLabelProps={{shrink:true}} label="Opening Balance" fullWidth></TextField>
              </Grid>            
              <Grid item xs={12}>
                <Button className={classes.actionButton} variant="contained" color="primary" onClick={submitCustomerForm}>Submit</Button>
                <Link to="/customers">
                  <Button className={classes.actionButton} variant="contained" color="secondary">Cancel</Button>
                </Link>                
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    )
}

export default AddCustomer;