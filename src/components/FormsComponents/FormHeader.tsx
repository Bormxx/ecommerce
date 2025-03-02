<<<<<<< HEAD
import { roboto } from "@/utils/fonts";
=======
import { roboto } from "@/app/fonts";
>>>>>>> fe131b9e578ae6bab5941a7d4478d456845c4054

type FormHeaderProps = {
  children: string;
};

export default function FormHeader({ children }: FormHeaderProps) {
  return <h2 className={`${roboto.className} text-2xl`}>{children}</h2>;
}
