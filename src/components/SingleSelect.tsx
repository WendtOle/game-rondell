import React, { DetailedHTMLProps, SelectHTMLAttributes } from "react";

interface SingleSelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label: string;
  options: string[];
  getOptionLabel?: (id: string) => string | undefined;
}

export const SingleSelect = ({
  label,
  options,
  getOptionLabel,
  ...props
}: SingleSelectProps) => {
  return (
    <label className="block text-2xl">
      {label}
      <select
        {...props}
        className="mt-1 block text-xl w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">Bitte wählen</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {getOptionLabel ? getOptionLabel(option) : option}
          </option>
        ))}
      </select>
    </label>
  );
};
