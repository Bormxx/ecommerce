import { ReactNode } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

type HomeContainerProps = {
  children: ReactNode;
};

export default function HomeContainer(props: HomeContainerProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1180px] flex-col p-4">
      <HeaderComponent />
      {props.children}
    </div>
  );
}
