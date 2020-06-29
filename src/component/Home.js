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

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  card: {
    maxWidth: 250,
    backgroundColor: 'lightgrey',
    margin: '10px',
  },
  media: {
    height: 140,
  },
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
    </div>

  );
}
export default Home;
