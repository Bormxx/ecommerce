import { ReactNode } from "react";

type HomeProps = {
  children: ReactNode;
};

export default function Home(props: HomeProps) {
  return <div className="mx-auto max-w-[1180px]">{props.children}</div>;
}
