import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";

type ErrorMessageProp = {
  text: string;
  font: string;
};

export default function ErrorMessage(prop: ErrorMessageProp) {
  return (
    <p className={cn(inter.className, `text-${prop.font} font-normal text-red-500`)}>
      {prop.text}
    </p>
  );
}
