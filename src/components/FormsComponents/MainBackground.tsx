import { ReactNode } from "react";

type MainBackgroundProps = {
  children: ReactNode
}

export default function MainBackground( props: MainBackgroundProps ) {
  return (
    <div className="bg-[url('/images/sport.svg')] bg-custom-right bg-no-repeat grow place-content-center place-items-center">
      { props.children }
    </div>
  );
}