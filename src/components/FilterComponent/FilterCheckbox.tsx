import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Checkbox from "./Checkbox";

type FilterCheckboxProps = {
  color: string[];
  setColor: (color: string[]) => void;
};

export default function FilterCheckbox({
  color,
  setColor,
}: FilterCheckboxProps) {
  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;

    if (checked) {
      // Добавляем цвет, если он не выбран
      if (!color.includes(value)) {
        setColor([...color, value]);
      }
    } else {
      // Удаляем цвет, если чекбокс выключен
      setColor(color.filter((c) => c !== value));
    }
  }

  return (
    <div className="relative flex flex-wrap gap-4">
      <button
        className="absolute right-0 top-0 flex items-center gap-[2px] text-xs text-gray-500"
        type="button"
      >
        Все <ChevronRightIcon width={24} height={24} />
      </button>
      <Checkbox
        text="Синий"
        value="blue"
        name_group="color"
        checked={color.includes("blue")}
        onChange={handleCheckboxChange}
      />
      <Checkbox
        text="Прозрачный"
        value="no-color"
        name_group="color"
        checked={color.includes("no-color")}
        onChange={handleCheckboxChange}
      />
      <Checkbox
        text="Золотой"
        value="gold"
        name_group="color"
        checked={color.includes("gold")}
        onChange={handleCheckboxChange}
      />
      <Checkbox
        text="Красный"
        value="red"
        name_group="color"
        checked={color.includes("red")}
        onChange={handleCheckboxChange}
      />
      <Checkbox
        text="Черный"
        value="black"
        name_group="color"
        checked={color.includes("black")}
        onChange={handleCheckboxChange}
      />
      <Checkbox
        text="Зеленый"
        value="green"
        name_group="color"
        checked={color.includes("green")}
        onChange={handleCheckboxChange}
      />
    </div>
  );
}
