import React from 'react';
import { Paper, Typography } from '@material-ui/core';

export default function TitleHead({ name }) {
    return (
        <Paper style={{ marginBottom: '5px' }}>
            <Typography variant="h2" align="center">
                <h2 style={{ padding: "15px" }}>{name}</h2>
            </Typography>
        </Paper>
    )
}
