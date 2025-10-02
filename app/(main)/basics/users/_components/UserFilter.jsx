import {
  FilterMultiDelete,
  FilterReset,
  InputFilter,
} from "@/components/myUis/FilterComponents";
import { TableColVisibilitySelect } from "@/components/myUis/TableComponents";
import { cn } from "@/lib/utils";

const UserFilter = ({
  table,
  rowSelection,
  resetFilters,
  handleMultiDelete,
  loading,
}) => {
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 items-center gap-4 mb-2">
      {/* Left side: filters */}
      <InputFilter
        column={table.getColumn("userName")}
        placeholder="Search by user name"
      />

      <div className="flex flex-col items-start sm:flex-row sm:justify-between md:items-center gap-2 md:justify-end">
        {/* Hide show columns */}
        <TableColVisibilitySelect table={table} />

        {/* Right side: actions */}
        <div
          className={cn("flex items-center", rowSelection ? "gap-2" : "gap-0")}
        >
          <FilterMultiDelete
            rowSelection={rowSelection}
            handleMultiDelete={handleMultiDelete}
            loading={loading}
          />
          <FilterReset resetFilters={resetFilters} />
        </div>
      </div>
    </div>
  );
};

export default UserFilter;
