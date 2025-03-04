import { roboto } from "@/app/fonts";

type FormHeaderProps = {
  children: string;
};

export default function FormHeader({ children }: FormHeaderProps) {
  return <h2 className={`${roboto.className} text-2xl`}>{children}</h2>;
}
