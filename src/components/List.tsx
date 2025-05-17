import React, { ReactElement } from "react";

interface ListProps<T> {
  items: T[];
  itemRenderer: (item: T) => ReactElement;
  getId: (item: T) => string;
  isSelected?: (item: T) => boolean;
}

export const List = <T,>({
  items,
  itemRenderer,
  getId,
  isSelected,
}: ListProps<T>) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li
            key={getId(item)}
            className={`p-4 transition-colors ${
              isSelected?.(item)
                ? "bg-blue-50 border-l-4 border-blue-500"
                : "hover:bg-gray-100 border-l-4 border-transparent"
            }`}
          >
            <div className="flex justify-between items-start">
              {itemRenderer(item)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
