import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";

export default function ClientInfoPersonal() {
  return (
    <div className="flex flex-col gap-2">
      <p className={cn(inter.className, "text-base font-normal")}>
        Ярополк Филибусов
      </p>
      <p className={cn(inter.className, "text-sm font-normal text-gray-500")}>
        email@email.ru
      </p>
    </div>
  );
}
