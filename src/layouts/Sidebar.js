import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { Collapse } from '@material-ui/core';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            textDecoration: 'none',
            color: 'orange'

        }
    },
    icons: {
        minWidth: '20px'
    },
}));

function Sidebar(props) {
    const classes = useStyles();
    // Drawer section
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    // End Drawer Section
    // Dropdowns Section
        //Inventory handler
    const [isInventoryOpen, setInventoryOpen] = React.useState(false);
    const InventoryhandleClick = () => {
        setInventoryOpen(!isInventoryOpen);
    };

        //Sales Handler
    const [isSaleOpen, setSaleOpen] = React.useState(false);

    const SalehandleClick = () => {
        setSaleOpen(!isSaleOpen);
    };
// End Dropdown Section
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Rayyan CCTV
                    </Typography>
                    <div style={{ flexGrow: 1 }}></div>
                    <Typography variant="subtitle1"><Link className={classes.link} to="/" style={{ textDecoration: 'none', color: 'white' }}>Login</Link></Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                {/* Home section */}
                <List alignItems="flex-start">
                    <Link className={classes.link} to="/home" >
                        <ListItem button>

                            <ListItemText>Home</ListItemText>
                        </ListItem>
                    </Link>
                    {/* End Home Section */}
                    {/* Inventory Section */}
                    <ListItem button onClick={InventoryhandleClick} style={isInventoryOpen? {backgroundColor:'lightgrey'}:{backgroundColor:'white'}}>
                        <ListItemText primary="Inventory" />
                        {isInventoryOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={isInventoryOpen} timeout="auto" unmountOnExit>
                        <List component="div" >
                            <Link to="/inventory" className={classes.link}>
                                <ListItem button >
                                    <ListItemIcon className={classes.icons}></ListItemIcon>
                                    <ListItemText primary="Inventory" />
                                </ListItem>
                            </Link>
                            <Link to="/inventory/add" className={classes.link}>
                                <ListItem button >
                                    <ListItemIcon className={classes.icons}><AddIcon /></ListItemIcon>
                                    <ListItemText primary="Add to Inventory" />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>
                    {/* End inventory Section */}
                    {/* Sales sections */}
                    <ListItem button onClick={SalehandleClick} style={isSaleOpen? {backgroundColor:'lightgrey'}:{backgroundColor:'white'}}>
                        <ListItemText primary="Sales" />
                        {isSaleOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={isSaleOpen} timeout="auto" unmountOnExit>
                        <List component="div" >
                            <Link to="/sales" className={classes.link}>
                                <ListItem button className={classes.nested} >
                                    <ListItemIcon className={classes.icons}></ListItemIcon>
                                    <ListItemText primary="Sales" />
                                </ListItem>
                            </Link>
                            <Link to="/sales/add" className={classes.link}>
                                <ListItem button >
                                    <ListItemIcon className={classes.icons}><AddIcon /></ListItemIcon>
                                    <ListItemText primary="Add to Sales" />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>

                    {/* End Sales Section */}
                    {/* Customer Section */}
                    <Link className={classes.link} to="#">
                        <ListItem button>

                            <ListItemText primary="Customer" />

                        </ListItem>
                    </Link>

                    {/* End Customer Section */}
                    {/* Expense Section */}
                    <Link className={classes.link} to="#">
                        <ListItem button>

                            <ListItemText>Expense</ListItemText>
                        </ListItem>
                    </Link>
                    {/* End Expense Section */}
                    {/* Login Section */}
                    <Link className={classes.link} to="/">
                        <ListItem button>

                            <ListItemText>Login</ListItemText>
                        </ListItem>
                    </Link>

                    {/* End Login Section */}
                </List>
                <Divider />
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
                style={{background: 'lightgray', minHeight: '100vh'}}
            >
                <div className={classes.drawerHeader} />
                {props.component}
            </main>
        </div >
    );
}
export default Sidebar;
