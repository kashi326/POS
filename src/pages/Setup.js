import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Grid, Button } from '@material-ui/core';
import bgImage from '../bgImage.jpg';
import * as Database from '../services/datastore2';
import { Redirect } from 'react-router-dom';
import RestoreBackup from './Setting/RestoreBackup';
import TitleHead from '../component/TitleHead';
import NewUser from '../component/NewUser';
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

function Setup() {
  const classes = style();

  async function initDB() {
    const db = await Database.get();
    const setting = await db.setting.findOne().exec();
    if (setting !== null)
      settoSetupUser(true);
  }
  useEffect(() => {
    initDB();
  }, []);




  const [toSetupUser, settoSetupUser] = useState(false);
  const [SetupComplete, setSetupComplete] = useState(false);
  const Osetting = { shopName: '', shopAddress: '', shopOwnerName: '', shopOwnerPhone: '', shopOwnerEmail: '' };
  const Asetting = Object.entries(Osetting);

  function handleSettingChange(e, idx) {
    const name = e.target.name;
    Osetting[name] = e.target.value;
  }
  async function insertSetting() {
    if (validateSetting(Osetting)) {
      return;
    }
    console.log('bye');
    const db = await Database.get();
    await db.setting.insert(Osetting);
    settoSetupUser(true);
  }


  function validateSetting(toValidate) {
    console.log('hello');
    if (Osetting.shopName === "") {
      alert("please fill Shop Name Field");
      return true;
    } else if (Osetting.shopAddress === "") {
      alert("please fill Shop Address Field");
      return true;
    } else if (Osetting.shopOwnerName === "") {
      alert("please fill Shop Owner Name Field");
      return true;
    } else if (Osetting.shopOwnerPhone === "") {
      alert("please fill Shop Owner Phone Field");
      return true;
    } else if (Osetting.shopOwnerEmail === "") {
      alert("please fill Shop Owner Email Field");
      return true;
    } else
      return false;
  }

  if (SetupComplete) {
    return <Redirect to='/login' />
  }
  return (
    <Paper className={classes.root} style={{ backgroundImage: `url(${bgImage})`, }}>
      <p >Welcome, Please setup basic setting of your app to start right away</p>
      {
        toSetupUser ?
          <Grid item sm={8} component={Paper} className={classes.formGrid} elevation={8} square>
            <TitleHead name="App Setup" />
            <NewUser setSetupComplete={setSetupComplete} from={1} />
          </Grid>
          :
          <Grid item sm={8} component={Paper} className={classes.formGrid} elevation={8} square>
            <TitleHead name="User Setup" />
            {
              Asetting.map((ele, idx) =>
                <SettingComponent key={idx} idx={idx} oldValue={ele} handleSettingChange={handleSettingChange} />
              )
            }
            <Button onClick={insertSetting} color="primary" variant="contained" className={classes.actionButton}>Submit</Button>
          </Grid>
      }
      <p style={{ marginLeft: '50%' }}>OR</p>
      <div style={{ width: '66.66%' }} className={classes.formGrid}>
        {
          <RestoreBackup from={1} />
        }
      </div>
    </Paper>
  )
};

function SettingComponent({ oldValue, idx, handleSettingChange }) {
  const classes = style();
  // console.log();
  const [newValue, setnewValue] = useState(oldValue[1]);
  function handleChange(e) {
    setnewValue(e.target.value);
    handleSettingChange(e, idx);
  }
  const name = oldValue[0];
  return (
    <Grid item sm={6} style={{ marginLeft: '25%' }}>
      <TextField value={newValue} name={name} label={name} className={classes.inputFields} onChange={handleChange} style={{ display: 'block' }} fullWidth></TextField>
    </Grid>
  )
};


export default Setup;