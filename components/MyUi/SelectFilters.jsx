import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";

const SelectFilters = ({ column, options = [], placeholder = "Select..." }) => {
  const val = column?.getFilterValue() ?? "";

  return (
    <Select
      value={val}
      onValueChange={(values) => (values === "all" ? "" : values)}
    >
      <SelectTrigger className={"w-[240px]"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {options.map((opt, index) => (
          <SelectItem key={index} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilters;
