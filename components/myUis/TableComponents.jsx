"use client";

import { flexRender } from "@tanstack/react-table";
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
} from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { TableCell, TableHead, TableRow } from "../ui/table";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { Columns3 } from "lucide-react";

// Checkbox Component => For selecting all rows in the table
const TableHeadCheckBox = ({ table }) => {
  if (!table) return null;

  return (
    <TableHead className={"w-[50px]"}>
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select row"
      />
    </TableHead>
  );
};

// Table Row Cell Checkbox => For selecting individual rows in the table
const TableRowCellCheckBox = ({ row }) => {
  if (!row) return null;

  return (
    <TableCell>
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    </TableCell>
  );
};

// Sorting Icon Component => Helps to sort the table columns
const TableSortIcon = ({ header }) => {
  if (!header.column.getCanSort()) {
    return null;
  }

  return (
    <Button variant="ghost" onClick={header.column.getToggleSortingHandler()}>
      {header.column.getIsSorted() ? (
        header.column.getIsSorted() === "desc" ? (
          <ArrowDownWideNarrow className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpNarrowWide className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowDownUp className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
};

// Table Heading Text Component => For rendering the table heading text
const TableHeadingText = ({ header }) => {
  if (!header) return null;

  return (
    <span className="font-medium" key={header.id}>
      {flexRender(header.column.columnDef.header, header.getContext())}
    </span>
  );
};

// Table Row Text Component => For rendering the tables each rows cell text
const TableRowCellText = ({ cell }) => {
  if (!cell) return null;

  return (
    <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
  );
};

// No Results Component => Displayed when there are no results in the table
const TableNoResults = ({ columns }) => {
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-20 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
};

const TableHeading = ({ table, isTableSort, isTableHeadingCheckBox }) => {
  return (
    <>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {isTableHeadingCheckBox && <TableHeadCheckBox table={table} />}

          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              <TableHeadingText header={header} />
              {isTableSort && <TableSortIcon header={header} />}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </>
  );
};

const TableActions = ({ record, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-end gap-2">
      {onEdit && (
        <Button variant="success" size="icon" onClick={() => onEdit(record)}>
          <Pencil className="h-4 w-4" />
        </Button>
      )}
      {onDelete && (
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(record.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

const TableActionsHeader = () => {
  return <span className="flex items-end justify-end text-end">Actions</span>;
};

const TableColVisibilitySelect = ({ table }) => {
  if (!table) return null;

  return (
    <div className="inline-block text-left">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            <Columns3 />
            Hide Columns <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export {
  TableHeadCheckBox,
  TableHeading,
  TableHeadingText,
  TableNoResults,
  TableRowCellCheckBox,
  TableRowCellText,
  TableSortIcon,
  TableActions,
  TableActionsHeader,
  TableColVisibilitySelect,
};
