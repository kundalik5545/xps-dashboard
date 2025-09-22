import {
  FilterMultiDelete,
  FilterReset,
  InputFilter,
} from "@/components/myUis/FilterComponents";
import { cn } from "@/lib/utils";

const UserFilter = ({
  table,
  rowSelection,
  resetFilters,
  handleMultiDelete,
  loading,
}) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between flex-wrap">
      {/* Left side: filters */}
      <div className="flex flex-col gap-3 w-full md:flex-row md:flex-1 md:items-center">
        <InputFilter
          column={table.getColumn("userName")}
          placeholder="Search by user name"
        />
      </div>

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
  );
};

export default UserFilter;
