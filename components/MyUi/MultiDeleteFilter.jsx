import React from "react";
import { Button } from "@/components/ui/button";
import { FunnelX } from "lucide-react";
/**
 * MultiDeleteFilter component for handling multi-row deletion and filter reset actions.
 *
 * @param {Object} props
 * @param {Object} props.rowSelection - An object representing the selected rows (keys are row IDs).
 * @param {Function} props.handleMultiDelete - Function to call when deleting selected rows.
 * @param {Function} props.resetFilters - Function to call to reset filters.
 */

const MultiDeleteFilter = ({
  rowSelection,
  handleMultiDelete,
  resetFilters,
}) => {
  return (
    <div className="flex items-center gap-2">
      {handleMultiDelete &&
        rowSelection &&
        Object.keys(rowSelection).length > 0 && (
          <Button onClick={handleMultiDelete} variant={"destructive"}>
            Delete Selected
          </Button>
        )}

      {resetFilters && (
        <Button onClick={resetFilters} variant={"outline"}>
          <FunnelX />
          Reset Filters
        </Button>
      )}
    </div>
  );
};

export default MultiDeleteFilter;
