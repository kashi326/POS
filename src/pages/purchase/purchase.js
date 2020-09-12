
import React, { useState, useEffect } from 'react';
import { makeStyles, Button, Toolbar, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Textfield from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import * as Database from '../../services/datastore2';
import TitleHead from '../../component/TitleHead';
import Link from 'react-router-dom/Link';
import PageviewIcon from '@material-ui/icons/Pageview';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
}));
function Purchase() {
    const [purchases, setpurchases] = useState([]);
    async function initDB() {
        const db = await Database.get();
        const pData = await db.purchase.find().exec();
        
        setpurchases(pData);
        setFilteredData(pData);
    }

    useEffect(() => {
        initDB()
    }, []);
    //Search Handler
    function searchHandler(e) {
        let value = e.target.value;
        setSearchValue(value);
        setFilteredData(purchases.filter(v => v.sellerName.toLowerCase().includes(value.toLowerCase())));
    }

    function clearHandler(e) {
        setSearchValue("");
        setFilteredData(purchases);
    }
    const [searchValue, setSearchValue] = useState("");
    const [filteredData, setFilteredData] = useState([]);
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
                <Link to="/purchase/add" className="btn btn-primary" style={{ backgroundColor: 'rgb(63, 81, 181)' }} >
                    Add
                    <AddIcon />
                </Link>
            </Toolbar>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>No#</TableCell>
                            <TableCell>Receipt ID</TableCell>
                            <TableCell>Seller Name</TableCell>
                            <TableCell>Total Product</TableCell>
                            <TableCell align="center">Cash Paid</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row, idx) =>
                            <TableRow key={idx}>
                                <TableCell>{idx+1}</TableCell>
                                <TableCell>{row.receiptID}</TableCell>
                                <TableCell>{row.sellerName}</TableCell>
                                <TableCell>{row.totalProducts}</TableCell>
                                <TableCell align="center">{row.paid}</TableCell>
                                <TableCell><Link to={`/purchase/view/${row.receiptID}`}><PageviewIcon/> </Link></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
export default Purchase;