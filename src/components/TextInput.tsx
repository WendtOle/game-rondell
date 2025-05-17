import React, { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextInput = ({ label, ...props }: TextInputProps) => {
  return (
    <label className="block text-2xl">
      {label}
      <input
        {...props}
        className="mt-1 block text-xl w-full p-2 border border-gray-300 rounded-md"
      />
    </label>
  );
};
