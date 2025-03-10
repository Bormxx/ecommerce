import { TOrderSchema } from "@/shared/types/schemas/order";
import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, UseControllerProps } from "react-hook-form";

const cities = [
  { id: 1, name: "Москва" },
  { id: 2, name: "Санкт-Петербург" },
  { id: 3, name: "Орел" },
];

export default function ComboboxCustom({
  control,
  name,
  openFn,
}: UseControllerProps<TOrderSchema> & {
  openFn: Dispatch<SetStateAction<string>>;
}) {
  const [query, setQuery] = useState("");

  const filteredCities =
    query === ""
      ? cities
      : cities.filter((city) => {
          return city.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Controller
      control={control}
      defaultValue={cities.length ? cities[0].name : ""}
      name={name}
      render={({ field: { value, onChange, ...props }, fieldState }) => {
        return (
          <div className="border-none">
            <Combobox
              value={typeof value === "string" ? value : ""}
              onChange={(val) => {
                const currentCity = val ? val : "";
                onChange(currentCity);
                openFn(currentCity);
              }}
              onClose={() => setQuery("")}
            >
              <div className="group relative">
                <ComboboxInput
                  {...props}
                  className={cn(
                    inter.className,
                    "w-[171px] rounded-md border px-3 py-[10px] text-sm font-normal",
                    "group-hover:border-blue-600",
                    fieldState.error ? "border-red-500" : "border-gray-400",
                  )}
                  displayValue={(city: string) => city}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Город"
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 group-hover:text-blue-800">
                  <ChevronDownIcon className="size-6 transition ease-in-out group-data-[open]:rotate-180" />
                </ComboboxButton>
              </div>

              <ComboboxOptions
                anchor="bottom"
                transition
                className={cn(
                  "w-[var(--input-width)] rounded-md border border-gray-400 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
                  "mt-1 bg-white transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
                )}
              >
                {filteredCities.map((city) => (
                  <ComboboxOption
                    key={city.id}
                    value={city.name}
                    className="group flex select-none items-center gap-2 bg-white px-3 py-1.5 hover:bg-blue-100/60"
                  >
                    <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
                    <div className="text-sm/6">{city.name}</div>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Combobox>
          </div>
        );
      }}
    />
  );
}
