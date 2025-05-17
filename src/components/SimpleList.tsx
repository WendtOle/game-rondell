import React from "react";

interface SimpleListProps {
  label: string;
  items: Array<{ label: string; id: string }>;
}
export const SimpleList = ({ items, label }: SimpleListProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="text-2xl">{label}</h3>
      <ul className="list-disc list-inside pl-4">
        {items.map((item) => (
          <li key={item.id} className="text-xl">
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
