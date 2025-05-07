import { TItemSchema } from "@/shared/types/schemas/item";
import { Combobox, ComboboxInput, ComboboxOptions } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { Controller, UseControllerProps } from "react-hook-form";

export const search = async (input: string) => {
  const response = await fetch(`/api/searchProducts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: input }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

type SearchFieldProps = {
  query: string;
  items: TItemSchema[];
  setQuery: Dispatch<SetStateAction<string>>;
  setItems: Dispatch<SetStateAction<TItemSchema[]>>;
};

export default function SearchField({
  control,
  name,
  query,
  items,
  setQuery,
  setItems,
}: UseControllerProps<{ input: string }> & SearchFieldProps) {
  const mutation = useMutation({
    mutationFn: async (input: string) => {
      const response = await fetch("/api/searchProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });
      if (!response.ok) {
        throw new Error("Ошибка при поиске");
      }
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setItems(data);
    },
  });

  return (
    <Controller
      control={control}
      defaultValue={query.length ? query : ""}
      name={name}
      render={({ field: { value, onChange, ...props } }) => (
        <>
          <div className="w-full border-none">
            <Combobox
              value={typeof value === "string" ? value : ""}
              onChange={(val) => {
                const currentCity = val ? val : "";
                onChange(currentCity);
              }}
              immediate
            >
              <div className="relative">
                <ComboboxInput
                  {...props}
                  className="h-9 w-full flex-grow rounded-[8px] border-2 border-[#1E40AF] bg-white p-2.5 pl-[36px] font-normal group-hover:border-blue-600 md:h-auto md:rounded-none md:rounded-bl-[8px] md:rounded-tl-[8px] md:py-2 md:pl-3"
                  displayValue={() => query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    mutation.mutate(event.target.value);
                  }}
                  placeholder="Искать"
                />
                <div className="absolute left-0 top-0 p-2.5 md:hidden">
                  <MagnifyingGlassIcon width={16} height={16} />
                </div>
              </div>
              <ComboboxOptions
                anchor="bottom"
                transition
                className="mt-1 w-[var(--input-width)] rounded-md border border-gray-400 bg-white p-1 transition duration-100 ease-in [--anchor-gap:var(--spacing-1)] empty:invisible data-[leave]:data-[closed]:opacity-0"
              >
                {items.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/item/${item.id}`}
                    className={`group flex select-none items-center gap-2 bg-white px-3 py-1.5 hover:bg-blue-100/60 ${
                      index < items.length - 1 ? "border-b border-blue-500" : "" // Линия только между ссылками
                    }`}
                  >
                    <div className="text-sm/6">{item.title}</div>
                  </Link>
                ))}
              </ComboboxOptions>
            </Combobox>
          </div>
        </>
      )}
    />
  );
}
