
import React, { useState } from 'react';
import { makeStyles, Button, Toolbar,Paper } from '@material-ui/core';
import Textfield from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CustomTable from '../../component/CustomTable';
import TitleHead from '../../component/TitleHead';
import Link from 'react-router-dom/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
}));
function Purchase() {
    let rowsData = [
        { 'id': '1', 'name': 'dummyName1', 'Total Items': '15', 'Total': '50000' },
        { 'id': '1', 'name': 'dummyName2', 'Total Items': '16', 'Total': '50000' },
        { 'id': '1', 'name': 'dummyName3', 'Total Items': '17', 'Total': '50000' },
        { 'id': '1', 'name': 'dummyName4', 'Total Items': '18', 'Total': '50000' },
    ];
    const rowsName = [
        { 'id': 'ID', 'name': 'Seller Name', 'qauntity': 'Total Items', 'price': 'Total' },
    ];
    //Search Handler
    function searchHandler(e) {
        let value = e.target.value;
        setSearchValue(value);
        setFilteredData(rowsData.filter(v => v.name.toLowerCase().includes(value.toLowerCase())));
    }

    function clearHandler(e) {
        console.log('called');
        setSearchValue("");
        setFilteredData(rowsData);
    }
    const [searchValue, setSearchValue] = useState("");
    const [filteredData, setFilteredData] = useState(rowsData);
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <TitleHead name="Purchases"></TitleHead>
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
                <Link to="/purchase/add" className="btn btn-primary" style={{backgroundColor:'rgb(63, 81, 181)'}} >
                    Add
                    <AddIcon />
                </Link>
            </Toolbar>
            <CustomTable rowsName={rowsName} rowsData={filteredData}></CustomTable>
        </Paper>
    );
}
export default Purchase;