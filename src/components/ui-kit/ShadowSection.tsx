import { ReactNode } from "react";

type ShadowSectionProps = {
  children: ReactNode;
};

export default function ShadowSection(props: ShadowSectionProps) {
  return <div className="shadow-custom rounded-xl bg-white">{props.children}</div>;
}
