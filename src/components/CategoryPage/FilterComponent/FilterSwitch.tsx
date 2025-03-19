import SwitchComponent from "./SwitchComponent";

export default function FilterSwitch() {
  return (
    <div className="flex gap-4 flex-col">
      <SwitchComponent text="Option 1" value="option1" name_group="group3" />
      <SwitchComponent text="Option 2" value="option2" name_group="group3" />
      <SwitchComponent text="Option 3" value="option3" name_group="group3" />
    </div>
  );
}
