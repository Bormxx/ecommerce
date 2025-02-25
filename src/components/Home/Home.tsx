import { ReactNode } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

type HomeProps = {
  children: ReactNode;
};

export default function Home(props: HomeProps) {
  return (
    <div className="mx-auto max-w-[1180px] p-4 min-h-screen flex flex-col">
      <HeaderComponent />
      {props.children}
    </div>
  );
}
