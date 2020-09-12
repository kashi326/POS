import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Button, Toolbar, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, ListItem } from '@material-ui/core';
import Textfield from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import TitleHead from '../../component/TitleHead';
import * as Database from '../../services/datastore2';
import CreateIcon from '@material-ui/icons/Create';
import { EditAttributes, Pageview } from '@material-ui/icons';
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

function TableCellCustomerName({ id }) {
    const [updateCustomer, setupdateCustomer] = useState([]);
    async function initDB() {
        const db = await Database.get();
        const customer = await db.customers.findOne({
            selector: {
                _id: { $eq: id }
            }
        }).exec();
        if(customer != null)
            setupdateCustomer(customer);
        else
            setupdateCustomer({customerName:'not found'});    
    }
    useEffect(() => { initDB() });
    return (
        <TableCell>{updateCustomer.customerName}</TableCell>
    );
}

function Sales() {
    const [searchValue, setSearchValue] = useState("");
    const [salesData, setSalesData] = useState([]);
    const [FilteredData, setFilteredData] = useState(salesData);
    const classes = useStyles();
    async function initDB() {
        const db = await Database.get();
        const sData = await db.sales.find().exec();
        setSalesData(sData);
        setFilteredData(sData);
    };
    useEffect(() => { initDB() }, []);
    function searchHandler(e) {
        let value = e.target.value;
        setSearchValue(value);
        setFilteredData(salesData.filter(v => v.customerID.toLowerCase().includes(value.toLowerCase())));
    }
    function clearHandler(e) {
        setSearchValue("");
        setFilteredData(salesData);
    }

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
                    <Link to="/sales/add">
                        <Button variant="contained" color="primary">Add Sale</Button>
                    </Link>
                </div>
            </Toolbar>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Receipt No<b>#</b></TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Total items</TableCell>
                            <TableCell>Total Bill</TableCell>
                            <TableCell >Paid</TableCell>
                            <TableCell>Remainings</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            FilteredData.map((row, idx) =>
                                <TableRow key={idx}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{row.receiptID}</TableCell>
                                    <TableCellCustomerName id={row.customerID} />
                                    <TableCell>{row.totalProducts}</TableCell>
                                    <TableCell>{row.bill}</TableCell>
                                    <Editable saleID={row._id} customerID={row.customerID} totalPaid={row.paid} initDB={initDB}></Editable>
                                    <TableCell>{row.balance}</TableCell>
                                    <TableCell><Link to={`/sales/view/${row.receiptID}`} ><Pageview/></Link></TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
function Editable({ saleID, customerID, totalPaid, initDB }) {
    const [editable, seteditable] = useState(false);
    const [newPaid, setnewPaid] = useState(0);
    const [error, seterror] = useState(false);
    function changeHandler(e) {
        if (e.target.value >= 0) {
            setnewPaid(Number(e.target.value));
            seterror(false);
        }
        else {
            seterror(true);
        }
    }
    async function submitHandler() {
        if (editable) {
            seterror(false);
        }
        const db = await Database.get();
        const cust = await db.customers.findOne({
            selector: {
                _id: { $eq: customerID }
            }
        }).exec();
        const sale = await db.sales.findOne({
            selector: {
                _id: { $eq: saleID }
            }
        }).exec();
        if (cust !== null && sale !== null) {
            cust.update({
                $inc: {
                    debitAmount: -newPaid
                }
            });
            sale.update({
                $inc: {
                    paid: newPaid,
                    balance: -newPaid
                }
            });
            initDB();
            seteditable(!editable);
        } else {
            alert('something went wrong');
        }
    }
    return (
        <TableCell style={{ maxWidth: '100px' }}>
            <div style={{ display: 'inline flex' }}>
                {
                    editable ?
                        <input type="number" value={newPaid} onChange={changeHandler} style={{ maxWidth: '100px' }} /> :
                        <p style={{ marginTop: 'revert' }}>{totalPaid}</p>
                }
                <ListItem button onClick={submitHandler} >{editable ? <EditAttributes /> : <CreateIcon />}</ListItem>
            </div>
            {
                error ? <p style={{ color: 'red' }}>invalid value!</p> : ''
            }

        </TableCell>
    );
}

export default Sales;