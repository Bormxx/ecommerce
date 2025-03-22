import { ReactNode } from "react";

type MainBackgroundProps = {
  children: ReactNode;
};

export default function MainBackground(props: MainBackgroundProps) {
  return (
    <div className="grow place-content-center place-items-center lg:bg-[url('/images/sport.svg')] bg-custom-right bg-no-repeat">
      {props.children}
    </div>
  );
}
