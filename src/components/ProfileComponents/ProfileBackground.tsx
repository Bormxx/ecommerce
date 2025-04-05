import { ReactNode } from "react";

type ProfileBackgroundProps = {
  children: ReactNode;
  imageUrl?: string;
}

export default function ProfileBackground({ children, imageUrl }: ProfileBackgroundProps ) {

  return (
    <div 
      className="bg-no-repeat bg-bottom bg-[right_162px] grow bg-transparent md:bg-[image:var(--bg-image)]"
      style={{ "--bg-image": `url(${imageUrl || "/images/sport_meditation.svg"})` } as React.CSSProperties}
    >
      { children }
    </div>
  );
}