import {
  TableActions,
  TableActionsHeader,
} from "@/components/myUis/TableComponents";

export const userColumns = ({ onEdit, onDelete, onView } = {}) => [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
    meta: { hidden: true },
  },
  {
    accessorKey: "eMemberId",
    header: "eMember ID",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "xpsId",
    header: "XPS ID",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "userHashId",
    header: "Hash ID",
    enableSorting: false,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "userName",
    header: "User Name",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "password",
    header: "Password",
    enableSorting: false,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "userEmail",
    header: "Email",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "xpsSchemeId",
    header: "XPS Scheme",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "eMemberSchemeId",
    header: "eMember Scheme",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "niNumber",
    header: "NI Number",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const v = row.original.dob;
      if (!v) return <span className="text-muted-foreground">-</span>;
      try {
        const d = new Date(v);
        return d.toLocaleDateString();
      } catch {
        return <span className="text-muted-foreground">-</span>;
      }
    },
  },
  {
    accessorKey: "statusId",
    header: "Status",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const s = row.original.statusId;
      // If you have a status map, replace this with mapped label + color
      return s ? (
        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-white/6">
          {String(s)}
        </span>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const v = row.original.createdAt;
      if (!v) return <span className="text-muted-foreground">-</span>;
      try {
        const d = new Date(v);
        return d.toLocaleString();
      } catch {
        return <span className="text-muted-foreground">-</span>;
      }
    },
  },
  {
    id: "actions",
    header: () => <TableActionsHeader />,
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const record = row.original;
      return (
        <TableActions record={record} onEdit={onEdit} onDelete={onDelete} />
      );
    },
  },
];
