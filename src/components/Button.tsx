import React from "react";

interface ButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}
export const Button = ({ title, onClick, disabled }: ButtonProps) => {
  return (
    <div className="flex justify-end space-x-2">
      <button
        className="text-2xl px-4 py-2 bg-blue-600 disabled:bg-gray-100 text-white rounded-md hover:bg-blue-700"
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </button>
    </div>
  );
};
