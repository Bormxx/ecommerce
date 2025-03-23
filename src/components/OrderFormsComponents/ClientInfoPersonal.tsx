import { useUserStore } from "@/shared/store/auth";
import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";

export default function ClientInfoPersonal() {
  const {name, surname, email} = useUserStore();

  return (
    <div className="flex sm:flex-col gap-2 justify-between sm:justify-normal">
      <p className={cn(inter.className, "text-sm sm:text-base font-normal")}>
        {name + " " + surname}
      </p>
      <p className={cn(inter.className, "text-xs sm:text-sm font-normal text-gray-500")}>
        {email}
      </p>
    </div>
  );
}
