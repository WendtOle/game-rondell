import React from "react";

interface ButtonProps {
  title: string;
  onClick: () => void;
}
export const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <div className="flex justify-end space-x-2">
      <button
        className="text-4xl px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};
