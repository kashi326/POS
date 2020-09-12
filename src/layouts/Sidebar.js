import React, { useState } from 'react';
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
import { Link, Redirect, useHistory } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import * as Database from '../services/datastore2'
import { Collapse,Button } from '@material-ui/core';
import { useEffect } from 'react';
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
    let state = sessionStorage.getItem('sidebar') === "true" ? true : false;
    let isLogined = sessionStorage.getItem('isLogined');
    const [open, setOpen] = React.useState(state);
    let history = useHistory();
    useEffect(() => {
        sessionStorage.setItem('sidebar', open);
    }, [open]);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const setting = JSON.parse(sessionStorage.getItem('setting')||'{}');
    const sidebarLinks = [
        {
            name: 'Home',
            path: '/home',
        },
        {
            name: 'Inventory',
            path: '',
            children: [
                {
                    name: 'Inventory',
                    path: '/inventory'
                },
                {
                    name: 'Add to Inventory',
                    path: '/inventory/add'
                }
            ]
        },
        {
            name: 'Sales',
            path: '',
            children: [
                {
                    name: 'Sales',
                    path: '/sales'
                },
                {
                    name: 'Add to Sale',
                    path: '/sales/add'
                }
            ]
        },
        {
            name: 'Purchases',
            path: '',
            children: [
                {
                    name: 'Purchases',
                    path: '/purchase'
                },
                {
                    name: 'Add to Purchases',
                    path: '/purchase/add'
                }
            ]
        },
        {
            name: 'Customers',
            path: '/customers'
        },
        {
            name: 'Setting',
            path: '',
            children: [
                {
                    name: 'Setting',
                    path: '/setting'
                },
                {
                    name: 'Admin',
                    path: '/admin'
                },
                {
                    name:'Backup',
                    path:'/backup'
                },
                {
                    name:'Restore Backup',
                    path:'/restorebackup'
                }
            ]
        },
        {
            name: 'Logout',
            path: '/'
        },
    ];
    function logout(){
        sessionStorage.clear();
        history.push('/login');
    }
    if (isLogined !== 'true')
        return (<Redirect to='/' />)

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
                        {setting.shopName}
                    </Typography>
                    <div style={{ flexGrow: 1 }}></div>
                    <Typography variant="subtitle1"><Link to="" className={classes.link} onClick={logout} style={{ textDecoration: 'none', color: 'white' }}>Sign Out</Link></Typography>
                    <Typography variant="subtitle1"><Button className={classes.link} onClick={() => Database.remove()} style={{ textDecoration: 'none', color: 'white' }}>Drop Database</Button></Typography>
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
                {/* Sidebar Component */}
                {sidebarLinks.map((item, idx) => <SidebarComponent item={item} key={idx} />)}
                <Divider />
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
                style={{ background: 'lightgray', height: '100vh' }}
            >
                <div className={classes.drawerHeader} />
                {props.component}
            </main>
        </div >
    );
}
function SidebarComponent({ item }) {
    const classes = useStyles();
    const [isDropdownOpen, setisDropdownOpen] = useState(false);
    return (
        item.children ?
            <div>
                <ListItem button onClick={() => setisDropdownOpen(!isDropdownOpen)} style={isDropdownOpen ? { backgroundColor: 'lightgrey' } : { backgroundColor: 'white' }}>
                    <ListItemText primary={item.name} />
                    {isDropdownOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={isDropdownOpen} timeout="auto" unmountOnExit>
                    <List component="div" >
                        {item.children.map((ele, idx) =>
                            <Link to={ele.path} className={classes.link} key={idx}>
                                <ListItem button >
                                    <ListItemIcon className={classes.icons}></ListItemIcon>
                                    <ListItemText primary={ele.name} />
                                </ListItem>
                            </Link>
                        )}
                    </List>
                </Collapse>
            </div>
            :
            <Link className={classes.link} to={item.path}>
                <ListItem button>
                    <ListItemText primary={item.name} />
                </ListItem>
            </Link>

    )
}
export default Sidebar;
