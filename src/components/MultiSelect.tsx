import React, { ChangeEvent } from "react";

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  disabled?: string[];
  onChange: (selected: string[]) => void;
  getOptionLabel?: (id: string) => string | undefined;
}

export const MultiSelect = ({
  label,
  options,
  selected,
  disabled,
  onChange,
  getOptionLabel,
}: MultiSelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (!checked) {
      onChange(selected.filter((item) => item !== value));
      return;
    }
    onChange([...selected, value]);
  };
  return (
    <div>
      <p className="block text-2xl mb-2">{label}</p>
      <div className="grid grid-cols-2 gap-1 my-4">
        {options.map((option) => (
          <label key={option} className="flex items-center ">
            <input
              type="checkbox"
              value={option}
              checked={selected.includes(option)}
              onChange={handleChange}
              className="mr-4"
              disabled={disabled?.includes(option)}
            />
            <span className="text-xl italic">
              {getOptionLabel ? getOptionLabel(option) : option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
