import React, { useState } from 'react';
import { TextField, Button, Table, Paper, makeStyles, TableHead, TableBody, TableRow, TableCell, Typography, TableFooter } from '@material-ui/core';
import { DeleteOutlineRounded, VisibilityOffSharp } from '@material-ui/icons';
import TitleHead from '../../component/TitleHead';
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
            List.push({'id':List.length+1, 'itemName': ItemName, 'serialNumber': ItemSerailNumber });
            setItemsInList(List);
            setItemName("");
            setItemSerialNumber("");
        }
        console.log(itemsInList);
    }
    function removeItem(index) {
        let bList = [...List];
        bList.splice(index, 1);
        console.log(bList);
        setItemsInList(bList);
    }
    function cancelList() {
        setItemsInList([]);
    }
    function onChange(e,key,index){
        let bItems = [...List];
        bItems[index][key] = e.target.value;
        setItemsInList(bItems);
    }

    return (
        <div>
            <TitleHead name="Add to Inventory"></TitleHead>
            <Paper className={classes.root}>
                <form>
                    <Table size="dense">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Item Name</TableCell>
                                <TableCell>Serial Number</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {List.map((item, index) => (
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <TextField value={item.itemName} onChange={(e)=>onChange(e,'itemName',index)}></TextField>
                                    </TableCell>
                                    <TableCell>
                                        <TextField value={item.serialNumber} onChange={(e)=>onChange(e,'serialNumber',index)}/>
                                    </TableCell>
                                    <TableCell><DeleteOutlineRounded onClick={() => removeItem(index)} /></TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell>{List.length + 1}</TableCell>
                                <TableCell>
                                    <TextField label="Item Name" type="text" onChange={(e) => setItemName(e.target.value)} value={ItemName} />
                                </TableCell>
                                <TableCell>
                                    <TextField label="Serial Number" onChange={(e) => setItemSerialNumber(e.target.value)} value={ItemSerailNumber} />
                                </TableCell>
                                <TableCell><VisibilityOffSharp /></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan="12">
                                    <Button variant="contained" color="primary" onClick={AddInListHandler}>Add Item</Button>
                                    <Button variant="contained" href="/inventory" onClick={cancelList} style={{ backgroundColor: "#dc3545", marginLeft: "70%" }}>Cancel</Button>
                                    <Button variant="contained" onClick={() => alert("submitted")} style={{ backgroundColor: "#28a745", marginLeft: "10px" }}>Submit</Button>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </form>
            </Paper>
        </div>
    )
}
export default AddtoInventory;