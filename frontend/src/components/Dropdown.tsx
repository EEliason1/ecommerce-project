import React from "react";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: string[] | DropdownOption[];
  selected: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onChange }) => {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2"
    >
      {options.map((option) =>
        typeof option === "string" ? (
          <option key={option} value={option}>
            {option}
          </option>
        ) : (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        )
      )}
    </select>
  );
};

export default Dropdown;
