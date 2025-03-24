import { TItemSchema } from "@/shared/types/schemas/item";
import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";
import { Combobox, ComboboxInput, ComboboxOptions } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { Controller, UseControllerProps } from "react-hook-form";

export const search = async (input: string) => {
  const response = await fetch(`/api/findItem`, {
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
    mutationFn: (input: string) => search(input),
    onSuccess: (data) => {
      setItems(data);
    },
  });

  return (
    <Controller
      control={control}
      defaultValue={query.length ? query : ""}
      name={name}
      render={({ field: { value, onChange, ...props } }) => {
        return (
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
                <div className="relative ">
                  <ComboboxInput
                    {...props}
                    className={cn(
                      inter.className,
                      "w-full font-normal h-9 md:h-auto",
                      "group-hover:border-blue-600 ",
                      "p-2.5 pl-[36px] rounded-[8px] md:rounded-none",
                      "flex-grow md:rounded-bl-[8px] md:rounded-tl-[8px] border-2 border-[#1E40AF] bg-white md:pl-3 md:py-2",
                    )}
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
                  className={cn(
                    "w-[var(--input-width)] rounded-md border border-gray-400 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
                    "mt-1 bg-white transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
                  )}
                >
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/item/${item.id}`}
                      className="group flex select-none items-center gap-2 bg-white px-3 py-1.5 hover:bg-blue-100/60"
                    >
                      <div className="text-sm/6">{item.title}</div>
                    </Link>
                  ))}
                </ComboboxOptions>
              </Combobox>
            </div>
          </>
        );
      }}
    />
  );
}
