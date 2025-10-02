import Link from "next/link";

export const xpsDbTableColumns = () => [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "tableName",
    header: "XPS Table Name",
    enableSorting: true,
    enableHiding: false,
    enableColumnFilter: true,
    cell: ({ row }) => {
      const tableId = row.original.id;
      const s = row.original.tableName;
      return s ? (
        <Link href={`/database/xps-tables/${tableId}`}>{String(s)}</Link>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
];
