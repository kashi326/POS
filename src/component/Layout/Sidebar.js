import React from 'react';
import Link from 'react-router-dom/Link';
import './Sidebar.css';
import Grid from '@material-ui/core/Grid';
import NavigationBar from './NavigationBar';
function Sidebar(props) {
    return (
        <div>
            <NavigationBar />
            <Grid container>
                <Grid item xs={12} md={4} lg={2}>
                    <div className="sidebar">
                        <ul>
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>
                </Grid>
                <Grid item xs={12} md={8} lg={10}>
                    {props.component}
                </Grid>
            </Grid>
        </div>
    );
}
export default Sidebar;