import {
  FilterReset,
  InputFilter,
  SelectFilter,
} from "@/components/myUis/FilterComponents";
import { TableColVisibilitySelect } from "@/components/myUis/TableComponents";
import { cn } from "@/lib/utils";

const EmMenuFilter = ({ table, resetFilters }) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between flex-wrap">
      {/* Left side: filters */}
      <div className="flex flex-col gap-3 w-full md:flex-row md:flex-1 md:items-center">
        <InputFilter
          column={table.getColumn("menuName")}
          placeholder="Search by menu name"
        />

        <SelectFilter
          column={table.getColumn("portalName")}
          placeholder="Filter by portal name"
          options={emPortalsOptions}
        />
      </div>

      {/* Hide show columns */}
      <TableColVisibilitySelect table={table} />

      {/* Right side: actions */}
      <div className={cn("flex items-center", "gap-0")}>
        <FilterReset resetFilters={resetFilters} />
      </div>
    </div>
  );
};

export default EmMenuFilter;

const emPortalsOptions = [
  { label: "Public", value: "Public" },
  { label: "Admin", value: "Admin" },
  { label: "Cat", value: "Cat" },
  { label: "CatUmbraco", value: "CatUmbraco" },
  { label: "Umbraco", value: "Umbraco" },
];
