import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button } from '@material-ui/core';
import * as Database from '../services/datastore2';
const style = makeStyles((theme) => ({
  root: {
    padding: '10px',
    height: '100%',
    color: 'white'
  },
  formGrid: {
    padding: '10px',
    color: 'white',
    borderRadius: '5px',
    marginLeft: '15.5%',
  },
  actionButton: {
    width: '50%',
    marginLeft: '25%',
    marginTop: '10px'
  }

}));

export default function NewUser({ setSetupComplete, from }) {
  const classes = style();
  const Ouser = { Email: '', Name: '', Password: '', Phone: '' };
  const Auser = Object.entries(Ouser);

  function handleUserChange(e) {
    const name = e.target.name;
    Ouser[name] = e.target.value;
  }
  async function insertUser() {
    if (validateUser(Ouser)) {
      return;
    }
    console.log('bye');
    const db = await Database.get();
    await db.user.insert(Ouser);
    if (from)
      setSetupComplete(true);
  }
  function validateUser(toValidate) {
    console.log('hello');
    if (Ouser.Email === "") {
      alert("please fill username Field");
      return true;
    } else if (Ouser.password === "") {
      alert("please fill password Field");
      return true;
    }
    else if (Ouser.Name === "") {
      alert("please fill Name Field");
      return true;
    }
    else if (Ouser.Phone === "") {
      alert("please fill Phone Field");
      return true;
    }
    else
      return false;
  }

  return (
    <div>
      {
        Auser.map((ele, idx) =>
          <UserComponent key={idx} idx={idx} oldValue={ele} handleUserChange={handleUserChange} />
        )
      }
      <Button onClick={insertUser} color="primary" variant="contained" className={classes.actionButton}>Submit</Button>

    </div>
  )
}
function UserComponent({ oldValue, idx, handleUserChange }) {
  const classes = style();
  const [newValue, setnewValue] = useState(oldValue[1]);
  function handleChange(e) {
    setnewValue(e.target.value);
    handleUserChange(e, idx);
  }
  const name = oldValue[0];
  return (
    <Grid item sm={6} style={{ marginLeft: '25%' }}>
      <TextField value={newValue} name={name} label={name} className={classes.inputFields} onChange={handleChange} style={{ display: 'block' }} fullWidth></TextField>
    </Grid>
  )
}