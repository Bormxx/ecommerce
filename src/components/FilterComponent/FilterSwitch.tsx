import SwitchComponent from "./SwitchComponent";

type FilterSwitchProps = {
  linzeUVDefences: boolean;
  setLinzeUVDefences: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FilterSwitch({
  linzeUVDefences,
  setLinzeUVDefences,
}: FilterSwitchProps) {
  return (
    <div className="flex flex-col gap-4">
      <SwitchComponent
        text="С УФ-фильтром"
        value="uv-filter"
        name_group="group3"
        checked={linzeUVDefences}
        onChange={setLinzeUVDefences}
      />
    </div>
  );
}
