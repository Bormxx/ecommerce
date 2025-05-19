import { Switch } from "@headlessui/react";

type SwitchComponentProps = {
  text: string;
  value: string;
  name_group: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export default function SwitchComponent({
  text,
  value,
  checked,
  onChange,
}: SwitchComponentProps) {
  return (
    <label
      htmlFor={value}
      className={`flex cursor-pointer justify-between text-sm`}
    >
      <p>{text}</p>
      <Switch
        checked={checked}
        onChange={onChange}
        className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition data-[checked]:bg-blue-800"
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
      </Switch>
    </label>
  );
}
