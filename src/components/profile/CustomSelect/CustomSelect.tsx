import { useState } from "react";
import { ECDropdownButton } from "@/components/ui/dropdown/ECDropdownButton";
import { ECDropdownContent } from "@/components/ui/dropdown/ECDropdownContent";
import { ECDropdownItem } from "@/components/ui/dropdown/ECDropdownItem";

export default function CustomSelect() {
  const [selected, setSelected] = useState("Русский");
  const [open, setOpen] = useState(false);
  const options = ["Русский", "English"];

  return (
    <div className="relative w-[180px]">
      <ECDropdownButton value={selected} open={open} onClick={() => setOpen(prev => !prev)} />

      {open && (
        <ECDropdownContent>
          <>
            {options.map((option, index) => (
              <ECDropdownItem
                index={index}
                option={option}
                onClick={() => {
                  setSelected(option);
                  setOpen(false);
                }}
              />
            ))}
          </>
        </ECDropdownContent>
      )}
    </div>
  );
}
