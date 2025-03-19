import { useState, useEffect } from "react";

type RadioProps = {
  text: string;
  value: string;
  name_group: string;
  selectedValue: string; // Новый пропс для отслеживания выбранного значения
  onChange: (value: string) => void; // Функция для обработки изменения
};

export default function Radio({
  text,
  value,
  name_group,
  selectedValue,
  onChange,
}: RadioProps) {
  const [colorText, setColorText] = useState("border-gray-100 text-gray-600");
  const [colorRadio, setColorRadio] = useState("border-gray-300");
  const [colorRadioCircl, setColorRadioCircl] = useState("hidden");

  const isChecked = selectedValue === value;

  useEffect(() => {
    if (isChecked) {
      setColorText("border-blue-600 text-blue-600");
      setColorRadio("border-blue-600");
      setColorRadioCircl("block");
    } else {
      setColorText("border-gray-100 text-gray-600");
      setColorRadio("border-gray-300");
      setColorRadioCircl("hidden");
    }
  }, [isChecked]); 

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.checked ? value : "";
    onChange(newValue);
  }

  return (
    <>
      <input
        type="radio"
        id={value}
        name={name_group}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        className="hidden"
      />
      <label
        htmlFor={value}
        className={`${colorText} relative flex cursor-pointer items-center rounded-[4px] border bg-gray-100 px-3 py-1 pl-8 text-sm`}
      >
        <span
          className={`${colorRadio} absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform rounded-full border`}
        >
          <div className={`${colorRadioCircl} relative h-full w-full`}>
            <div className="absolute left-[3px] top-[3px] h-2 w-2 rounded-md bg-blue-600"></div>
          </div>
        </span>
        {text}
      </label>
    </>
  );
}
