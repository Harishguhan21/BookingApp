import * as React from "react";

const OptionSelector = ({
  label,
  count,
  onIncrement,
  onDecrement,
}: {
  label: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-lg font-semibold">{label}</div>
      <div className="flex items-center">
        <button
          onClick={onDecrement}
          disabled={count === 0}
          className="px-3 py-1 bg-gray-300 rounded-l-md"
        >
          -
        </button>
        <div className="mx-3">{count}</div>
        <button
          onClick={onIncrement}
          className="px-3 py-1 bg-gray-300 rounded-r-md"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default OptionSelector;
