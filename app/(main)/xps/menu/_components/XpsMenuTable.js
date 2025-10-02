"use client";
import {
  TableHeading,
  TableNoResults,
  TableRowCellText,
} from "@/components/myUis/TableComponents";
import TablePagination from "@/components/myUis/TablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import XpsMenuFilter from "./XpsMenuFilter";

const XpsMenuTable = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const resetFilters = () => {
    setSorting([]);
    setColumnFilters([]);
    setRowSelection({});
  };

  return (
    <div>
      {/* Table Filters */}
      <XpsMenuFilter table={table} resetFilters={resetFilters} />

      {/* Table */}
      <div className="overflow-x-auto rounded-md shadow-md mt-4 p-3 border-b">
        <Table>
          <TableHeader>
            <TableHeading
              table={table}
              isTableSort={true}
              isTableHeadingCheckBox={false}
            />
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableNoResults columns={columns} />
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {/* Custom cell value or else Table Row Cell Text */}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <TableRowCellText cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Table Pagination */}
      <TablePagination table={table} />
    </div>
  );
};

export default XpsMenuTable;
