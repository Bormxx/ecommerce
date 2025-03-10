import { Switch } from "@headlessui/react";
import { useState } from "react";

type SwitchComponentProps = {
  text: string;
  value: string;
  name_group: string;
};
export default function SwitchComponent({
  text,
  value,
  name_group,
}: SwitchComponentProps) {
  const [enabledSwitch, setEnabledSwitch] = useState(false);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setEnabledSwitch(true);
    } else {
      setEnabledSwitch(false);
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
        className={`flex cursor-pointer justify-between text-sm`}
      >
        <p>{text}</p>
        <Switch
          checked={enabledSwitch}
          onChange={setEnabledSwitch}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition data-[checked]:bg-blue-800"
        >
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch>
      </label>
    </>
  );
}
