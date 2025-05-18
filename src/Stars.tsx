import React from "react";

export const Stars = ({ amount }: { amount: number }) => {
  return (
    <div className="flex">
      {[...Array(amount)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-500 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
};
