import { ReactElement } from "react";

type Props = {
  children: ReactElement;
}

export function ECDropdownContent(props: Props) {
  const { children } = props;

  return(
    <ul className="absolute mt-1 w-full bg-white rounded-[8px] shadow-md z-10">
      {children}
    </ul>
  )
}
