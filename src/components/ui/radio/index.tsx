type Props = {
  text: string;
  value: string;
  name_group: string;
  selectedValue: string;
  onChange: (value: string) => void;
};

export default function ECRadio(props: Props) {
  const { text, value, name_group, selectedValue, onChange } = props;
  const isChecked = selectedValue === value;

  return (
    <div className="inline-flex items-center">
      <input
        type="radio"
        id={value}
        name={name_group}
        value={value}
        checked={isChecked}
        onChange={() => onChange(value)}
        className="peer hidden"
      />
      <label
        htmlFor={value}
        className="relative flex cursor-pointer items-center rounded-md border border-gray-300 bg-gray-100 px-3 py-1 pl-8 text-sm text-gray-600 transition-all peer-checked:border-blue-600 peer-checked:text-blue-600"
      >
        <span className="absolute left-2 top-1/2 flex h-4 w-4 -translate-y-1/2 transform items-center justify-center rounded-full border border-gray-300 peer-checked:border-blue-600">
          <span className="h-2 w-2 rounded-full bg-blue-600 opacity-0 transition-opacity peer-checked:opacity-100"></span>
        </span>
        {text}
      </label>
    </div>
  );
}
