import InputFilter from "@/components/MyUi/InputFilter";
import MultiDeleteFilter from "@/components/MyUi/MultiDeleteFilter";
import SelectFilters from "@/components/MyUi/SelectFilters";

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

          <SelectFilters
            column={table.getColumn("portalUrl")}
            placeholder="Filter by portal URL"
            options={portalUrlOptions}
          />
        </div>

        {/* Reset filter and onMultiDelete buttons */}
        <MultiDeleteFilter
          rowSelection={rowSelection}
          handleMultiDelete={handleMultiDelete}
          resetFilters={resetFilters}
        />
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
