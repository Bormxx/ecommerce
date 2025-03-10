import { inter } from "@/styles/fonts";
import { Button } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function CardAddButton() {
  return (
    <Button
      onClick={() => {}}
      className={`${inter.className} group flex gap-2 rounded-md border border-gray-400 px-4 py-2 text-base font-normal outline-1 outline-blue-600 hover:border-blue-600 hover:text-blue-600 hover:outline hover:bg-blue-100/60`}
    >
      <span>Новая карта</span>
      <PlusIcon className="size-6 transition ease-in-out group-hover:rotate-90" />
    </Button>
  );
}
