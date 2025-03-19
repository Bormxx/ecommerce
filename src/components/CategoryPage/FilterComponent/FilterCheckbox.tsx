import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Checkbox from "./Checkbox";

export default function FilterCheckbox(){
    return (
      <div className="flex flex-wrap gap-4">
        <button
          className="absolute right-4 top-5 flex items-center gap-[2px] text-xs text-gray-500"
          type="button"
        >
          Все <ChevronRightIcon width={24} height={24} />
        </button>
        <Checkbox text="Синий" value="blue" name_group="color" />{" "}
        <Checkbox text="Прозрачный" value="no-color" name_group="color" />
        <Checkbox text="Золотой" value="gold" name_group="color" />
        <Checkbox text="Красный" value="red" name_group="color" />
        <Checkbox text="Черный" value="black" name_group="color" />
        <Checkbox text="Зеленый" value="green" name_group="color" />
      </div>
    );
}