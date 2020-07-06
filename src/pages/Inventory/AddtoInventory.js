import React, { useState } from 'react';
import { TextField, Button, Table, Paper, makeStyles, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    input: {
        width: '50%',
        marginLeft: '25%',
        marginBottom: '5px'
    }
}));
function AddtoInventory() {
    const classes = useStyles();
    const [itemsInList, setItemsInList] = useState([]);
    const [ItemName, setItemName] = useState("");
    const [ItemSerailNumber, setItemSerialNumber] = useState("");
    let List = itemsInList;
    function AddInListHandler() {
        if (ItemName === "" || ItemSerailNumber === "") {

        } else {
            List.push({ 'itemName': ItemName, 'serialNumber': ItemSerailNumber });
            setItemsInList(List);
            setItemName("");
            setItemSerialNumber("");
        }
        console.log(itemsInList);
    }
    return (
        <Paper className={classes.root}>
            <Typography variant="h4" component="h3">Add to Inventory</Typography>
            <form>
                <Table size="dense">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Serial Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {List.map((item) => (
                            <TableRow>
                                <TableCell>
                                    {item.itemName}
                                </TableCell>
                                <TableCell>
                                    {item.serialNumber}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>
                                <TextField label="Item Name" type="text" onChange={(e) => setItemName(e.target.value)} value={ItemName} />
                            </TableCell>
                            <TableCell>
                                <TextField label="Serial Number" onChange={(e) => setItemSerialNumber(e.target.value)} value={ItemSerailNumber} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <Button onClick={AddInListHandler}>Add</Button>

                </Table>
            </form>
            <Button onClick={()=> alert("submitted")}>submit</Button>
        </Paper>
    )
}
export default AddtoInventory;