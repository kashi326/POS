import { CssBaseline, Paper } from '@material-ui/core';
import React from 'react'
import NewUser from '../../component/NewUser';
import TitleHead from '../../component/TitleHead';
function AddEmployee() {
  return (
    <Paper>
      <TitleHead name="New User" />
      <NewUser from={0} />
      <CssBaseline />
    </Paper>
  )
}

export default AddEmployee
