import { ReactNode } from "react";

type MainBackgroundProps = {
  children: ReactNode;
};

export default function P404Background(props: MainBackgroundProps) {
  return (
    <div className="grow place-content-center place-items-center bg-[url('/images/meditate.svg')] bg-custom-right bg-no-repeat">
      {props.children}
    </div>
  );
}
