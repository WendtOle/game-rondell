import React, { ReactElement } from "react";

interface ListProps<T> {
  items: T[];
  itemRenderer: (item: T) => ReactElement;
  getId: (item: T) => string;
  isSelected?: (item: T) => boolean;
  onClick?: (item: T) => void;
}

export const List = <T,>({
  items,
  itemRenderer,
  getId,
  isSelected,
  onClick,
}: ListProps<T>) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li
            key={getId(item)}
            className={`p-4 transition-colors cursor-pointer ${
              isSelected?.(item)
                ? "bg-blue-50 border-l-4 border-blue-500"
                : "hover:bg-gray-50 border-l-4 border-transparent"
            }`}
            onClick={() => onClick?.(item)}
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

/*

    <div className="mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {games.map((game) => (
            <li
              key={game.id}
              className={`p-4 transition-colors cursor-pointer ${
                (selected ?? []).includes(game.id)
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : "hover:bg-gray-50 border-l-4 border-transparent"
              }`}
              onClick={() => onSelectGame?.(game.id)}
            >
              <div className="flex justify-between items-start">

              */
