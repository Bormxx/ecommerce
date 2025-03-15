import { ReactNode } from "react";

type ProfileBackgroundProps = {
  children: ReactNode;
  imageUrl?: string;
}

export default function ProfileBackground({ children, imageUrl }: ProfileBackgroundProps ) {
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl || "/images/sport_meditation.svg"})`,
  };

  return (
    <div 
      className="bg-no-repeat bg-bottom bg-[right_162px] grow"
      style={backgroundStyle}
    >
      { children }
    </div>
  );
}