import Radio from "./Radio";

type FilterRadioProps = {
  available: boolean | undefined;
  setAvailable: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

export default function FilterRadio({
  available,
  setAvailable,
}: FilterRadioProps) {
  const handleRadioChange = (value: string) => {
    if (value === "available") {
      setAvailable(true);
    } else if (value === "for-order") {
      setAvailable(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Radio
        text="В наличии"
        value="available"
        name_group="available"
        selectedValue={available === true ? "available" : ""}
        onChange={handleRadioChange}
      />
      <Radio
        text="На заказ"
        value="for-order"
        name_group="available"
        selectedValue={available === false ? "for-order" : ""}
        onChange={handleRadioChange}
      />
    </div>
  );
}
