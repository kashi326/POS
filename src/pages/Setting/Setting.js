import React, { useState } from 'react'
import { Paper, makeStyles, List, ListItem, ListItemText, TextareaAutosize } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { PermDataSetting, EditAttributes } from '@material-ui/icons';
import * as Database from '../../services/datastore2';
import { useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import TitleHead from '../../component/TitleHead';

const useStyles = makeStyles({
  root: {
    height: '100vh'
  },
  listItemText: {
    maxWidth: '150px'
  },
  listItem: {
    padding: '5px',
    width: '350px',
    maxWidth: '350px',
    paddingTop: '0px',
    paddingBottom: '0px',
    fontSize: '14px'
  },
  heading: {
    padding: '5px'
  }
})

function Setting() {
  const classes = useStyles();
  const [settings, setsettings] = useState([]);
  const [isUpdated, setisUpdated] = useState(false);
  async function initDB() {
    const db = await Database.get();
    let sData = await db.setting.findOne().exec();
    if (sData !== null) {
      setsettings(sData);
    }
  }
  useEffect(() => {
    initDB();
  }, []);

  async function updateSettingsHandler(value, idx, ele) {
    list[idx]['value'] = value;
    const db = await Database.get();
    const fSetting = await db.setting.findOne({
      selector: {
        _id: { $eq: settings._id }
      }
    }).exec();
    switch (ele.dbName) {
      case 'shopName':
        await fSetting.update({
          $set: {
            shopName: value
          }
        })
        break;
      case 'shopAddress':
        await fSetting.update({
          $set: {
            shopAddress: value
          }
        })
        break;
      case 'shopOwnerName':
        await fSetting.update({
          $set: {
            shopOwnerName: value
          }
        })
        break;
      case 'shopOwnerEmail':
        await fSetting.update({
          $set: {
            shopOwnerEmail: value
          }
        })
        break;
      case 'shopOwnerPhone':
        await fSetting.update({
          $set: {
            shopOwnerPhone: value
          }
        })
        break;
      default:
        console.log('error');
        break;
    }
    const tempSetting = await db.setting.findOne().exec();
    sessionStorage.setItem('setting',JSON.stringify(tempSetting));
    setisUpdated(true);
    setTimeout(() => setisUpdated(false), 2000);
    // console.log(list);
  }
  const list = [
    {
      name: 'Shop Name',
      dbName: 'shopName',
      value: settings.shopName
    },
    {
      name: 'Owner Name',
      dbName: 'shopOwnerName',
      value: settings.shopOwnerName
    },
    {
      name: 'Address',
      dbName: 'shopAddress',
      value: settings.shopAddress
    },
    {
      name: 'Contact No#',
      dbName: 'shopOwnerPhone',
      value: settings.shopOwnerPhone
    },
    {
      name: 'Email',
      dbName: 'shopOwnerEmail',
      value: settings.shopOwnerEmail
    }
  ]
  return (
    <Paper className={classes.root}>
      <TitleHead name="App Basic Setting" icon={ <PermDataSetting />}></TitleHead>
      
      {isUpdated && <Alert severity="success">Setting updated successfully</Alert>}
      <List>

        {list.map((ele, idx) =>
          ele.value ? <ListValue ele={ele} updateSettingsHandler={updateSettingsHandler} idx={idx} key={idx}></ListValue> : ''
        )}

      </List>
    </Paper>
  )
}
function ListValue({ ele, updateSettingsHandler, idx }) {
  const classes = useStyles();
  const [isEditable, setisEditable] = useState(false);
  const [updatedValue, setupdatedValue] = useState(ele.value);

  function updateHandler() {
    setisEditable(!isEditable);
    if (isEditable) {
      updateSettingsHandler(updatedValue, idx, ele);
    }
  }
  return (
    <ListItem style={{justifyContent:'center'}}>
      <ListItemText className={classes.listItemText}>{ele.name}</ListItemText>
      {
        isEditable ?
          <TextareaAutosize className={classes.listItem} name={ele.dbName} value={updatedValue} onChange={(e) => setupdatedValue(e.target.value)}></TextareaAutosize> :
          <ListItemText className={classes.listItem}>{updatedValue}</ListItemText>
      }
      {
        isEditable ?
          <EditAttributes onClick={updateHandler} /> :
          <CreateIcon onClick={updateHandler} />
      }
    </ListItem>
  )
}
export default Setting
