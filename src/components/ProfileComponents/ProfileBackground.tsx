import { ReactNode } from "react";

type ProfileBackgroundProps = {
  children: ReactNode
}

export default function ProfileBackground( props: ProfileBackgroundProps ) {
  return (
    <div className="bg-[url('/images/sport_meditation.svg')] bg-no-repeat bg-bottom bg-[right_162px] grow">
      { props.children }
    </div>
  );
}