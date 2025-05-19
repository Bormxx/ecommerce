import SwitchComponent from "./SwitchComponent";

export default function FilterSwitch() {
  return (
    <div className="flex flex-col gap-4">
      <SwitchComponent
        text="С УФ-фильтром"
        value="С УФ-фильтром"
        name_group="group3"
      />
    </div>
  );
}
