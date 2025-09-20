import {
  TableHeading,
  TableNoResults,
  TableRowCellCheckBox,
  TableRowCellText,
} from "@/components/MyUi/TableComponents";
import TablePagination from "@/components/MyUi/TablePagination";
import { Button } from "@/components/ui/button";
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
import PortalFilter from "./PortalFilter";

const PortalTable = ({ data, columns, onEdit, onDelete, onMultiRowDelete }) => {
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

  const handleMultiDelete = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row) => row.original.id);
    onMultiRowDelete(selectedIds);
  };

  const resetFilters = () => {
    setSorting([]);
    setColumnFilters([]);
    setRowSelection({});
  };

  return (
    <div>
      {/* Table Filters */}
      <PortalFilter
        table={table}
        rowSelection={rowSelection}
        resetFilters={resetFilters}
        handleMultiDelete={handleMultiDelete}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-md shadow-md mt-4">
        <Table>
          <TableHeader>
            <TableHeading table={table} isTableSort={true} />
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {!data.length > 0 ? (
              <TableNoResults columns={columns} />
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {/* To Select Individual Row */}
                  <TableRowCellCheckBox row={row} />

                  {/* Custome cell value or else Table Row Cell Text */}
                  {row.getVisibleCells().map((cell) => {
                    const columnId = cell.column.id;

                    return (
                      <TableCell key={cell.id}>
                        {columnId === "portalUrl" ? (
                          <Button
                            className={"text-blue-600 underline cursor-pointer"}
                            variant="link"
                            onClick={() =>
                              window.open(cell.getValue(), "_blank")
                            }
                          >
                            Visit Portal
                          </Button>
                        ) : (
                          <TableRowCellText cell={cell} />
                        )}
                      </TableCell>
                    );
                  })}
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

export default PortalTable;
