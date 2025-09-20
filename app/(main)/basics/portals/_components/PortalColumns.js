import {
  TableActions,
  TableActionsHeader,
} from "@/components/MyUi/TableComponents";

export const portalColumns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "portalName",
    header: "Portal Name",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "appName",
    header: "App Name",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "userName",
    header: "User Name",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "password",
    header: "Password",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "memorableWord",
    header: "Memorable Word",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "portalUrl",
    header: "Portal URL",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
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
