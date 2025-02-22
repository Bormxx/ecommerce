import MainBackground from "@/components/FormsComponents/MainBackground";
import RegistrForm from "@/components/Registration/RegistrForm";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex">
        <ShoppingBagIcon className="size-16 text-blue-400"/>
        <Link href={"/auth"} className="size-16 bg-slate-500">Auth</Link>
        <Link href={"/registration"} className="size-16 bg-slate-500">Reg</Link>
      </div>
      <MainBackground>
        <RegistrForm />
      </MainBackground>
    </div>
  );
}
