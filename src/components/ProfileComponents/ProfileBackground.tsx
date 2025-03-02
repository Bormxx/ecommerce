import { ReactNode } from "react";

type ProfileBackgroundProps = {
  children: ReactNode
}

export default function ProfileBackground( props: ProfileBackgroundProps ) {
  return (
    <div className="bg-[url('/images/sport_meditation.svg')] bg-custom-right bg-no-repeat grow place-content-center place-items-center">
      { props.children }
    </div>
  );
}