import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, TextField, Button, makeStyles, Toolbar, Divider, TableContainer } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';
import { useInventoryItems } from '../../context/InventoryItemProvider';
import TitleHead from '../../component/TitleHead';
import { Autocomplete } from '@material-ui/lab';
import * as Database from '../../services/datastore2';
import { useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    addSection: {
        flex: '1 1 80%'
    },
    submitSection: {
        whiteSpace: 'nowrap'
    },
    customerSelect: {
        minWidth: '300px'
    },
    productSelect: {
        minWidth: '300px'
    },
    paymentTable: {
        maxWidth: '300px',
        float: 'inline-end',
        marginTop: '10px'
    }
}));
function SaleItem({ index, item }) {
    let [localItem, setLocalItem] = useState(item);
    const { removeItem, updateItem } = useInventoryItems();

    function onChange(e, idx) {
        let itm = { ...localItem };
        if (idx === 'quantity' || idx === 'price') {
            itm[idx] = parseInt(e.target.value, 10);
            itm['total'] = itm['quantity'] * itm['price'];
        }
        else
            itm[idx] = e.target.value;

        setLocalItem(itm);
        updateItem(itm, itm.id);
    }

    return (
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
                {localItem.productName}
            </TableCell>
            <TableCell>
                {/* <TextField type="number" value={localItem.quantity} onChange={(e) => onChange(e, 'quantity')}></TextField> */}
                <input type="number" id="quantity" onChange={(e) => onChange(e, 'quantity')} defaultValue={1} />
            </TableCell>
            <TableCell>
                <input type="number" id="price" value={localItem.price} onChange={(e) => onChange(e, 'price')} />
            </TableCell>
            <TableCell>
                {localItem.total}
            </TableCell>
            <TableCell>
                <DeleteOutline onClick={() => removeItem(index)}></DeleteOutline>
            </TableCell>
        </TableRow>
    );
}

const uniqueReceiptID = uuidV4();

export default function AddItem() {
    const classes = useStyles();
    const [customers, setcustomers] = useState([]);
    const [products, setproducts] = useState([]);
    const [SelectedProduct, setSelectedProduct] = useState([]);
    const [SelectedCustomer, setSelectedCustomer] = useState({ '_id': 0, 'debitAmount': 0 });

    const { items, addItem, cancelSalesList } = useInventoryItems();
    let history = useHistory();

    const [paid, setpaid] = useState(0);
    const [discount, setdiscount] = useState(0);
    const totalBill = items.reduce((a, b) => a + b.total, 0) + SelectedCustomer.debitAmount;

    function cancelList() {
        cancelSalesList();
    }

    function onSelectCustomerHandler(e, value, res) {
        value && setSelectedCustomer(value);
    }

    function onSelectProductHandler(e, value, res) {
        value && setSelectedProduct(value);
    }

    function addtoList() {
        if (!SelectedProduct._id) {
            alert('Please select a product');
            return;
        }
        const item = {
            'receiptID': uniqueReceiptID,
            'productID': SelectedProduct._id,
            'productName': SelectedProduct.productName,
            'quantity': 1,
            'price': SelectedProduct.salePrice
        };
        const rProduct = products.filter(p => {
            return p._id !== SelectedProduct._id
        });
        setproducts(rProduct);
        addItem(item);
    }

    async function submitHandler() {
        if (validate()) {
            return;
        } else {
            const db = await Database.get();
            items.map(async item => {
                await db.salesreceipt.insert(item)
                const invenProduct = await db.inventory.findOne({
                    selector: {
                        _id: { $eq: item.productID }
                    }
                }).exec();
                if (invenProduct) {
                    invenProduct.update({
                        $inc: {
                            quantity: -item.quantity
                        }
                    });
                }
            });
            const remaining = (totalBill - paid - discount)
            db.sales.insert({
                'receiptID': uniqueReceiptID,
                'customerID': SelectedCustomer._id,
                'totalProducts': items.length,
                'bill': totalBill,
                'paid': parseInt(paid, 10),
                'discount': parseInt(discount, 10),
                'balance': remaining
            });
            const cust = await db.customers.findOne({
                selector: {
                    _id: { $eq: SelectedCustomer._id }
                }
            }).exec();
            cust.update({
                $set: {
                    debitAmount: remaining
                }
            });
            cancelSalesList();
            history.push('/sales');
        }
    }

    async function initDB() {
        const db = await Database.get()
        const cData = await db.customers.find().exec();
        const pData = await db.inventory.find().exec();
        setcustomers(cData);
        setproducts(pData);
    }
    useEffect(() => { initDB() }, []);

    function validate() {
        let error = false;
        if (SelectedCustomer._id === 0) {
            alert('Select a customer or Add one');
            return true;
        }
        if (items.length === 0) {
            alert("please add one product");
            return true;
        }
        items.map((item, idx) =>{ 
            if (item.price === 0) {
                alert('Product ' + (idx + 1) + ' Price is Zero')
                error = true;
            }
            if (item.quantity === 0) {
                alert('Product ' + (idx + 1) + ' Qauntity is Zero')
                error = true;
            }
            return false;
        });
        return error;
    }
    return (
        <Paper>
            <TitleHead name="New Sale"></TitleHead>
            <Toolbar>
                <Autocomplete
                    className={classes.customerSelect}
                    id="customer List"
                    freeSolo
                    getOptionLabel={(option) => option.customerName}
                    options={customers}
                    onChange={onSelectCustomerHandler}
                    renderInput={(params) => (
                        <TextField {...params} label="Customer" margin="normal" variant="standard" />
                    )}
                />
                <div style={{ flex: "1 1 100%" }}></div>
                <TextField label="Balance" margin="normal" variant="standard" value={SelectedCustomer.debitAmount} readOnly />
            </Toolbar>
            <Divider />
            <Toolbar>
                <Autocomplete
                    className={classes.productSelect}
                    id="productSelect"
                    getOptionLabel={(option) => option.productName}
                    options={products}
                    onChange={onSelectProductHandler}
                    renderInput={(params) => (
                        <TextField {...params} label="Product" margin="normal" variant="standard" />
                    )}
                />

                {products.length > 0 ?
                    <Button variant="contained" color="primary" onClick={addtoList}>Add Item</Button>
                    : <Button variant="contained" color="primary" onClick={addtoList} disabled>Add Item</Button>
                }
            </Toolbar>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Total per Item</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, idx) => <SaleItem key={idx} index={idx} item={item}></SaleItem>)}
                </TableBody>
            </Table>
            <TableContainer>
                <Table className={classes.paymentTable}>
                    <TableBody>
                        <TableRow>
                            <TableCell>Total</TableCell>
                            <TableCell>{totalBill}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Paid</TableCell>
                            <TableCell><input type="number" value={paid} onChange={(e) => setpaid(e.target.value)} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Discount</TableCell>
                            <TableCell><input type="number" value={discount} onChange={(e) => setdiscount(e.target.value)} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Remaining</TableCell>
                            <TableCell><input type="number" value={totalBill - paid - discount} readOnly /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Toolbar>
                <div className={classes.addSection}>
                </div>
                <div className={classes.submitSection}>
                    <Link className="btn btn-danger" to="/sales" onClick={cancelList}>Cancel</Link>
                    <Button variant="contained" color="primary" onClick={submitHandler} style={{ marginLeft: "10px" }}>Submit</Button>
                </div>
            </Toolbar>
        </Paper>
    )
}