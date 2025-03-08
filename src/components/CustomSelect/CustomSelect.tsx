import { useState } from "react";

export default function CustomSelect() {
  const [selected, setSelected] = useState("Русский");
  const [open, setOpen] = useState(false);

  const options = ["Русский", "English"];

  return (
    <div className="relative w-[180px]">
      <div
        className="w-full px-[12px] py-[9px] border border-gray-400 rounded-[4px] text-[14px] font-normal leading-5 cursor-pointer bg-white"
        onClick={() => setOpen(!open)}
      >
        {selected}
      </div>

      {open && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-[12px] py-[9px] text-[14px] cursor-pointer hover:bg-gray-200"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
