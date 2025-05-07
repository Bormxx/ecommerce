import { useState } from "react";
import Image from "next/image";

export default function CustomSelect() {
  const [selected, setSelected] = useState("Русский");
  const [open, setOpen] = useState(false);
  const options = ["Русский", "English"];

  return (
    <div className="relative md:w-[180px]">
      <div
        className="w-full px-[10px] md:px-[12px] py-[7px] md:py-[9px] border border-gray-400 rounded-[4px] font-normal text-[12px] leading-4 md:text-[14px] md:leading-5 cursor-pointer bg-white flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        {selected}
        <Image
          src="icons/list_arrow.svg"
          alt="Arrow"
          width={16}
          height={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <ul className="absolute mt-1 w-full bg-white rounded-[8px] shadow-md z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-[10px] md:px-[12px] py-[7px] md:py-[9px] text-[12px] md:text-[14px] cursor-pointer hover:bg-[#F3F4F6]"
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
