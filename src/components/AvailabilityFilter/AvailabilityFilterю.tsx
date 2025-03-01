import React from "react";


const AvailabilityFilter: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {/* <input
        type="radio"
        id="available"
        name="available"
        value="available"
        checked={selectedColor === "available"}
        onChange={() => setSelectedColor("available")}
        className="hidden"
      />
      <label
        htmlFor="available"
        className={`${
          selectedColor === "available"
            ? "border-blue-600 text-blue-600"
            : "border-gray-100 text-gray-600"
        } relative flex cursor-pointer items-center rounded-[4px] border bg-gray-100 px-3 py-1 pl-8 text-sm`}
      >
        <span
          className={`${
            selectedColor === "available"
              ? "border-blue-600"
              : "border-gray-300"
          } absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform rounded-full border`}
        >
          <div
            className={`${
              selectedColor === "available" ? "block" : "hidden"
            } relative h-full w-full`}
          >
            <div className="absolute left-[3px] top-[3px] h-2 w-2 rounded-md bg-blue-600"></div>
          </div>
        </span>
        Есть в наличии
      </label> */}
    </div>
  );
};

export default AvailabilityFilter;
