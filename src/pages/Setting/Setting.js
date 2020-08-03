import React from 'react'
import { Paper, makeStyles, Box, Typography, Divider } from '@material-ui/core'
import PermDataSetting from '@material-ui/icons/PermDataSetting';
const useStyles = makeStyles({
  root: {
    height: '100vh'
  }
})
function Setting() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box>
        <Typography component="h5" variant="h5">
          <b>App Basic Setting <PermDataSetting /> </b>
        </Typography>
        <Divider />
      </Box>
    </Paper>
  )
}

export default Setting
