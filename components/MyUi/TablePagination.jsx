import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const TablePagination = ({ table }) => {
  if (!table) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 gap-4">
      {/* Page Size Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Rows per page:</span>
        <Select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          <SelectTrigger className={"w-[80px] "}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <span className="text-sm text-gray-700">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getState().pagination.pageCount}
        </span>

        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
