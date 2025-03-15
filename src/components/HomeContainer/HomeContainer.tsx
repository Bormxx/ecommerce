import { ReactNode } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

type HomeContainerProps = {
  children: ReactNode;
};

export default function HomeContainer(props: HomeContainerProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderComponent />
      <div className="mx-auto w-full max-w-[1220px] bg-gray-50 md:mt-8 md:px-5">
        {props.children}
      </div>
    </div>
  );
}
