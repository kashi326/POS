import React from 'react';
import { Card, Typography, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#56baed',
		margin:'0 20px'
	},
}));
export default function TitleHead({ name }) {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<Typography variant="h2" align="center">
				<span style={{ padding: "10px" }}><i>{name}</i></span>
			</Typography>
		</Card>
	)
}
