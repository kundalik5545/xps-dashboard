"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ColumnsTable = ({ tableData }) => {
  return (
    <div className="container mx-auto overflow-x-auto grid grid-cols-1 gap-4 rounded-md border shadow-sm max-w-3xl sm:max-w-5xl">
      {tableData && tableData.length > 0 ? (
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Column Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.columnName}</TableCell>
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

export default ColumnsTable;
