import React from "react";
import { Select, SelectItem, SelectTrigger } from "../ui/select";
import { SelectContent } from "../ui/select";

const SelectFilter = ({ column, placeholder = "Select...", options = [] }) => {
  const val = column?.getFilterValue() ?? "all";

  // Helper function to handle value changes
  const handleValueChange = (selectedValue) => {
    column?.setFilterValue(selectedValue === "all" ? undefined : selectedValue);
  };

  return (
    <Select value={val} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[240px] border rounded px-3 py-2 bg-white dark:bg-gray-900 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors">
        {val === "all"
          ? "All"
          : options.find((opt) => String(opt.value) === String(val))?.label ||
            placeholder}
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded shadow-lg transition-colors">
        <SelectItem
          value="all"
          className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          All
        </SelectItem>
        {options.map((opt) => (
          <SelectItem
            key={`${opt.value}-${opt.label}`}
            value={String(opt.value)}
            className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
