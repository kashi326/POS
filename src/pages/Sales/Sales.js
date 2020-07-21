import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Button, Toolbar, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Textfield from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import TitleHead from '../../component/TitleHead';
import * as Database from '../../services/datastore2';
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    table: {
        minWidth: 650,
    },
    toolbarSearch: {
        flex: '1 1 100%'
    },
    toolbarActions: {
        whiteSpace: 'nowrap'
    }
}));
function Sales() {
    async function initDB() {
        const db = await Database.get();
        const sData = await db.sales.find().exec();
        console.log(sData);
        setSalesData(sData);
        setFilteredData(sData);
    };
    useEffect(() => { initDB() }, []);
    //Search Handler
    function searchHandler(e) {
        let value = e.target.value;
        setSearchValue(value);
        setFilteredData(salesData.filter(v => v.customerID.toLowerCase().includes(value.toLowerCase())));
    }
    function clearHandler(e) {
        console.log('called');
        setSearchValue("");
        setFilteredData(salesData);
    }
    const [searchValue, setSearchValue] = useState("");
    const [salesData, setSalesData] = useState([]);
    const [FilteredData, setFilteredData] = useState(salesData);
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <TitleHead name="Sales" />
            <Toolbar>
                <div className={classes.toolbarSearch}>
                    <Textfield
                        label="search"
                        variant="standard"
                        value={searchValue}
                        onChange={searchHandler}
                    />
                    <Button onClick={clearHandler} variant="contained" color="primary" >
                        Clear
                </Button>
                </div>
                <div className={classes.toolbarActions}>
                    <Link to="/customers/add">
                        <Button variant="contained" color="primary">Add Customer</Button>
                    </Link>
                </div>
            </Toolbar>
            <TableContainer border={1}>
                <Table className="table table-bordered">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Receipt No<b>#</b></TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Total items</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Remainings</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            FilteredData.map(row => 
                                <TableRow>
                                    <TableCell>{row._id}</TableCell>
                                    <TableCell>{row.receiptID}</TableCell>
                                    <TableCell>{row.customerID}</TableCell>
                                    <TableCell>{row.totalProducts}</TableCell>
                                    <TableCell>{row.totalBill}</TableCell>
                                    <TableCell>{row.totalPaid}</TableCell>
                                    <TableCell>{row.balance}</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
export default Sales;