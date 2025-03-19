type Props = {
  text: string,
  value: string,
  name_group: string,
  extraClass?: string,
};

export default function ECCheckbox(props: Props) {
  const {
    text,
    value,
    name_group,
    extraClass
  } = props;

  return (
    <div className="inline-flex">
      <input
        type="checkbox"
        id={value}
        name={name_group}
        value={value}
        className="peer hidden"
      />
      <label
        htmlFor={value}
        className={`cursor-pointer rounded-md border px-3 py-1 text-sm transition-all 
          border-gray-300 bg-gray-100 text-gray-800 peer-checked:border-blue-600 peer-checked:text-blue-600 
          ${extraClass}`}
      >
        {text}
      </label>
    </div>
  );
}
