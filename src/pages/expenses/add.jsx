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


const AddExpense = () => {
    const classes = useStyles();
    let [expenseForm, setexpenseForm] = useState({
      ExpenseName: '',
      ExpenseDate: '',
      PaidTo: '',
      Amount: 0,
    });
    let history = useHistory();

    function handleChange (event)  {
      const name = event.target.name;
      const value = event.target.value;
      expenseForm[name] = value;
      setexpenseForm(expenseForm);
    };

    async function submitexpenseForm(){
      
      if(!expenseForm.ExpenseName){
        return alert('Expense name is requried');
      }
      if(!expenseForm.PaidTo){
        return alert('To whome you wanna pay is requried');
      }
      if(!expenseForm.ExpenseDate){
        alert('expense date is requried');
      }
      expenseForm.Amount = parseFloat(expenseForm.Amount);
      if(!expenseForm.Amount){
        expenseForm.Amount = 0;
      }
      console.log(expenseForm);
      const db = await Database.get();
      // await db.expenses.bulkInsert([
      //   {
      //     ExpenseName: 'Saeed',
      //     ExpenseDate: '2020-08-19',
      //     PaidTo: 'ali',
      //     Amount: 110,
      //   },
      //   {
      //     ExpenseName: 'Saeed ul haq',
      //     ExpenseDate: '2019-08-19',
      //     PaidTo: 'ali khan',
      //     Amount: 1103,
      //   } 
      // ]);
      
      await db.expenses.insert(expenseForm);
      history.push('/expenses');
    };

    return (
      <div>
        <Paper className={classes.root}>
          <Toolbar>
            <Typography variant="h6">Add New Expense</Typography>
          </Toolbar>
          <form className={classes.form} noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField id="expense-name" label="Expense Name" name="ExpenseName" onChange={handleChange} InputLabelProps={{shrink:true}} fullWidth></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField id="ExpenseDate" label="Expense Date" type="date" name="ExpenseDate" onChange={handleChange} InputLabelProps={{shrink:true}} fullWidth></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField id="PaidTo" label="PaidTo" name="PaidTo" onChange={handleChange} InputLabelProps={{shrink:true}} fullWidth></TextField>
              </Grid>  
              <Grid item xs={12}>
                <TextField id="Amount" type="number" name="Amount" onChange={handleChange} InputLabelProps={{shrink:true}} label="Amount" fullWidth></TextField>
              </Grid>            
              <Grid item xs={12}>
                <Button className={classes.actionButton} variant="contained" color="primary" onClick={submitexpenseForm}>Submit</Button>
                <Link to="/expenses">
                  <Button className={classes.actionButton} variant="contained" color="secondary">Cancel</Button>
                </Link>                
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    )
}

export default AddExpense;