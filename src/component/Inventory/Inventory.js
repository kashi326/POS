import React, { useState } from 'react';
import { makeStyles, Typography, Button, Toolbar } from '@material-ui/core';
import Textfield from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CustomTable from '../UIcomponents/CustomTable';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
}));
function Inventory() {
    const rowsData = [
        { 'id': '1', 'name': '1MP', 'qauntity': '1', 'price': '1500' },
        { 'id': '2', 'name': '2MP', 'qauntity': '3', 'price': '2000' },
        { 'id': '3', 'name': '3MP', 'qauntity': '2', 'price': '2500' },
        { 'id': '4', 'name': '4MP', 'qauntity': '4', 'price': '3200' },];
    const rowsName = [
        { 'id': 'ID', 'name': 'Product Name', 'qauntity': 'Quantity', 'price': 'Price' },
    ];
    //Search Handler
    function searchHandler(e) {
        console.log(e.target.value);
    }
    function clearHandler(e) {
        setSearchValue("");
    }
    const [searchValue, setSearchValue] = useState("");
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h4" component="h2">Inventory</Typography>
            <Toolbar>
                <Textfield
                    label="search"
                    variant="standard"
                    value={searchValue}
                    onChange={searchHandler}
                />
                <Button onClick={clearHandler} variant="contained" color="primary" >
                    Clear
                </Button>
                <div style={{ flexGrow: 1 }}></div>
                <Button href="/inventory/add" variant="contained" color="primary" >
                    Add
                    <AddIcon />
                </Button>
            </Toolbar>
            <CustomTable rowsName={rowsName} rowsData={rowsData}></CustomTable>
        </div>
    );
}
export default Inventory;