import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const SimpleTable = ({ table }) => {
  return (
    <div>
      {table && table.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(table[0]).map((key, i) => (
                <TableHead key={i}>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {table.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {cell instanceof Date
                      ? cell.toLocaleString()
                      : typeof cell === "object" && cell !== null
                      ? JSON.stringify(cell)
                      : String(cell)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
};

export default SimpleTable;
