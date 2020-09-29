import React, { useState } from 'react'
import { Avatar } from '@material-ui/core';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
    { id: "num", label: "#", minWidth: 20 },
    { id: "img", label: "Avatar", minWidth: 40, format: (value) => value },
    { id: "name", label: "Name", minWidth: 120 },
    { id: "type", label: "Type", minWidth: 60 },
    { id: "weaknesses", label: "Weaknesses", minWidth: 100 }
];

function Pokemon({ pokemons, handlePokemonClick }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <TableContainer>
                <Table stickyHeader className="table">
                    <TableHead className="tableHead">
                        <TableRow className="tableHeadRow">
                            {columns.map((column) => (
                                <TableCell className="tableHeadCell"
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pokemons
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow className="tableRow"
                                        hover
                                        tabIndex={-1}
                                        key={row.num}
                                        onClick={(event) => handlePokemonClick(event, row)}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell className="tableCell" key={column.id} align={column.align}>
                                                    {column.id === "img"
                                                        ? <Avatar src={ value } />
                                                        : value + " "}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={pokemons.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default Pokemon
