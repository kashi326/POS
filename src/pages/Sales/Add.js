import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, TextField, Button, makeStyles, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';
import { useInventoryItems } from '../../context/InventoryItemProvider';
import TitleHead from '../../component/TitleHead';
import { Autocomplete } from '@material-ui/lab';
import * as Database from '../../services/datastore2';
import { useEffect } from 'react';
const useStyles = makeStyles((theme) => ({
    root: {

    },
    addSection: {
        flex: '1 1 80%'
    },
    submitSection: {
        whiteSpace: 'nowrap'
    },
    customerSelect: {
        minWidth: '200px'
    }
}));

function SaleItem({ index, item }) {
    let [localItem, setLocalItem] = useState(item);
    const { removeItem, updateItem } = useInventoryItems();

    function onChange(e, idx) {
        console.log(idx + e.target.value);
        let itm = { ...localItem };
        itm[idx] = e.target.value;
        console.log(itm)
        setLocalItem(itm);
        updateItem(itm, itm.id);
    }

    return (
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
                <TextField value={localItem.serialNumber} onChange={(e) => onChange(e, 'serialNumber')}></TextField>
            </TableCell>
            <TableCell>
                <TextField value={localItem.name} onChange={(e) => onChange(e, 'name')}></TextField>
            </TableCell>
            <TableCell>
                <TextField value={localItem.description} onChange={(e) => onChange(e, 'description')}></TextField>
            </TableCell>
            <TableCell>
                <TextField value={localItem.retail_price} onChange={(e) => onChange(e, 'retial_price')}></TextField>
            </TableCell>
            <TableCell>
                <DeleteOutline onClick={() => removeItem(index)}></DeleteOutline>
            </TableCell>
        </TableRow>
    );
}

export default function AddItem() {
    const classes = useStyles();
    const [customers, setcustomers] = useState([]);
    const [SelectedCustomer, setSelectedCustomer] = useState([{ 'customerName': 'hello' }]);
    const { items, addItem, cancelSalesList } = useInventoryItems();
    function cancelList() {
        cancelSalesList();
    }
    function onSelectHandler(e) {
        const value = e.target.value;
        let cust = [];
        customers.map(customer => customer.customerName === value? cust = customer:[]);
        console.log(cust.customerName);
        setSelectedCustomer(cust);
    }
    async function initDB() {
        const db = await Database.get()
        const cData = await db.customers.find().exec();
        // console.log(cData);
        setcustomers(cData);
    }
    useEffect(() => { initDB() }, []);
    return (
        <Paper>
            <TitleHead name="New Sale"></TitleHead>
            <Toolbar>
                <Autocomplete
                    className={classes.customerSelect}
                    id="customer List"
                    freeSolo
                    options={customers.map(ele => ele.customerName)}
                    onSelect={onSelectHandler}
                    renderInput={(params) => (
                        <TextField {...params} label="Customer" margin="normal" variant="standard" />
                    )}
                />
                <div style={{ flex: "1 1 100%" }}></div>
                <TextField label="Balance" margin="normal" variant="standard" value={SelectedCustomer.debitAmount?SelectedCustomer.debitAmount:0} />
            </Toolbar>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Serial Number</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Retail Price</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, idx) => <SaleItem key={idx} index={idx} item={item}></SaleItem>)}
                </TableBody>
            </Table>
            <Toolbar>
                <div className={classes.addSection}>
                    <Button variant="contained" color="primary" onClick={() => addItem({ serialNumber: '', name: '', description: '', retail_price: '' })}>Add Item</Button>
                </div>
                <div className={classes.submitSection}>
                    <Link className="btn btn-danger" to="/sales" onClick={cancelList}>Cancel</Link>
                    <Button variant="contained" color="primary" onClick={() => alert("submitted")} style={{ marginLeft: "10px" }}>Submit</Button>
                </div>
            </Toolbar>
        </Paper>
    )
}