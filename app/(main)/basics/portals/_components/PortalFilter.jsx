import {
  FilterMultiDelete,
  FilterReset,
  InputFilter,
  SelectFilter,
  SelectFilters,
} from "@/components/MyUi/FilterComponents";

const PortalFilter = ({
  table,
  rowSelection,
  resetFilters,
  handleMultiDelete,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-4">
          {/* filters goes here */}

          <InputFilter
            column={table.getColumn("portalName")}
            placeholder="Search by portal name"
          />

          <InputFilter
            column={table.getColumn("appName")}
            placeholder="Search by app name"
          />

          <SelectFilter
            column={table.getColumn("portalUrl")}
            placeholder="Filter by portal URL"
            options={portalUrlOptions}
          />

          <SelectFilters
            column={table.getColumn("portalUrl")}
            placeholder="Filter by portal URL"
            options={portalUrlOptions}
          />
        </div>

        {/* Reset filter and onMultiDelete buttons */}
        <div className="flex items-center gap-2">
          <FilterMultiDelete
            rowSelection={rowSelection}
            handleMultiDelete={handleMultiDelete}
          />

          <FilterReset resetFilters={resetFilters} />
        </div>
      </div>
    </div>
  );
};

export default PortalFilter;

const portalUrlOptions = [
  { value: "url1", label: "url1" },
  { value: "url2", label: "url2" },
  { value: "url3", label: "url3" },
];
