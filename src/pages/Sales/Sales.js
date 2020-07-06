import React, { useState } from 'react';
import { makeStyles, Typography, Button, Toolbar } from '@material-ui/core';
import Textfield from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CustomTable from '../../component/CustomTable';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
}));
function Sales() {
    let rowsData = [
        { 'id': '1', 'name': 'dummyName1', 'Total Items': '15', 'Total': '50000' },
        { 'id': '1', 'name': 'dummyName1', 'Total Items': '15', 'Total': '50000' },
        { 'id': '1', 'name': 'dummyName1', 'Total Items': '15', 'Total': '50000' },
        { 'id': '1', 'name': 'dummyName1', 'Total Items': '15', 'Total': '50000' },
    ];
    const rowsName = [
        { 'id': 'ID', 'name': 'Customer Name', 'qauntity': 'Total Items', 'price': 'Total' },
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
            <Typography variant="h4" component="h2">Sales</Typography>
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
                <Button href="/Sales/add" variant="contained" color="primary" >
                    Add
                    <AddIcon />
                </Button>
            </Toolbar>
            <CustomTable rowsName={rowsName} rowsData={rowsData}></CustomTable>
        </div>
    );
}
export default Sales;