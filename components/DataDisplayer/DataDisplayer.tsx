import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function DataDisplayer({ data }: { data: any }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        {data.map(({ col1, col2 }: any) => (
          <TableBody key={col1}>
            <TableRow key={col1}>
              <TableCell component="th" scope="row">
                {col1}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {col2}
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </TableContainer>
  );
}
