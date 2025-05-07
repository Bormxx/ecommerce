import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";

type CartSubmitDetailsProps = {
  children: string
}

export default function DetailsParagraph({ children }: CartSubmitDetailsProps) {
  return (
    <span className={cn(
      inter.className,
      "font-normal text-sm sm:text-base text-gray-400 sm:text-gray-500"
    )}>{children}</span>
  );
}