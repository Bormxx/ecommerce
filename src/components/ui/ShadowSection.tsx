import { ReactNode } from "react";

type ShadowSectionProps = {
  content: ReactNode;
};

export default function ShadowSection({ content }: ShadowSectionProps) {
  return <div className="shadow-custom rounded-xl bg-white">{content}</div>;
}
