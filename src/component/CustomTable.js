import React from 'react';
import { TableContainer, Table, TableBody, TableHead, TableCell, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';

function CustomTable({ rowsName, rowsData }) {
    return (
        <TableContainer style={{backgroundColor:'white'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            // rowsName.map((row) => (
                            //     <TableRow>
                            //         <TableCell>{row.id}</TableCell>
                            //         <TableCell>{row.name}</TableCell>
                            //         <TableCell>{row.quantity}</TableCell>
                            //         <TableCell>{row.price}</TableCell>
                            //     </TableRow>
                            // )
                            // )
                            rowsName.map((row) => (
                                Object.entries(row).map((element) => (
                                    <TableCell align="center">{element[1]}</TableCell>
                                ))
                            ))

                        }
                    </TableRow>
                </TableHead>
                <TableBody>{
                    rowsData.map((row) => (
                        <TableRow key={row[0]}>
                            {Object.entries(row).map((element) => (
                                <TableCell align="center">{element[1]}</TableCell>
                            ))}
                        </TableRow>
                    )
                    )
                }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
CustomTable.propTypes = {
    rowsName: PropTypes.isRequired,
    rowsData: PropTypes.isRequired,
  };
export default CustomTable;