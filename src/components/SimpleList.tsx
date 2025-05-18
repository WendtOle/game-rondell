import React, { Component, ReactNode, isValidElement } from "react";

interface SimpleListProps {
  label: string;
  items: ReactNode[];
}
export const SimpleList = ({ items, label }: SimpleListProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="text-2xl">{label}</h3>
      <ul className="pl-4 text-xl">{items}</ul>
    </div>
  );
};
