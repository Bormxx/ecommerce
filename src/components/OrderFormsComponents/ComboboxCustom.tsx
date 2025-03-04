import { inter } from "@/app/fonts";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

const people = [
  { id: 1, name: "Москва" },
  { id: 2, name: "Санкт-Петербург" },
  { id: 3, name: "Орел" },
];

export default function ComboboxCustom() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState({id: 0, name: 'Город'});

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="border-none">
      <Combobox
        value={selected}
        onChange={(value) => setSelected(value!)}
        onClose={() => setQuery("")}
      >
        <div className="relative group">
          <ComboboxInput
            className={clsx(
              inter.className,
              "font-normal w-[171px] rounded-md border border-gray-400 py-[10px] px-3 text-sm",
              "group-hover:border-blue-600"
            )}
            displayValue={(person: { id: number; name: string }) =>
              person?.name
            }
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton  className="group absolute inset-y-0 right-0 px-2.5 group-hover:text-blue-800">
            <ChevronDownIcon className="size-6 transition ease-in-out group-data-[open]:rotate-180" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] rounded-md border border-gray-400 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "mt-1 bg-white transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          )}
        >
          {filteredPeople.map((person) => (
            <ComboboxOption
              key={person.id}
              value={person}
              className="group flex select-none items-center gap-2 bg-white px-3 py-1.5"
            >
              <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
              <div className="text-sm/6">{person.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
