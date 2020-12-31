import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, makeStyles, Toolbar } from '@material-ui/core'
import CreateIcon  from '@material-ui/icons/Create';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TitleHead from '../../component/TitleHead';
import * as Database from '../../services/datastore2';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh%'
  },
  toolbarSearch: {
    flex: '1 1 100%'
  },
  toolbarActions: {
    whiteSpace: 'nowrap'
  }
}));
function ViewEmployees() {
  const classes = useStyles();
  const [users, setusers] = useState([]);
  async function initDB() {
    const db = await Database.get();
    const getUser = await db.user.find().exec();
    console.log(getUser)
    setusers(getUser);
  }

  useEffect(() => {
    initDB()
  }, []);
  return (
    <Paper>
      <TitleHead name="Users List" />
      <Toolbar >
        <div className={classes.toolbarSearch}>

        </div>
        <div className={classes.toolbarActions}>
          <Link to="/employee/add">
            <Button variant="contained" color="primary">New User</Button>
          </Link>
        </div>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            users.map((ele, idx) =>
              <TableRow key={idx}>
                <TableCell>{ele.Name}</TableCell>
                <TableCell>{ele.Email}</TableCell>
                <TableCell>{ele.Phone}</TableCell>
                <TableCell><Link to={`/employee/edit/${ele._id}`} ><CreateIcon /></Link></TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </Paper>
  )
}

export default ViewEmployees
