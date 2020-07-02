import React from 'react';
import {TextField,Select, Button,Paper,FormControl, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
root:{
    width:'100%'
},
input:{
    width:'50%',
    marginLeft:'25%',
    marginBottom:'5px'
}
}));
function AddinInventory(){
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <form>
                <FormControl style={{width:'100%'}}>
                    <TextField label="Product Name" className={classes.input}/>
                    <TextField label="Serial Number" className={classes.input}/>
                    <TextField label="Quantity" type="number" className={classes.input}/>
                    <TextField label="Price" type="number" className={classes.input}/>
                    <Select  className={classes.input} multiple>
                        
                    </Select>
                    <br/>
                </FormControl>
                <Button className={classes.input} color="primary" variant="contained">Add to Inventory</Button>
            </form>
        </Paper>
    )
}
export default AddinInventory;