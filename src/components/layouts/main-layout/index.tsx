import { ReactNode } from "react";
import HeaderComponent from "@/components/header/HeaderComponent/HeaderComponent";

type Props = {
  children: ReactNode;
};

export default function ECMainLayout(props: Props) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1180px] flex-col p-4">
      <HeaderComponent />
      {props.children}
    </div>
  );
}
