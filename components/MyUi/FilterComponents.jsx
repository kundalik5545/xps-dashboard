import { FunnelX } from "lucide-react";
import { Button } from "../ui/button";
import { Funnel } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "../ui/select";

const FilterMultiDelete = ({ rowSelection, handleMultiDelete }) => {
  return (
    <div>
      {handleMultiDelete &&
        rowSelection &&
        Object.keys(rowSelection).length > 0 && (
          <Button onClick={handleMultiDelete} variant={"destructive"}>
            Delete Selected
          </Button>
        )}
    </div>
  );
};

const FilterReset = ({ resetFilters }) => {
  return (
    <div>
      {resetFilters && (
        <Button onClick={resetFilters} variant={"outline"}>
          <FunnelX />
          Reset Filters
        </Button>
      )}
    </div>
  );
};

const InputFilter = ({ column, placeholder = "Search..." }) => {
  const value = column?.getFilterValue() || "";

  return (
    <div className="relative max-w-xs">
      <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
        <Funnel className="w-4 h-4 text-muted-foreground" />
      </div>
      <Input
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={(e) => column?.setFilterValue(e.target.value)}
        className="pl-9"
      />
    </div>
  );
};

const SelectFilter = ({ column, placeholder = "Select...", options = [] }) => {
  const val = column?.getFilterValue() ?? "all";

  // Helper function to handle value changes
  const handleValueChange = (selectedValue) => {
    if (!column) return;
    column.setFilterValue(selectedValue === "all" ? "" : selectedValue);
  };

  return (
    <Select value={val} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[240px]">
        {val === "all"
          ? "All"
          : options.find((opt) => String(opt.value) === String(val))?.label ||
            placeholder}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {options.map((opt) => (
          <SelectItem
            key={`${opt.value}-${opt.label}`}
            value={String(opt.value)}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const SelectFilters = ({ column, options = [], placeholder = "Select..." }) => {
  const val = column?.getFilterValue() ?? "";

  return (
    <Select
      value={val === "" ? undefined : String(val)}
      onValueChange={(selectedValue) => {
        if (!column) return;
        column.setFilterValue(selectedValue === "all" ? "" : selectedValue);
      }}
    >
      <SelectTrigger className="w-[240px]">
        {val === "all"
          ? "All"
          : options.find((opt) => String(opt.value) === String(val))?.label ||
            placeholder}
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All</SelectItem>

        {options.map((opt) => (
          <SelectItem key={String(opt.value)} value={String(opt.value)}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export {
  FilterMultiDelete,
  FilterReset,
  InputFilter,
  SelectFilter,
  SelectFilters,
};
