import React from 'react';
import { TableCell, ListItem } from '@material-ui/core';
import { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import { EditAttributes } from '@material-ui/icons';


export default function Editable({ id, value, updateData }) {
  const [editable, seteditable] = useState(false);
  const [changedvalue, setchangedvalue] = useState(0);
  const [error, seterror] = useState(false)

  function updateHandler() {
    seteditable(!editable);
    if (editable) {
      updateData(id, changedvalue);
    }
  }
  function handlechange(e) {
    if (e.target.value >= 0) {
      setchangedvalue(Number(e.target.value));
      seterror(false);
    }
    else
      seterror(true);
  }
  return (
    <TableCell style={{ maxWidth: '100px' }}>
      <div style={{ display: 'inline flex' }}>
        {
          editable ?
            <input type="number" value={changedvalue} onChange={handlechange} style={{ maxWidth: '100px' }} /> :
            <p style={{ marginTop: 'revert' }}>{value}</p>
        }
        <ListItem button onClick={updateHandler} >{editable ? <EditAttributes /> : <CreateIcon />}</ListItem>
      </div>
      {
        error ? <p style={{ color: 'red' }}>invalid value!</p> : ''
      }

    </TableCell>
  );
}
