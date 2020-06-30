import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import {TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles({
  root: {

  },
  card: {
    maxWidth: 400,
    backgroundColor: 'lightgrey',
    margin: '10px',
  },
  media: {
    height: 140,
  },
  table: {
    maxWidth: '650px'
  }
});

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} md={4} lg={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Total Sale
                </Typography>
                <h5>0.00</h5>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to="/">Learn More</Link>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Total Sale
                </Typography>
                <h5>0.00</h5>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to="/">Learn More</Link>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Monthly Sale
                </Typography>
                <h5>0.00</h5>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to="/">Learn More</Link>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Customer Debt
                </Typography>
                <h5>0.00</h5>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to="/">Learn More</Link>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Monthly Expense
                </Typography>
                <h5>0.00</h5>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to="/">Learn More</Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Divider style={{ marginBottom: '10px' }} />
      <TableContainer component={Paper}>
        <Table size="small" className={classes.table} component='table' style={{ marginLeft: '20%' }} elevation={2}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Cell Number</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Remainings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>dumyName1</TableCell>
              <TableCell>03xxxxxxxxx</TableCell>
              <TableCell>30/06/2020</TableCell>
              <TableCell>15000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>dumyName2</TableCell>
              <TableCell>03xxxxxxxxx</TableCell>
              <TableCell>30/06/2020</TableCell>
              <TableCell>15000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>dumyName3</TableCell>
              <TableCell>03xxxxxxxxx</TableCell>
              <TableCell>30/06/2020</TableCell>
              <TableCell>15000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4</TableCell>
              <TableCell>dumyName4</TableCell>
              <TableCell>03xxxxxxxxx</TableCell>
              <TableCell>30/06/2020</TableCell>
              <TableCell>15000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}
export default Home;
