import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import * as Database from '../services/datastore2';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';

const style = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  grid: {
    height: '75%',
    marginLeft: '25%',
    marginTop: '5%',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }, avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

}));

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false)
  const classes = style();
  async function initDB() {
    const db = await Database.get();
    const user = await db.user.findOne({ selector: { Email: { $eq: 'admin@admin.com' } } }).exec();
    if (user === null) {
      await db.user.insert({ Email: 'admin@admin.com', Password: 'admin' })
    }
  }
  useEffect(() => { initDB() }, []);
  async function HandleLogin() {
    const db = await Database.get();
    const user = await db.user.findOne({
      selector: {
        Email: { $eq: username },
        Password: { $eq: password }
      }
    }).exec();
    if (user === null) {
      seterror(true);
    } else {
      localStorage.setItem('isLogined', true);
      seterror(false);
    }
  }
  if (localStorage.getItem('isLogined') === 'true')
    return (<Redirect to='/home' />)

  return (
    <div className="App">
      <div>
        <Grid container component='main' className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} md={3}></Grid>
          <Grid item xs={12} md={6} style={{ marginTop: '20px' }} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
               {error && <Alert severity="error">Username or Password is Incorrect.Please try again</Alert>}
              </Typography>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e) => setusername(e.target.value)}
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setpassword(e.target.value)}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type=""
                onClick={HandleLogin}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
            </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Login;
