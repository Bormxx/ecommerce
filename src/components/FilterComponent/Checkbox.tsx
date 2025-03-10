import { useState } from "react";
type CheckboxProps = {
  text: string;
  value: string;
  name_group: string;
};
export default function Checkbox({ text, value, name_group }: CheckboxProps) {
  const [colorText, setColorText] = useState("border-gray-100 text-gray-800");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setColorText("border-blue-600 text-blue-600");
    } else {
      setColorText("border-gray-100 text-gray-800");
    }
  }
  return (
    <>
      <input
        type="checkbox"
        id={value}
        name={name_group}
        value={value}
        className="hidden"
        onChange={handleChange}
      />
      <label
        htmlFor={value}
        className={`${colorText} inline-block cursor-pointer rounded-[4px] border bg-gray-100 px-3 py-1 text-sm`}
      >
        {text}
      </label>
    </>
  );
}
