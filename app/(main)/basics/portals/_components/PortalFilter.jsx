import MultiDeleteFilter from "@/components/MyUi/MultiDeleteFilter";

const PortalFilter = ({
  table,
  rowSelection,
  resetFilters,
  handleMultiDelete,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-4">{/* filters goes here */}</div>

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
