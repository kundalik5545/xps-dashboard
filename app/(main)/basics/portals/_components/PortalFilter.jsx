import {
  FilterMultiDelete,
  FilterReset,
  InputFilter,
  SelectFilters,
} from "@/components/MyUi/FilterComponents";

const PortalFilter = ({
  table,
  rowSelection,
  resetFilters,
  handleMultiDelete,
}) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between flex-wrap">
      {/* Left side: filters */}
      <div className="flex flex-col gap-3 w-full md:flex-row md:flex-1 md:items-center">
        <SelectFilters
          column={table.getColumn("portalName")}
          placeholder="Filter by portal Name"
          options={portalNames}
        />

        <InputFilter
          column={table.getColumn("appName")}
          placeholder="Search by app name"
        />
      </div>

      {/* Right side: actions */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-start md:justify-end">
        <FilterMultiDelete
          rowSelection={rowSelection}
          handleMultiDelete={handleMultiDelete}
        />
        <FilterReset resetFilters={resetFilters} />
      </div>
    </div>
  );
};

export default PortalFilter;

const portalNames = [
  { label: "Default", value: "Default" },
  { label: "XPS", value: "XPS" },
  { label: "eMember", value: "eMember" },
];
