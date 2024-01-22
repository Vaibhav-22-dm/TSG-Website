import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(field, value) {
  return { field, value };
}

const rows = [
  createData("Course", "N/A"),
  createData("Department", "N/A"),
  createData("Hall of Residence", "N/A"),
  createData("EAA", "N/A"),
  createData("Contact", "N/A"),
];

export default function proftab1() {
  console.log(tableCellClasses.root);
  return (
    <TableContainer component={Paper} sx={{boxShadow:'none', width: 'auto'}}>
      <Table
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
            width: 'auto'
          },
        }}
      >
        <TableBody sx={{width: '500px'}}>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{width: 'max-content'}} align="left">{row.field}</TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
