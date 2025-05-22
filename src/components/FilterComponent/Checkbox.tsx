type CheckboxProps = {
  text: string;
  value: string;
  name_group: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  text,
  value,
  name_group,
  checked,
  onChange,
}: CheckboxProps) {
  const colorText = checked
    ? "border-blue-600 text-blue-600"
    : "border-gray-100 text-gray-800";

  return (
    <>
      <input
        type="checkbox"
        id={value}
        name={name_group}
        value={value}
        className="hidden"
        checked={checked}
        onChange={onChange}
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
