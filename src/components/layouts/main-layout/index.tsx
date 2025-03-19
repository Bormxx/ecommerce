import { ReactNode } from "react";
import { ECHeader } from "@/components/header";

type Props = {
  children: ReactNode;
};

export default function ECMainLayout(props: Props) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1180px] flex-col p-4">
      <ECHeader />
      {props.children}
    </div>
  );
}
