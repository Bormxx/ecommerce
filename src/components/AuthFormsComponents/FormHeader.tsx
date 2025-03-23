import { cn } from "@/shared/utils/frontend/cn";
import { roboto } from "@/styles/fonts";


type FormHeaderProps = {
  children: string;
  styles?: string;
};

export default function FormHeader({ children, styles }: FormHeaderProps) {
  return <h2 className={cn(roboto.className,  styles ? styles : "text-2xl")}>{children}</h2>;
}
