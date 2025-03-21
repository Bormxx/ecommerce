import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";
import { Button } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

type CardAddButton = {
  openFn: Dispatch<SetStateAction<boolean>>;
}

export default function CardAddButton({ openFn }: CardAddButton) {
  return (
    <Button
      onClick={() => {openFn(true)}}
      className={cn(`${inter.className}`,
        "group flex sm:gap-2 gap-1 rounded sm:rounded-md sm:border border-gray-400 sm:px-4 sm:py-2 px-3 py-1",
        "text-sm sm:text-base font-normal outline-1 outline-blue-600 hover:border-blue-600 hover:text-blue-600",
        "sm:hover:outline sm:hover:bg-blue-100/60 bg-blue-100/60 sm:bg-transparent"
        )}>
      <span>Новая карта</span>
      <PlusIcon className="sm:size-6 size-5 self-center transition ease-in-out group-hover:rotate-90" />
    </Button>
  );
}
