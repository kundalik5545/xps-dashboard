import { Funnel } from "lucide-react";
import { Input } from "../ui/input";

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

export default InputFilter;
