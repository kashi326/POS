import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, TextField, TableFooter, Button, Typography } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import { useInventoryItems } from '../../context/InventoryItemProvider';
import TitleHead from '../../component/TitleHead';


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
                <DeleteOutline onClick={() => removeItem(index)}></DeleteOutline>
            </TableCell>
        </TableRow>
    );
}

export default function AddItem() {
    const { items, addItem, cancelSalesList } = useInventoryItems();
    function cancelList() {
        cancelSalesList();
    }
    return (
        <div>
            <TitleHead name="New Sale"></TitleHead>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Serial Number</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Retail Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item, idx) => <SaleItem index={idx} item={item}></SaleItem>)}
                    </TableBody>
                    <TableFooter>
                        <TableRow >
                            <TableCell colSpan="12">
                                <Button variant="contained" color="primary" onClick={() => addItem({ serialNumber: '', name: '', description: '', retail_price: '' })}>Add Item</Button>
                                <Button variant="contained" href="/sales" onClick={cancelList} style={{ backgroundColor: "#dc3545", marginLeft: "70%" }}>Cancel</Button>
                                <Button variant="contained" onClick={() => alert("submitted")} style={{ backgroundColor: "#28a745", marginLeft: "10px" }}>Submit</Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        </div>
    )
}