import React from 'react';
import { makeStyles, Typography, Button, Toolbar } from '@material-ui/core';
import Textfield from '@material-ui/core/TextField';
import { TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
}));
function Inventory() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h4" component="h2">Inventory</Typography>
            <Toolbar>
                <Textfield
                    label="search"
                    variant="standard"
                />
                <div style={{ flexGrow: 1 }}></div>
                <Button href="/home" variant="contained" color="primary">
                    Add
                    <AddIcon/>
                </Button>
            </Toolbar>
            <TableContainer>

            </TableContainer>
        </div>
    );
}
export default Inventory;